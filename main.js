
const fs = require('fs');
const Discord = require('discord.js');
require('dotenv').config();

var http = require('http');  
http.createServer(function (req, res) {   
  res.write("I'm alive");   
  res.end(); 
}).listen(8080);

const client = new Discord.Client();
client.commands = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
});





client.login(process.env.discord_token)