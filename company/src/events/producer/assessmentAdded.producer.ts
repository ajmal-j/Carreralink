import { Producer } from "kafkajs";

export function buildAssessmentAddedProducer(producer: Producer) {
  return async ({
    assessments,
    job,
    user,
    expectedAnswers,
    description,
  }: {
    job: string;
    user: string;
    description: string;
    assessments: Record<string, any>;
    expectedAnswers: Record<string, any>;
  }) => {
    await producer.send({
      topic: "assessment-added",
      messages: [
        {
          value: JSON.stringify({
            job,
            user,
            assessments,
            expectedAnswers,
            description,
          }),
        },
      ],
    });
  };
}
