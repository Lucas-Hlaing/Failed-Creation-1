module.exports = {
    name: 'friend',
    aliases: ['may', 'sandy'],
    description: 'just random facts',
    execute(message, args, cmd){
        if(cmd === 'may'){
            if(message.author.id == '763074950616842240'){
                message.reply('ure gonna say my bot sucks so no u cant use this command. :((');
            }else if(args[0]=='best'){
                message.reply('yeaaa u right. shes a really good person.')
            }else{
                message.channel.send('ohh shes like a mom');
            }
        }
    
        if(cmd === 'sandy'){
            if(message.author.id =='789127051168710668'){
                message.reply('u already know u a kiddo so do u really need this command?');
            }else if(args[0]==='best'){
                message.reply('omggg shes such a great person. n so kinddd.')
            }else{
                message.channel.send('ohh that kiddo');
            }
        }
    }

}