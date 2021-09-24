module.exports = (Discord, client, message) => {
    const prefix =process.env.prefix;
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const blocked = ['425258904688263188'];
    if(blocked.includes(message.author.id)){
        message.reply('no');
        return;
    };

    const args = message.content.slice(prefix.length).split(/ +/)
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if(command){
        try{
            command.execute(message, args, cmd, client, Discord);
        }catch(error){
            console.log(error);
            message.channel.send('Could not find that command.');
        }
    
    
        }

}