module.exports = {
    name:'ping',
    description: 'replies with pong to ping',
    execute(message){
        message.channel.send('pong!');
    }
}