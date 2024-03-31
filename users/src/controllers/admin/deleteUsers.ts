import { CustomResponse, NotFoundError } from "@carreralink/common";
import { deleteUsersUsecase } from "../../usecases/index.js";
import { IEventProducer } from "../../events/producer/producer.js";

export default function (eventProducer: IEventProducer) {
  return async (req: any) => {
    const { users } = req.body;
    if (!users.length) throw new NotFoundError("Id not found");
    const user = await deleteUsersUsecase.execute(users);
    if (!user) throw new NotFoundError("User not found");
    await eventProducer.deleteUsers({ users: user?.map((u) => u.email) });
    return new CustomResponse().response();
  };
}
