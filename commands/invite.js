module.exports = {
    name:'invite',
    description: 'sends invite link',
    execute(client, message, args){
        message.channel.send('https://discord.com/oauth2/authorize?client_id=790438040011145228&scope=bot&permissions=8');
    }
}