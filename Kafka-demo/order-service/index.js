const { Kafka } = require("kafkajs");
const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["kafka:9092"],
});

const producer = kafka.producer();

app.post("/order", async (req, res) => {
  const order = {
    orderId: Date.now(),
    userId: req.body.userId,
    amount: req.body.amount,
    status: "created",
  };

  await producer.send({
    topic: "order-topic",
    messages: [{ value: JSON.stringify(order) }],
  });

  console.log("✅ Order event produced:", order);
  res.json({ message: "Order created", order });
});

const start = async () => {
  try {
    await producer.connect();
    console.log("✅ Producer connected to Kafka");
    app.listen(4000, () =>
      console.log("🟢 Order Service running on port 4000")
    );
  } catch (error) {
    console.error("❌ Failed to connect to Kafka:", error.message);
    console.log("🔄 Retrying connection in 5 seconds...");
    setTimeout(start, 5000);
  }
};

start().catch(console.error);
