import { Producer } from "kafkajs";

export function buildRejectCompanyProducer(producer: Producer) {
  return async ({ email }: { email: string }) => {
    await producer.send({
      topic: "company-reject",
      messages: [
        {
          value: JSON.stringify({
            email,
          }),
        },
      ],
    });
  };
}
