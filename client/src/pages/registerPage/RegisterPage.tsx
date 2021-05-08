import react, { FC } from "react";
import { Redirect } from "react-router-dom";
import { useFormInput } from "../../hooks/useFormInput";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useUserAction } from "../../hooks/useUserAction";
import "./registerPage.scss";
const RegisterPage: FC = () => {
  const user = useTypedSelector((state) => state.user);
  const username = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");
  const passwordConfirm = useFormInput("");
  const firstname = useFormInput("");
  const lastname = useFormInput("");
  const { signupStart } = useUserAction();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupStart({
      firstName: firstname.value,
      lastName: lastname.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
      email: email.value,
      username: username.value,
    });
  };

  if (user.user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      {user.error && <p>{user.error[0]}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <h1 className="mb-5">Sign In</h1>
        <div className="field">
          <p className="control">
            <input
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
