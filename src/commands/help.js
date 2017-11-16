import Discord from 'discord.js';

const cmds = [
  {
    key: 'list',
    description: 'List all carts available for purchase'
  },
  {
    key: 'payment',
    description: 'Update your payment details securely via Stripe'
  }
];

exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()
                .setTitle('Bot Help')
                .setDescription('List of all bot commands\n')
                .setColor(3660124)
                .setFooter('Powered by Cameron', 'https://avatars2.githubusercontent.com/u/7783071?s=400&u=37248f71a15491e3fd860046f5c971f78d750068')
                .setTimestamp(new Date());

  cmds.forEach(c => {
    embed.addField(`!cart ${c.key}`, c.description);
  });


  message.channel.send('', embed).catch(console.error);
}
