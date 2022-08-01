module.exports = {
    name: 'friend',
    aliases: ['may', 'sandy', 'henry', 'harry', 'jas', 'heine', 'ray', 'justin', 'lucas','khine','simon','hy','alisa','eric'],
    description: 'just random facts',
    async execute(message, args, cmd){

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
            deleting();
            if(message.author.id == '397684451154460673'){
            message.channel.send('<@916007463998857246> u suck');
            }else{
                message.channel.send('henry u suck');
            }
        }
        if(cmd === 'harry'){
            deleting();
            message.channel.send('harry gonna change the world!');
        }
        if(cmd === 'jas'){
            deleting();
            message.channel.send(`"smart" kid`);
        }
        if(cmd === 'heine'){
            deleting();
            message.channel.send('go text ur gf instead. tsk tsk');
        }
        if(cmd === 'ray'){
            deleting();
            message.channel.send('stop being sus');
        }
        if(cmd === 'justin'){
            deleting();
            message.channel.send('no justin no');
        }
        if(cmd == 'lucas'){
            deleting();
            message.reply("u suck");
        }
        if(cmd == 'khine'){
            message.channel.send("who's that??");
        }
        if(cmd == 'simon'){
            message.channel.send('gym rat. ew :face_vomiting:')
        }
        if(cmd == 'hy'){
            deleting();
            message.channel.send('pls dont bully Lucas. go bully <@579241300474331167> instead.')
        }
        if(cmd == 'eric'){
            message.channel.send('ahh yes the better lucas')
        }
        if(cmd == 'alisa'){
            deleting();
            message.channel.send('imagine being smart AND athletic');
        }

        return;
        async function deleting(){
            await message.channel.messages.fetch({limit: 1}).then(messages => {
                message.channel.bulkDelete(messages);
            });
        }
    }

}