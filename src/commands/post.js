import request from 'request-promise';

// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const priceRegex = /^\d+$/;

exports.run = async (client, message, args) => {
  // parse email and password
  if (args.length < 3) {
    return message.channel.send('Invalid arguments provided. Must provide email and password to account');
  }

  const email = args[0]; // TODO: validate

  if (!emailRegex.test(email)) {
    return message.channel.send('Invalid email. Please check again.');
  }

  const pass = args[1];
  const price = args[2]; // TODO: validate

  if (!priceRegex.test(price)) {
    return message.channel.send('Invalid price. Only integer numbers are accepted. No decimals.');
  }


  const userId = message.author.id;

  const opts = {
    url: 'https://cartbot-api.cameronb.me/carts',
    method: 'POST',
    headers: {
      'X-API-Key': process.env.API_TOKEN,
    },
    body: {
      userId,
      email,
      pass,
      price
    },
    simple: false,
    resolveWithFullResponse: true,
    json: true
  };

  try {
    const res = await request(opts);

    if (!res.body.success) {
      return message.channel.send(`Error listing cart: ${res.body.message}`)
    }

    const { cartId } = res.body.cartId;

    // TODO: add more details, size, timer, etc
    message.channel.send(`Successfully listed cart with ID ${cartId}`);
  } catch (e) {
    message.channel.send('Unable to reach my API! Please try again later!');
  }
}
