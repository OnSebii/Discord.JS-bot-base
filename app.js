const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
const { token } = require('./config/config.json');

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

// client.on('message', (msg) => {
//   if (msg.content === 'ping') {
//     msg.reply('pong');
//   }
// });

client.login(token);
