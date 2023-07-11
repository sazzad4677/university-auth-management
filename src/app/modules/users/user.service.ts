import config from "../../../config";
import { ApiError } from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateUserID } from "./user.utils";

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
    throw new ApiError(400, "Failed to create user");
  }
  return createUser;
};

export const UserService = {
  createUser,
  getUser,
};
