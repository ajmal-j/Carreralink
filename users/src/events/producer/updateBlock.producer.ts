import { Producer } from "kafkajs";

export function buildUpdateBlockProducer(producer: Producer) {
  return async (user: { email: string; isBlocked: boolean }) => {
    await producer.send({
      topic: "user-block",
      messages: [
        {
          value: JSON.stringify(user),
        },
      ],
    });
  };
}
