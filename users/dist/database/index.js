import { UserDataModel } from "./models/userData.model.js";
import { UserDataRepository } from "./repository/userData.repo.js";
export const Repositories = {
    UserDataRepo: new UserDataRepository(UserDataModel),
};
//# sourceMappingURL=index.js.map