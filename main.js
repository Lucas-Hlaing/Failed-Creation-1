
const fs = require('fs');
const Discord = require('discord.js');
const {prefix,token} = require('./configs.json');

var http = require('http');  
http.createServer(function (req, res) {   
  res.write("I'm alive");   
  res.end(); 
}).listen(8080);

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require (`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.once('ready' , () => {
    console.log('YEE is up and running');
    let activities = [`Anime`, `Anime`, `Anime`   ],i = 0;
  setInterval(() => client.user.setActivity(`${activities[i++ %  activities.length]}`,  {type:"WATCHING"}), 5000)
  client.user.setStatus('idle');

});

client.on('message',message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return
    const blocked = ['425258904688263188'];
    if(blocked.includes(message.author.id)){
        message.reply('no');
        return;
    };

    const arg = message.content.slice(prefix.length).split(/ +/);
    const command = arg.shift().toLowerCase();

    if(!client.commands.has(command)) return;

    if(command == 'ping'){
        client.commands.get(command).execute(message);
        return;
    }
    try{
        client.commands.get(command).execute(message, arg);
    }catch (error){
        console.log(error);
        message.reply('could not find that command.');
    }

});








client.login(token)