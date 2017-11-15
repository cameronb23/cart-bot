import chalk from 'chalk';
import discord from 'discord.js';

import { initDb } from './database';
import Config from './config'; // config.json

const client = new Discord.Client();

function log(message) {
  const time = chalk.purple(`[${new Date().toString()}]`);
  const prefix = chalk.blue('Discord');
  console.log(`${time + prefix} ${message}`);
}

client.on('ready', () => {
  log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => { //When someone sends a discord message via dm or in the server.
  let sender = message.author;
  let msg = message.content.toUpperCase();

  if (message.channel.type === "dm") {
    message.channel.send('pong')
  }
  log(`Message: ${msg}`);
}


async function start() {
  // start Discord client _and_ database connection
  await initDb();
  client.login(Config.token);
}

start();
