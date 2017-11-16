import chalk from 'chalk';
import discord from 'discord.js';
import moment from 'moment';
import fs from 'fs';

const config = require('../config.json');

const client = new discord.Client();

function log(message) {
  const time = chalk.red(`[${moment().format('LTS')}]`);
  const prefix = chalk.blue('[Discord] ');
  console.log(`${time + prefix} ${message}`);
}

client.on('ready', () => {
  log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => { //When someone sends a discord message via dm or in the server.
  let sender = message.author;
  let msg = message.content;

  if (sender.bot) return;
  if  (msg.indexOf(config.prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = msg.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'cart') {
    if (message.channel.type === 'dm') {
      try {
        let commandFile = require(`./commands/${args}.js`);
        await commandFile.run(client, message, args);

        return;
      } catch (err) {
        message.channel.send('Invalid command');
        log(`Message: ${msg}`);

        return;
      }
    }

    message.channel.send('I only operate via DM.');
  }
});

client.login(process.env.DISCORD_TOKEN);
