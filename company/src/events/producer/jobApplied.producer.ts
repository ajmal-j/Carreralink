import { Producer } from "kafkajs";
import { IAppliedJob } from "../../database/models/appliedJobs.model.js";

export function buildJobAppliedProducer(producer: Producer) {
  return async ({
    applied,
    description,
  }: {
    applied: IAppliedJob;
    description: string;
  }) => {
    await producer.send({
      topic: "job-applied",
      messages: [
        {
          value: JSON.stringify({
            applied,
            description,
          }),
        },
      ],
    });
  };
}
