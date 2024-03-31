import { Producer } from "kafkajs";

export function buildCreateCompanyProducer(producer: Producer) {
  return async (user: Object) => {
    console.log("companyCreated event triggered");
    await producer.send({
      topic: "company-created",
      messages: [
        {
          value: JSON.stringify(user),
        },
      ],
    });
  };
}
