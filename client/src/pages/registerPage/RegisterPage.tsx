import react, { FC } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import { useUserAction } from "../../hooks/useUserAction";
import "./registerPage.scss";
const RegisterPage: FC = () => {
  const username = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");
  const passwordConfirm = useFormInput("");
  const firstname = useFormInput("");
  const lastname = useFormInput("");

  const handleSubmit = () => {};

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="register-form">
        <h1 className="mb-5">Sign In</h1>
        <div className="field">
          <p className="control">
            <input
              {...firstname}
              className="input"
              type="text"
              placeholder="First Name"
            />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <input
              {...lastname}
              className="input"
              type="text"
              placeholder="Last Name"
            />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <input
              {...username}
              className="input"
              type="text"
              placeholder="Username"
            />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <input
              {...email}
              className="input"
              type="email"
              placeholder="Email"
            />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <input
              {...password}
              className="input"
              type="password"
              placeholder="Password"
            />
          </p>
        </div>

        <div className="field">
          <p className="control">
            <input
              {...passwordConfirm}
              className="input"
              type="password"
              placeholder="Confirm Password"
            />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button className={`button is-success is-centered`}>Sign Up</button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
