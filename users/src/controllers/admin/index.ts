import BuildCurrentAdmin from "./currentAdmin.js";
import BuildGetUsers from "./getUsers.js";

const currentAdmin = BuildCurrentAdmin();
const getUsers = BuildGetUsers();

export const adminController = Object.freeze({
  currentAdmin,
  getUsers,
});

export type IAdminController = typeof adminController;
