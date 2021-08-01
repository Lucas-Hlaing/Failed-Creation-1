module.exports = {
    name: 'disappear',
    description: 'leave the server',
    execute(message, args){
        if(message.author.id !== '397684451154460673') return message.channel.send('u arent lucas so no');
        message.guild.leave();

    }

}