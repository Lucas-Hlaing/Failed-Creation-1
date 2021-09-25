const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop', 'p', 'leave', 'fs'],
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
                song = {title : songInfo.videoDetails.title, url : songInfo.videoDetails.url};
            } else{
                const videoFinder = async(query) => {
                    const videoResult = await ytSearch(query);
                    return(videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }
                const video = await videoFinder(args.join(' '));

                if(video){
                    song = {title : video.title, url : video.url};
                } else{
                    message.channel.send('error finding vid');
                }
            }
            if(!serverQueue){

                const queue_constructor = {
                    voice_channel : voiceChannel,
                    text_channel : message.channel,
                    connection : null,
                    songs : []
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
                return message.channel.send(`${song.title} has been added to the queue.`);
            }
        } 
        else if(cmd === 'skip' || cmd === 'fs') skip_song(message, serverQueue);
        else if(cmd === 'disconnect' || cmd === 'leave') stop_song(message, serverQueue);
    }
}

const videoPlayer = async (guild, song) => {
    const song_queue = queue.get(guild.id);
    if(!song){
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }

    const stream = ytdl(song.url, {filter: 'audioonly'});
    song_queue.connection.play(stream, {seek : 0 , volume: 0.5})
    .on('finish', () => {
        song_queue.songs.shift();
        videoPlayer(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`Now PLaying: ${song.title}`);
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
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();

}