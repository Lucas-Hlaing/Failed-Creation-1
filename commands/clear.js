module.exports = {
    name : 'clear',
    description : 'clears messages',
    async execute(message, args){
        if(message.author.id =='397684451154460673'){}else{
            if(!message.member.permissions.has('ADMINISTRATOR')) message.channel.send('U need to either be Lucas or have Admin');
            return;
        }
  
        if(!args[0] || isNaN(args[0])) return message.reply('You need to add a number after clear');

        if(args[0]<1 || args[0]>100) return message.reply('Enter a number between 1 and 99.');
        
        const amount = parseInt(args[0]) + 1;
        await message.channel.messages.fetch({limit: amount}).then(messages => {
            message.channel.bulkDelete(messages);
        });
    }
}