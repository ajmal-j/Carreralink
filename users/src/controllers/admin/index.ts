import { eventProducer } from "../../events/producer/producer.js";
import BuildCurrentAdmin from "./currentAdmin.js";
import BuildGetUsers from "./getUsers.js";
import BuildToggleBlock from "./toggleBlock.js";
import BuildDeleteUsers from "./deleteUsers.js";

const currentAdmin = BuildCurrentAdmin();
const getUsers = BuildGetUsers();
const toggleBlock = BuildToggleBlock(eventProducer);
const deleteUsers = BuildDeleteUsers(eventProducer);

export const adminController = Object.freeze({
  currentAdmin,
  getUsers,
  toggleBlock,
  deleteUsers,
});

export type IAdminController = typeof adminController;
