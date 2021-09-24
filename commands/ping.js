module.exports = {
    name:'ping',
    description: 'replies with pong to ping',
    execute(client, message, args){
        message.channel.send('pong!');
    }
}