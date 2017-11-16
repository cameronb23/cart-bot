exports.run = (client, message, args) => {
    const embed = {
      title: 'Available Carts',
      description: 'List of all current available carts\n',
      color: 3660124,
      timestamp: new Date(),
      footer: {
        icon_url: 'https://cdn.discordapp.com/embed/avatars/0.png',
        text: 'CartBot'
      },
      author: {
        name: 'CartBot',
        url: 'https://cartbot.cameronb.me',
        icon_url: 'https://cdn.discordapp.com/embed/avatars/0.png'
      },
      fields: [
        {
          "name": "!cart help",
          "value": "Lists CartBot commands."
        },
        {
          "name": "",
          "value": ""
        },
        {
          "name": "",
          "value": ""
        },
      ]
    }
    message.channel.send({embed}).catch(console.error);
}
