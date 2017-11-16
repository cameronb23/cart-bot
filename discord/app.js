//import chalk from 'chalk';
//import discord from 'discord.js';
const chalk = require('chalk');
const discord = require('discord.js');
const config = require('./config.json');
//import { initDb } from './database';
//import Config from './config'; // config.json

const client = new discord.Client();
const fs = require("fs");

function log(message) {
  const time = chalk.red(`[${new Date().toString()}] `);
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
    if (message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;

    // This is the best way to define args. Trust me.
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'cart') {
      try {
        let commandFile = require(`./commands/${args}.js`);
        commandFile.run(client, message, args);
        log(`Message: ${msg}`);
      } catch (err) {
        message.channel.send('Invalid command');
        console.error(err);
        log(`Message: ${msg}`);
      }
    }
      // The list of if/else is replaced with those simple 2 lines:

  }
});


function start() {
  // start Discord client _and_ database connection
  client.login("MzgwNTEyMjYzMTkyMTgyNzk0.DO5rLw.rHhcg1-hMcF9vfHxFsU9qOPtEik");
}

start();
