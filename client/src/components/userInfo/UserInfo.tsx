import react, { FC } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useUserAction } from "../../hooks/useUserAction";
import "./userInfo.scss";

const UserInfo: FC = () => {
  const user = useTypedSelector((state) => state.user.user);
  const pending = useTypedSelector((state) => state.user.pending);
  const firstname = useFormInput(user!.firstName);
  const lastname = useFormInput(user!.lastName);
  const username = useFormInput(user!.username);
  const email = useFormInput(user!.email);
  const { updateUserStart } = useUserAction();
  const onSubmitForm = (e: react.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserStart(user!.id, {
      firstName: firstname.value,
      lastName: lastname.value,
      email: email.value,
      username: username.value,
    });
  };

  return (
    <form onSubmit={onSubmitForm} className="box update-profile-form mt-5">
      <div className="field">
        <label className="label">First Name</label>
        <div className="control">
          <input
            {...firstname}
            className="input"
            type="text"
            placeholder="First Name"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Last Name</label>
        <div className="control">
          <input
            {...lastname}
            className="input"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input
            {...username}
            className="input"
            type="text"
            placeholder="Username"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            {...email}
            className="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>

      <button
        className={
          pending ? "button is-primary is-loading" : "button is-primary"
        }
      >
        Update
      </button>
    </form>
  );
};

export default UserInfo;
