const amqp = require("amqplib");
const config = require("./config");

async function consumeMessages() {
  const connection = await amqp.connect(config.rabbitMQ.url);
  const channel = await connection.createChannel();

  const exchangeName = config.rabbitMQ.exchangeName;
  const exchangeType = config.rabbitMQ.exchangeType;
  await channel.assertExchange(exchangeName, exchangeType);

  const q = await channel.assertQueue("WarningQueue");

  await channel.bindQueue(q.queue, exchangeName, "Warning");
  await channel.bindQueue(q.queue, exchangeName, "Error");

  channel.consume(q.queue, (msg) => {
    const data = JSON.parse(msg.content);
    console.log(data);
    channel.ack(msg);
  });
}

consumeMessages();
