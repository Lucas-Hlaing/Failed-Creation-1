const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { VoiceChannel } = require('discord.js');
const { validateID } = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'plays a song from youtube',
    async execute (client, message, args) {
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.reply('Join a channel first');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has('SPEAK') || !permissions.has('CONNECT')) return message.channel.send('You can\'t use this command');
        if(!args.length) return message.channel.send('Add keywords, a link or sth');
        
        if(ytdl.validateURL(args)){
            const connection = await voiceChannel.join();

            const stream = ytdl(args, {filter:'audioonly'});
            connection.play(stream,{seek:0, volume:0.25})
            .on('finish', ()=>{
                voiceChannel.leave();
            });

            await message.channel.send(`Playing :mega: ${args}`);
            return;
        }
        const connection = await voiceChannel.join();

        const videoFinder = async (query)=> {

        const videoResult = await ytSearch(query);
        return(videoResult.videos.length > 1) ? videoResult.videos[0] : null;

        }

        const video = await videoFinder(args.join (' '));

        if(video){
            const stream = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 0.25})

            //  .on('finish', ()=> {
            //  voiceChannel.leave();
            //  });
             

            await message.channel.send(`Playing :mega::headphones: "${video.title}" :headphones:`);
        } else {
            message.channel.send('No video found');
        }
    }
}