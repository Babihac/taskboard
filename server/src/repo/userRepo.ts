import bcrypt from "bcryptjs";
import { User } from "../model/User";
import { getManager, getConnection } from "typeorm";

const saltRounds = 10;

export class UserResult {
  constructor(public messages?: Array<string>, public user?: User) {}
}

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string,
  passwordConfirm: string
): Promise<UserResult> => {
  const manager = getManager();
  const existingUser = await manager.findOne(User, { email });
  if (existingUser) {
    return {
      messages: ["This email address is already in use"],
    };
  }
  if (password !== passwordConfirm) {
    return {
      messages: ["Passwords do not match"],
    };
  }

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await manager.create(User, {
    firstName,
    lastName,
    password: hashedPassword,
    email,
    username,
  });
  await manager.save(newUser);
  newUser.password = "";
  return {
    user: newUser,
  };
};

export const login = async (
  username: string,
  password: string
): Promise<UserResult> => {
  const existingUser = await getConnection().manager.findOne(User, {
    username,
  });
  if (!existingUser) {
    return {
      messages: ["Wrong login credentials"],
    };
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    return {
      messages: ["Wrong login credentials"],
    };
  }
  existingUser.password = "";
  return {
    user: existingUser,
  };
};

// export const logout = async (): Promise<UserResult> => {
// }

export const findUser = async (id: string): Promise<UserResult> => {
  const user = await await getConnection().manager.findByIds(User, [id]);

  if (!user) {
    return {
      messages: ["user not found"],
    };
  }

  return {
    user: user[0],
  };
};
