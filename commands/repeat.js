module.exports = {
name: 'repeat',
description: 'repeats whtever is typed',
    async execute(message, args, cmd){

        if(!args[0]){
            return message.reply('add sth for me to repeat, idiot.');
        }else{
            message.channel.send(args.join(' '));
            await message.channel.messages.fetch({limit: 1}).then(messages => {
                message.channel.bulkDelete(messages);
            });
        }

    }
}