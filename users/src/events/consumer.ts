import { Kafka } from "kafkajs";
import { createUserUsecase } from "../usecases/index.js";
import { IUser } from "../entities/userData.entity.js";

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
        const data = message?.value?.toString();
        if (!data) throw new Error("No data found");
        const userData = JSON.parse(data) as IUser;
        createUserUsecase.execute(userData);
      },
    });
  } catch (error) {
    console.log(error);
    console.log("error connecting to kafka broker");
    process.exit(1);
  }
};
