import react, { FC, useEffect } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useUserAction } from "../../hooks/useUserAction";
import "./changePassword.scss";

const ChangePassword: FC = () => {
  const { updateUserPasswordStart, removeMessage } = useUserAction();
  const oldPassword = useFormInput("");
  const passwordConfirm = useFormInput("");
  const newPassword = useFormInput("");
  const user = useTypedSelector((state) => state.user);
  const onSubmitForm = (e: react.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserPasswordStart(user.user!.id, {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      passwordConfirm: passwordConfirm.value,
    });
  };

  useEffect(() => {
    console.log("haha");
    removeMessage();
  }, []);
  return (
    <>
      {user.error && <div>{user.error}</div>}
      {user.message && <div>{user.message}</div>}
      <form onSubmit={onSubmitForm} className="box update-profile-form mt-5">
        <div className="field">
          <label className="label">Curent Password</label>
          <div className="control">
            <input
              {...oldPassword}
              className="input"
              type="password"
              placeholder="*****"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">New Password</label>
          <div className="control">
            <input
              {...newPassword}
              className="input"
              type="password"
              placeholder="*****"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control">
            <input
              {...passwordConfirm}
              className="input"
              type="password"
              placeholder="*****"
            />
          </div>
        </div>
        <button className="button is-primary">Update</button>
      </form>
    </>
  );
};

export default ChangePassword;
