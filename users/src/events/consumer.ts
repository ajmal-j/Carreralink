import { Kafka } from "kafkajs";

const KAFKA_BROKERS = process.env.KAFKA_BROKER;

export default async () => {
  try {
    const kafka = new Kafka({
      clientId: "users",
      brokers: [KAFKA_BROKERS!],
    });

    const consumer = kafka.consumer({ groupId: "users" });

    await consumer.connect();

    await consumer.subscribe({
      topic: "user-created",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(`Message received: ${message.timestamp} ${message.key}`);
        console.log(message?.value?.toString());
      },
    });
  } catch (error) {
    console.log(error);
    console.log("error connecting to kafka broker");
    process.exit(1);
  }
};
