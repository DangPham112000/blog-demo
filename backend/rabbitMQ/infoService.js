const amqp = require("amqplib");
const config = require("./config");

async function consumeMessages() {
  const rabbitmqUrl = config.rabbitMQ.url;
  const connection = await amqp.connect(rabbitmqUrl);
  const channel = await connection.createChannel();

  const exchangeName = config.rabbitMQ.exchangeName;
  const exchangeType = config.rabbitMQ.exchangeType;
  await channel.assertExchange(exchangeName, exchangeType);

  const q = await channel.assertQueue("InfoQueue");

  await channel.bindQueue(q.queue, exchangeName, "Info");

  channel.consume(q.queue, (msg) => {
    const data = JSON.parse(msg.content);
    console.log(data);
    // channel.ack(msg);
  });
}

consumeMessages();
