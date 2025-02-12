const amqp = require("amqplib");
const config = require("./config");

class Producer {
  channel;

  async createChannel() {
    const rabbitmqUrl = config.rabbitMQ.url;
    const connection = await amqp.connect(rabbitmqUrl);
    this.channel = await connection.createChannel();
  }

  async publishMessage(routingKey, message) {
    if (!this.channel) {
      await this.createChannel();
    }

    const exchangeName = config.rabbitMQ.exchangeName;
    const exchangeType = config.rabbitMQ.exchangeType;
    await this.channel.assertExchange(exchangeName, exchangeType);

    const logDetails = {
      logType: routingKey,
      message: message,
      dateTime: new Date(),
    };
    await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(logDetails))
    );

    console.log(
      `The new ${routingKey} log is sent to exchange ${exchangeName}`
    );
  }
}

const express = require("express");
const app = express();
const producer = new Producer();

app.use(express.json());

app.post("/sendLog", async (req, res) => {
  await producer.publishMessage(req.body.logType, req.body.message);
  res.send();
});

app.listen(3000, () => {
  console.log("Server started...");
});
