const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { MessageEmbed } = require('discord.js');

const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip', 'disconnect', 'p', 'leave', 'fs', 'q', 'queue', 'now', 'np', 'playing', 'dc', 'loop', 'shuffle'],
    description: 'music stuff',
    async execute (message, args, cmd, client, Discord) {

        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.reply('Join a channel first');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has('SPEAK') || !permissions.has('CONNECT')) return message.channel.send('You can\'t use this command');

        const serverQueue = queue.get(message.guild.id);

        if(cmd === 'play' || cmd === 'p'){
            if(!args.length) return message.channel.send('Add keywords, a link or sth');
            let song = {};
            if(ytdl.validateURL(args[0])){
                const songInfo = await ytdl.getInfo(args[0]);
                song = {title : songInfo.videoDetails.title, url : songInfo.videoDetails.video_url};
            } else{
                const videoFinder = async(query) => {
                    const videoResult = await ytSearch(query);
                    return(videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }
                const video = await videoFinder(args.join(' '));

                if(video){
                    song = {title : video.title, url : video.url, thumbnail: video.thumbnail};
                } else{
                    message.channel.send('error finding vid');
                }
            }
            if(!serverQueue){

                const queue_constructor = {
                    voice_channel : voiceChannel,
                    text_channel : message.channel,
                    connection : null,
                    songs : [],
                    leaveTimer : null,
                    loop: false,
                }
                queue.set(message.guild.id, queue_constructor)
                queue_constructor.songs.push(song);

            try{
                const connection = await voiceChannel.join();
                queue_constructor.connection = connection;
                videoPlayer(message.guild, queue_constructor.songs[0]);
            } catch(error){
                queue.delete(message.guild.id);
                message.channel.send('You broke sth. couldnt connect to channel');
                throw error;
            }
            }else{
                serverQueue.songs.push(song);
                if(serverQueue.songs.length == 1){
                    videoPlayer(message.guild, serverQueue.songs[0]);
                }else{
                    message.channel.send(`${song.title} has been added to the queue.`);
                }
                return;
            }
        } 
        else if(cmd === 'skip' || cmd === 'fs') skip_song(message, serverQueue);
        else if(cmd === 'disconnect' || cmd === 'leave' || cmd === 'dc') stop_song(message, serverQueue);
        else if(cmd === 'queue' || cmd === 'q') get_queue(message, serverQueue);
        else if(cmd === 'np' || cmd === 'playing' || cmd === 'now') nowplay(message, serverQueue);
        else if(cmd === 'loop') looping(message, serverQueue);
        else if(cmd === 'shuffle') shuffling(message, serverQueue);
    }
}

const videoPlayer = async (guild, song) => {
    const song_queue = queue.get(guild.id);
    if(!song){
        if(song_queue.songs.length == 0){
            song_queue.leaveTimer = setTimeout(function() {
                leaveTimeout(guild.id);
            }, 1000 * 1000);
        }
        return;
    }
    try{
        clearTimeout(song_queue.leaveTimer);
    }catch(e){
    
    };

    const stream = ytdl(song.url, {filter: 'audioonly'});
    song_queue.connection.play(stream, {seek : 0 , volume: 0.5})
    .on('finish', () => {
        if(song_queue.loop === true){
            const finished = song_queue.songs[0];
            song_queue.songs.push(finished);
        }
        song_queue.songs.shift();
        videoPlayer(guild, song_queue.songs[0]);
    });
};

const skip_song = (message, serverQueue) => {
    if(!message.member.voice.channel) return message.channel.send('Join a voice channel first.');
    if(!serverQueue){
        return message.channel.send('There are no songs in the queue');
    };
    if(serverQueue.songs.length == 1){
        message.channel.send('no more songs left in queue. Add another or disconnect me.');
    }else {
        serverQueue.songs.shift();
        videoPlayer(message.guild, serverQueue.songs[0]);
    }
};

const stop_song = (message, serverQueue) => {
    if(!message.member.voice.channel) return message.channel.send('Join a voice channel first.');
    if(!serverQueue.voice_channel || !serverQueue){
        message.channel.send('I\'m not even in a channel, idiot.');
    }
    try{message.member.voice.channel.leave();
    message.channel.send('Ok I\'m leaving :( ');
    queue.delete(message.guild.id);
    }catch(error){
        console.log(error);
        message.channel.send('sth broke. Manually disconnect me.');
    }

}

const get_queue = (message, serverQueue) => {
    if(!message.member.voice.channel) return message.channel.send('Join a voice channel first.');
    if(!serverQueue || serverQueue.songs.length === 0){
        return message.channel.send('There are no songs in the queue');
    };
    if(serverQueue.songs.length === 1){
        nowplay(message,serverQueue);
        return;
    }
    let now_playing = serverQueue.songs[0];
    let playlist = '';

    for(var i= 1; i < serverQueue.songs.length; i++){
        let song = serverQueue.songs[i];
        playlist += `${i}. ***[${song.title}](${song.url})*** \n`
    }
    const QueueEmbed = new MessageEmbed()
    .setColor('#CCE7F1')
    .setTitle(`Queue for ${message.guild.name}`)
    .addFields(
        {name: 'Now Playing: ', value: `***[${now_playing.title}](${now_playing.url})*** `},
        {name: 'Queue', value: playlist},
    )
    .setFooter(`Looping: ${serverQueue.loop}`);


    message.channel.send(QueueEmbed);
}

const nowplay = (message,serverQueue) => {
    if(!message.member.voice.channel) return message.channel.send('Join a voice channel first.');
    if(!serverQueue || serverQueue.songs.length === 0){
        return message.channel.send('There are no songs in the queue');
    };
    let now_playing = serverQueue.songs[0];
    const NPEmbed = new MessageEmbed()
    .setColor('#CCE7F1')
    .setTitle('Now Playing')
    .setDescription(`***[${now_playing.title}](${now_playing.url})*** `);
    
    message.channel.send(NPEmbed);
};

const looping = (message,serverQueue) => {
    if(!message.member.voice.channel) return message.channel.send('Join a voice channel first.');
    if(!serverQueue || serverQueue.songs.length === 0){
        return message.channel.send('There are no songs in the queue');
    };
    if(serverQueue.loop === true){
        serverQueue.loop = null;
        const LoopEmbed = new MessageEmbed()
        .setColor('#6ACCBC')
        .setTitle('Looping Stopped')
        message.channel.send(LoopEmbed);
    }else{
        serverQueue.loop = true;
        const LoopEmbed = new MessageEmbed()
        .setColor('#6ACCBC')
        .setTitle('Looping Queue')
        message.channel.send(LoopEmbed);
    }
}
const shuffling = (message, serverQueue) => {
    if(!message.member.voice.channel) return message.channel.send('Join a voice channel first.');
    if(!serverQueue || serverQueue.songs.length === 0){
        return message.channel.send('There are no songs in the queue');
    };
    for(let i = serverQueue.songs.length-1; i>0; i--){
        let j =  Math.ceil(Math.random() * (i));
        [serverQueue.songs[i], serverQueue.songs[j]] = [serverQueue.songs[j], serverQueue.songs[i]];
    }
    const ShuffleEmbed = new MessageEmbed()
        .setColor('#6ACCBC')
        .setTitle('Shuffled Queue')
        message.channel.send(ShuffleEmbed);
}

function leaveTimeout (guild_id){
    song_queue = queue.get(guild_id);
    if(song_queue){
        song_queue.text_channel.send('You ignored me for too long so I left.');
        song_queue.voice_channel.leave();
        queue.delete(guild_id);
    }
}