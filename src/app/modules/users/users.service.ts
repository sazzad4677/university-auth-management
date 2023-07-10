import config from "../../../config";
import { IUser } from "./users.interface";
import { User } from "./users.model";
import { generateUserID } from "./users.utils";

const getUser = async (): Promise<IUser[]> => {
  const users = await User.find({});
  return users;
};
const createUser = async (user: IUser): Promise<IUser | null> => {
  //  auto generated increment id
  user.id = await generateUserID();
  if (!user.password) {
    user.password = config.defaultUserPassword as string;
  }
  // Default Password
  const createUser = await User.create(user);
  if (!createUser) {
    throw new Error("Failed to create user");
  }
  return createUser;
};

export default {
  createUser,
  getUser,
};
