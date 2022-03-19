module.exports = {
    name: 'friend',
    aliases: ['may', 'sandy', 'henry', 'harry', 'jas', 'heine', 'ray', 'justin'],
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
        if(cmd === 'henry'){
            if(message.author.id == '397684451154460673'){
            message.channel.send('<@916007463998857246> u suck');
            }else{
                message.channel.send('henry u suck');
            }
        }
        if(cmd === 'harry'){
            message.channel.send('harry gonna change the world!');
        }
        if(cmd === 'jas'){
            message.channel.send(`"smart" kid`);
        }
        if(cmd === 'heine'){
            message.channel.send('go text ur gf instead. tsk tsk');
        }
        if(cmd === 'ray'){
            message.channel.send('stop being sus');
        }
        if(cmd === 'justin'){
            message.channel.send('no justin no');
        }
    }

}