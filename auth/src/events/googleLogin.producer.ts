import { Producer } from "kafkajs";

export function buildGoogleLoginProducer(producer: Producer) {
  return async (user: Object) => {
    await producer.send({
      topic: "google-login",
      messages: [
        {
          value: JSON.stringify(user),
        },
      ],
    });
  };
}
