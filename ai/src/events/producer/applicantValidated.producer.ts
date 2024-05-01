import { Producer } from "kafkajs";

export function buildApplicantValidatedProducer(producer: Producer) {
  return async ({
    data,
  }: {
    data: {
      application: string;
      score: string;
    };
  }) => {
    await producer.send({
      topic: "update-application-score",
      messages: [
        {
          value: JSON.stringify({ data }),
        },
      ],
    });
  };
}
