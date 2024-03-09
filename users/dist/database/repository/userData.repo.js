export class UserDataRepository {
    constructor(database) {
        this.database = database;
    }
    async create(userData) {
        return await this.database.create(userData);
    }
    async findByEmail(email) {
        return await this.database.findOne({ email });
    }
}
//# sourceMappingURL=userData.repo.js.map