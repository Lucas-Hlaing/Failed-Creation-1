const { ClientUser, Channel } = require("discord.js");

module.exports = (Discord, client, message) => {
    const prefix ='=';
    if (!message.content.startswith(prefix) || message.author.bot) return;
    
    const blocked = ['425258904688263188'];
    if(blocked.includes(message.author.id)){
        message.reply('no');
        return;
    };

    const args = message.content.slice(prefix.length).split(/ +/)
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    if(command){
    try{
        command.execute(client, message, args, Discord);
    }catch(error){
        console.log(error);
        message.channel.send('Could not find that command.');
    }


    }
}