import React from "react";
import react, { FC } from "react";
import { Redirect } from "react-router-dom";
import "./loginPage.scss";
import { useFormInput } from "../../hooks/useFormInput";
import { useUserAction } from "../../hooks/useUserAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
const LoginPage: FC = () => {
  const { loginStart } = useUserAction();
  const username = useFormInput("");
  const password = useFormInput("");

  const pending = useTypedSelector((state) => state.user.pending);
  const error = useTypedSelector((state) => state.user.error);
  const user = useTypedSelector((state) => state.user.user);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginStart(username.value, password.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="mb-5">Sign In</h1>
        {error && <p>Invalid username or password {error} </p>}
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
              {...password}
              className="input"
              type="password"
              placeholder="Password"
            />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button
              className={`button is-success is-centered ${
                pending ? "is-loading" : ""
              }`}
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
