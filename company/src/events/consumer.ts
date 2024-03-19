import { Kafka } from "kafkajs";
import { createCompanyUsecase } from "../usecases/index.js";
import { ICompany } from "../database/models/company.model.js";

const KAFKA_BROKERS = process.env.KAFKA_BROKER;

export default async () => {
  try {
    const kafka = new Kafka({
      clientId: "company",
      brokers: [KAFKA_BROKERS!],
    });

    const consumer = kafka.consumer({ groupId: "company" });

    await consumer.connect();

    await consumer.subscribe({
      topic: "company-created",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const data = message?.value?.toString();
        if (!data) throw new Error("No data found in create company event");
        const companyData = JSON.parse(data) as ICompany;
        createCompanyUsecase.execute(companyData);
      },
    });
  } catch (error) {
    console.log(error);
    console.log("error connecting to kafka broker");
    process.exit(1);
  }
};
