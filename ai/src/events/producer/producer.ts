import { Kafka } from "kafkajs";
import { buildPlanUsedProducer } from "./planUsed.producer.js";
import { buildApplicantValidatedProducer } from "./applicantValidated.producer.js";
import { buildUpdateAssessmentScore } from "./updateAssessmentScore.producer.js";

let KAFKA_BROKER = process.env.KAFKA_BROKER;
if (!KAFKA_BROKER) throw new Error("Kafka broker not found");

export const kafka = new Kafka({
  clientId: "auth",
  brokers: [KAFKA_BROKER],
});

const producer = kafka.producer();
await producer.connect();

const planUsed = buildPlanUsedProducer(producer);
const applicantValidated = buildApplicantValidatedProducer(producer);
const assessmentValidated = buildUpdateAssessmentScore(producer);

export const eventProducer = {
  planUsed,
  applicantValidated,
  assessmentValidated,
} as const;

export type IEventProducer = typeof eventProducer;
