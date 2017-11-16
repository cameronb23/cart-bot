import request from 'request-promise';

exports.run = async (client, message, args) => {
  try {
    const userId = message.author.id;
    const opts = {
      url: 'https://cartbot-api.cameronb.me/userToken',
      method: 'POST',
      headers: {
        'X-API-Key': process.env.API_TOKEN
      },
      body: {
        discord: userId
      },
      simple: false,
      resolveWithFullResponse: true,
      json: true
    };

    const response = await request(opts);

    if (response.statusCode !== 200) {
      message.channel.send('Error generating payment: ' + response.body.message);
      return;
    }

    const token = response.body.token;

    if (!token) {
      message.channel.send('Error generating payment URL. Please try again later');
      return;
    }

    let msg = 'Please follow this link to update payment details(one time use only):\n';
    msg += `https://cartbot-api.cameronb.me/payment?userToken=${token}`;

    message.channel.send(msg);
  } catch (e) {
    console.log(e);
    message.channel.send('Error generating payment URL. Please try again later');
  }
  message.channel.send(``);
}
