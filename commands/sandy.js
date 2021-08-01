module.exports = {
    name:'sandy',
    description: 'tells how sandy is a kid',
    execute(message, args){
        if(message.author.id =='789127051168710668'){
            message.reply('u already know u a kiddo so do u really need this command?');
        }else if(args[0]==='best'){
            message.reply('omggg shes such a great person. n so kinddd.')
        }else{
            message.channel.send('ohh that kiddo');
        }
    }
}