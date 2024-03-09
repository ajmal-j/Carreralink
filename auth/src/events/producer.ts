import { Kafka } from "kafkajs";
import { buildCreateUserProducer } from "./createUser.producer.js";

let KAFKA_BROKER = process.env.KAFKA_BROKER;
if (!KAFKA_BROKER) throw new Error("Kafka broker not found");

const kafka = new Kafka({
  clientId: "auth",
  brokers: [KAFKA_BROKER],
});

const producer = kafka.producer();
await producer.connect();

const userCreated = buildCreateUserProducer(producer);

const eventProducer = {
  userCreated,
} as const;

export type IEventProducer = typeof eventProducer;
export default eventProducer;
