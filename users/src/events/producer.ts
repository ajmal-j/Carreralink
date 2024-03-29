import { Kafka } from "kafkajs";
import { buildUpdateBlockProducer } from "./updateBlock.producer.js";
import { buildDeleteUsersProducer } from "./deleteUsers.producer.js";

let KAFKA_BROKER = process.env.KAFKA_BROKER;
if (!KAFKA_BROKER) throw new Error("Kafka broker not found");

export const kafka = new Kafka({
  clientId: "auth",
  brokers: [KAFKA_BROKER],
});

const producer = kafka.producer();
await producer.connect();

const updateBlock = buildUpdateBlockProducer(producer);
const deleteUsers = buildDeleteUsersProducer(producer);

export const eventProducer = {
  updateBlock,
  deleteUsers,
} as const;

export type IEventProducer = typeof eventProducer;
