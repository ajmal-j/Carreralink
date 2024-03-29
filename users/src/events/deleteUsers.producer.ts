import { Producer } from "kafkajs";

export function buildDeleteUsersProducer(producer: Producer) {
  return async ({ users }: { users: string[] }) => {
    await producer.send({
      topic: "users-delete",
      messages: [
        {
          value: JSON.stringify({ users }),
        },
      ],
    });
  };
}
