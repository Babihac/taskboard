import { UserType } from "../../types/UserType";
import { UserUpdateInterface } from "../../types/userUpdateData";

export const updateUser = (
  currentUser: UserType,
  updatedData: UserUpdateInterface
) => {
  return { ...currentUser, ...updatedData };
};
