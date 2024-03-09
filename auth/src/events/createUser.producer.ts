import { Producer } from "kafkajs";
import { IUser } from "../entities/user.entity.js";

export function buildCreateUserProducer(producer: Producer) {
  return async (user: IUser) => {
    await producer.send({
      topic: "user-created",
      messages: [
        {
          value: JSON.stringify(user),
        },
      ],
    });
  };
}
