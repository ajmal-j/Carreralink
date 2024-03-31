import { kafka } from "../producer/producer.js";
import BuildCreateUserConsumer from "./createUser.consumer.js";
import BuildUpdateUserConsumer from "./updateUser.consumer.js";

export default async () => {
  try {
    BuildCreateUserConsumer(kafka);
    BuildUpdateUserConsumer(kafka);
  } catch (error) {
    console.log(error);
    console.log("error connecting to kafka broker");
    process.exit(1);
  }
};
