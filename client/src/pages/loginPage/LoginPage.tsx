import React, { useContext } from "react";
import react, { FC } from "react";
import { Redirect } from "react-router-dom";
import "./loginPage.scss";
import { useFormInput } from "../../hooks/useFormInput";
import { useUserAction } from "../../hooks/useUserAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { LanguageContext } from "../../languageContext/context";
const LoginPage: FC = () => {
  const { languageModel } = useContext(LanguageContext);
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
        <h1 className="mb-5">{languageModel.login.signInText}</h1>
        {error && <p>{languageModel.login.errorMessage} </p>}
        <div className="field">
          <p className="control">
            <input
              {...username}
              className="input"
              type="text"
              placeholder={languageModel.login.userName}
            />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <input
              {...password}
              className="input"
              type="password"
              placeholder={languageModel.login.password}
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
              {languageModel.login.login}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
