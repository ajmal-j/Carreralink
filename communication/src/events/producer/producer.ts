import { Kafka } from "kafkajs";

let KAFKA_BROKER = process.env.KAFKA_BROKER;
if (!KAFKA_BROKER) throw new Error("Kafka broker not found");

export const kafka = new Kafka({
  clientId: "company",
  brokers: [KAFKA_BROKER],
});

const producer = kafka.producer();
await producer.connect();

// const rejectCompany = buildRejectCompanyProducer(producer);

export const eventProducer = {
  //   rejectCompany,
} as const;

export type IEventProducer = typeof eventProducer;
