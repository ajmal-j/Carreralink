import BuldAdminLogin from "./login.js";

const adminLoginController = BuldAdminLogin();

export const adminController = {
  adminLoginController,
};
export type IAdminController = typeof adminController;
