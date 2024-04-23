import { Producer } from "kafkajs";

export function buildPlanUsedProducer(producer: Producer) {
  return async ({ user }: { user: { email: string } }) => {
    await producer.send({
      topic: "plan-used",
      messages: [
        {
          value: JSON.stringify({ user }),
        },
      ],
    });
  };
}
