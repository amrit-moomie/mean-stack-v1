import User, { IUser } from "../schema/user";

export class UserDAO {
    async create(user: IUser): Promise<IUser> {
        return await user.save();
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }
}
