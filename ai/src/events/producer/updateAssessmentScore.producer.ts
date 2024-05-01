import { Producer } from "kafkajs";

export function buildUpdateAssessmentScore(producer: Producer) {
  return async ({
    data,
  }: {
    data: {
      job: string;
      user: string;
      score: string;
    };
  }) => {
    await producer.send({
      topic: "update-assessment-score",
      messages: [
        {
          value: JSON.stringify({ data }),
        },
      ],
    });
  };
}
