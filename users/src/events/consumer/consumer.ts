import { Kafka } from "kafkajs";
import {
  createUserUsecase,
  googleLoginUsecase,
  planPurchasedUseCase,
  updatePlanUsageUsecase,
} from "../../usecases/index.js";
import { IUser } from "../../entities/userData.entity.js";
import { IOrder } from "../../types/order.js";

const KAFKA_BROKERS = process.env.KAFKA_BROKER;

export default async () => {
  try {
    const kafka = new Kafka({
      clientId: "users",
      brokers: [KAFKA_BROKERS!],
    });

    const createdConsumer = kafka.consumer({ groupId: "users" });
    const loginConsumer = kafka.consumer({ groupId: "login" });
    const planUsageConsumer = kafka.consumer({ groupId: "usage" });
    const planPurchasedConsumer = kafka.consumer({ groupId: "order" });

    await createdConsumer.connect();
    await loginConsumer.connect();
    await planUsageConsumer.connect();
    await planPurchasedConsumer.connect();

    await createdConsumer.subscribe({
      topic: "user-created",
      fromBeginning: true,
    });

    await planPurchasedConsumer.subscribe({
      topic: "plan-purchased-by-user",
      fromBeginning: true,
    });

    await loginConsumer.subscribe({
      topic: "google-login",
      fromBeginning: true,
    });

    await planUsageConsumer.subscribe({
      topic: "plan-used",
      fromBeginning: true,
    });

    await createdConsumer.run({
      eachMessage: async ({ message }) => {
        const data = message?.value?.toString();
        if (!data) throw new Error("No data found");
        const userData = JSON.parse(data) as IUser;
        createUserUsecase.execute(userData);
      },
    });

    await planPurchasedConsumer.run({
      eachMessage: async ({ message }) => {
        const data = message?.value?.toString();
        if (!data) throw new Error("No data found");
        const plan = JSON.parse(data);
        planPurchasedUseCase.execute({
          data: plan?.order as IOrder,
        });
      },
    });

    await planUsageConsumer.run({
      eachMessage: async ({ message }) => {
        const data = message?.value?.toString();
        if (!data) throw new Error("No data found");
        const userData = JSON.parse(data);
        updatePlanUsageUsecase.execute(userData);
      },
    });

    await loginConsumer.run({
      eachMessage: async ({ message }) => {
        const data = message?.value?.toString();
        console.log("google login data");
        if (!data) throw new Error("No data found");
        const userData = JSON.parse(data);
        googleLoginUsecase.execute(userData);
      },
    });
  } catch (error) {
    console.log(error);
    console.log("error connecting to kafka broker");
    process.exit(1);
  }
};
