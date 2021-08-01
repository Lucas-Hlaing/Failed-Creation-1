module.exports = {
    name:'may',
    description: 'tells how great a person may is',
    execute(message, args){
        if(message.author.id == '763074950616842240'){
            message.reply('ure gonna say my bot sucks so no u cant use this command. :((');
        }else if(args[0]=='best'){
            message.reply('yeaaa u right. shes a really good person.')
        }else{
            message.channel.send('ohh shes like a mom');
        }
    }
}