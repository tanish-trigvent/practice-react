const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "payment-group" });

const run = async () => {
  try {
    await consumer.connect();
    console.log("✅ Consumer connected to Kafka");

    await consumer.subscribe({ topic: "order-topic", fromBeginning: true });
    console.log("🟢 Payment Service waiting for order events...");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const order = JSON.parse(message.value.toString());
          console.log("📦 Received Order Event:", order);

          // Simulate payment processing
          setTimeout(() => {
            console.log(
              `💰 Payment processed for Order ID: ${order.orderId}\n`
            );
          }, 2000);
        } catch (error) {
          console.error("❌ Error processing message:", error.message);
        }
      },
    });
  } catch (error) {
    console.error("❌ Failed to connect to Kafka:", error.message);
    console.log("🔄 Retrying connection in 5 seconds...");
    setTimeout(run, 5000);
  }
};

run().catch(console.error);
