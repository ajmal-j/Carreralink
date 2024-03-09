import { CustomError } from "@carreralink/common";
import { User } from "../entities/userData.entity.js";
export class CreateUserUsecase {
    constructor(database) {
        this.database = database;
    }
    async execute(userData) {
        const userExist = await this.database.findByEmail(userData.email);
        if (userExist)
            throw new CustomError("User already exists", 409);
        const user = new User(userData);
        console.log(user);
        return;
    }
}
//# sourceMappingURL=createUser.usecase.js.map