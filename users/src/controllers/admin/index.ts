import { eventProducer } from "../../events/producer.js";
import BuildCurrentAdmin from "./currentAdmin.js";
import BuildGetUsers from "./getUsers.js";
import BuildToggleBlock from "./toggleBlock.js";

const currentAdmin = BuildCurrentAdmin();
const getUsers = BuildGetUsers();
const toggleBlock = BuildToggleBlock(eventProducer);

export const adminController = Object.freeze({
  currentAdmin,
  getUsers,
  toggleBlock,
});

export type IAdminController = typeof adminController;
