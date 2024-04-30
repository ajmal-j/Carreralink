import { Kafka } from "kafkajs";
import { buildPlanPurchasedByUserProducer } from "./buildPlanPurchasedByUser.js";
import { buildPlanPurchasedByCompanyProducer } from "./buildPlanPurchasedByCompany.js";

let KAFKA_BROKER = process.env.KAFKA_BROKER;
if (!KAFKA_BROKER) throw new Error("Kafka broker not found");

export const kafka = new Kafka({
  clientId: "order",
  brokers: [KAFKA_BROKER],
});

const producer = kafka.producer();
await producer.connect();

const planPurchasedByUser = buildPlanPurchasedByUserProducer(producer);
const planPurchasedByCompany = buildPlanPurchasedByCompanyProducer(producer);

export const eventProducer = {
  planPurchasedByUser,
  planPurchasedByCompany,
} as const;

export type IEventProducer = typeof eventProducer;
