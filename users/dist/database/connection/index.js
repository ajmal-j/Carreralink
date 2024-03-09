import { ConnectionError, NotFoundError } from "@carreralink/common";
import { connect } from "mongoose";
export const Connect = async (url) => {
    try {
        if (!url)
            throw new NotFoundError("Database url not found");
        await connect(url);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log(error);
        throw new ConnectionError("Database connection error");
    }
};
//# sourceMappingURL=index.js.map