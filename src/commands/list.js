import Discord from 'discord.js';
import request from 'request-promise';

exports.run = async (client, message, args) => {
  try {
    const opts = {
      url: 'https://cartbot-api.cameronb.me/carts',
      method: 'GET',
      json: true
    };

    const response = await request(opts);

    const embed = new Discord.RichEmbed()
                  .setTitle('Available Carts')
                  .setDescription('List of all current available carts\n')
                  .setColor(3660124)
                  .setFooter('Powered by Cameron', 'https://avatars2.githubusercontent.com/u/7783071?s=400&u=37248f71a15491e3fd860046f5c971f78d750068')
                  .setTimestamp(new Date());

    response.forEach(c => {
      embed.addField(c.pid, `Price: $${c.price}\nSize: ${c.size}`);
    });

    message.channel.send('', embed);
  } catch (e) {
    console.log(e);
    message.channel.send('Error fetching carts.');
  }
}
