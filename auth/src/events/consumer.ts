import { kafka } from "./producer.js";
import BuildUpdateBlockConsumer from "./updateBlock.consumer.js";
import BuildDeleteUsersConsumer from "./deleteUsers.consumer.js";
import BuildRejectCompanyConsumer from "./rejectCompany.consumer.js";

export default async () => {
  try {
    BuildUpdateBlockConsumer(kafka);
    BuildDeleteUsersConsumer(kafka);
    BuildRejectCompanyConsumer(kafka);
  } catch (error) {
    console.log(error);
  }
};
