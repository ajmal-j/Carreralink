import { Producer } from "kafkajs";

export function buildUpdateUsersProducer(producer: Producer) {
  return async ({
    user,
  }: {
    user: {
      email: string;
      username: string;
      profile: string;
    };
  }) => {
    await producer.send({
      topic: "user-updated",
      messages: [
        {
          value: JSON.stringify({ user }),
        },
      ],
    });
  };
}
