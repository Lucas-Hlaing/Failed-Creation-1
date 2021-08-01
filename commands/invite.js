module.exports = {
    name:'invite',
    description: 'sends invite link',
    execute(message){
        message.channel.send('https://discord.com/oauth2/authorize?client_id=790438040011145228&scope=bot&permissions=8');
    }
}