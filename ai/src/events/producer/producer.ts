import { Kafka } from "kafkajs";
import { buildPlanUsedProducer } from "./planUsedProducer.js";

let KAFKA_BROKER = process.env.KAFKA_BROKER;
if (!KAFKA_BROKER) throw new Error("Kafka broker not found");

export const kafka = new Kafka({
  clientId: "auth",
  brokers: [KAFKA_BROKER],
});

const producer = kafka.producer();
await producer.connect();

const planUsed = buildPlanUsedProducer(producer);

export const eventProducer = {
  planUsed,
} as const;

export type IEventProducer = typeof eventProducer;
