module.exports = {
    name:'leave',
    description: 'For bot to leave channel',
    async execute(client, message,args){
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.reply('You aren\'t even in the voice channel');

        await message.channel.send('OKK I\'m leaving :cry: ');
        await voiceChannel.leave();
    }

}