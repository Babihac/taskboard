import bcrypt from "bcryptjs";
import { User } from "../model/User";
import { getManager, getConnection } from "typeorm";

const saltRounds = 10;

export class UserResult {
  constructor(public messages?: Array<string>, public user?: User) {}
}

const errors = {
  firstName: "First name cannot be empty",
  lastName: "Last name cannot be empty",
  email: "Email cannot be empty",
  username: "Username cannot be empty",
  password: "password cannot be empty",
  passwordConfirm: "You must confirm your password",
};

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string,
  passwordConfirm: string
): Promise<UserResult> => {
  const manager = getManager();
  const errorsArr = [];
  if (!firstName || firstName === "") errorsArr.push(errors.firstName);
  if (!lastName || lastName === "") errorsArr.push(errors.lastName);
  if (!email || email === "") errorsArr.push(errors.email);
  if (!username || username === "") errorsArr.push(errors.username);
  if (!password || password === "") errorsArr.push(errors.password);
  if (password !== passwordConfirm) errorsArr.push("Paswords do not match");

  if (errorsArr.length > 0) {
    return {
      messages: errorsArr,
    };
  }

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

export const updateUser = async (
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
  }
): Promise<UserResult> => {
  const user = await getConnection().manager.findOne(User, {
    id: parseInt(id),
  });
  if (!user) {
    return {
      messages: ["User not found"],
    };
  }

  const date = new Date();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  await getConnection().manager.save(User, {
    ...user,
    ...data,
    lastModifiedOn: `${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}`,
  });

  const updatedUser = await getConnection()
    .createQueryBuilder()
    .select([
      "user.firstName",
      "user.username",
      "user.id",
      "user.lastName",
      "user.email",
    ])
    .from(User, "user")
    .where("user.id = :id", { id: parseInt(id) })
    .getOne();

  return {
    user: updatedUser,
  };
};

export const updateUserPassword = async (
  id: string,
  oldPassword: string,
  newPassword: string,
  passwordConfirm: string
): Promise<UserResult> => {
  const user = await getConnection().manager.findOne(User, {
    id: parseInt(id),
  });
  if (!user) {
    return {
      messages: ["User not found"],
    };
  }

  const passwordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatch) {
    return {
      messages: ["Old password is incorrect"],
    };
  }

  if (newPassword !== passwordConfirm) {
    return {
      messages: ["Passwords do not match"],
    };
  }

  if (newPassword === "") {
    return {
      messages: ["Password cannot be empty"],
    };
  }
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  await getConnection().manager.save(User, {
    ...user,
    password: hashedPassword,
  });

  return {
    user,
  };
};
