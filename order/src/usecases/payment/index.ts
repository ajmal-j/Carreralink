import { Repositories } from "../../database/index.js";
import { eventProducer } from "../../events/producer/producer.js";
import { ConfirmPaymentUsecase } from "./confirm.usecase.js";
import { CreateSessionUseCase } from "./createSession.usecase.js";

const createSession = new CreateSessionUseCase(Repositories.OrderRepository);
const confirm = new ConfirmPaymentUsecase(
  Repositories.OrderRepository,
  eventProducer
);

export const PaymentUsecase = {
  createSession,
  confirm,
} as const;
