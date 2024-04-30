import { Repositories } from "../../database/index.js";
import { ConfirmPaymentUsecase } from "./confirm.usecase.js";
import { CreateSessionUseCase } from "./createSession.usecase.js";

const createSession = new CreateSessionUseCase();
const confirm = new ConfirmPaymentUsecase(Repositories.OrderRepository);

export const PaymentUsecase = {
  createSession,
  confirm,
} as const;
