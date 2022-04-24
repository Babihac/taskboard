import react, { FC, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { useFormInput } from "../../hooks/useFormInput";
import { useForm } from "../../hooks/useForm";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useUserAction } from "../../hooks/useUserAction";
import { Stepper } from "react-form-stepper";
import FormProvider, { FormContext } from "./FormProvider";
import "./registerPage.scss";
import { useMachine } from "@xstate/react";
import formMachine from "./formMachine";

interface Form {
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
  email: string;
  username: string;
}

const RegisterPage: FC = () => {
  const { signupStart } = useUserAction();
  const [current, send] = useMachine(formMachine);
  const user = useTypedSelector((state) => state.user);
  const { form } = useContext(FormContext);
  const { CurrentStep, currentStepNumber } = current.context.step;
  const { lastStep } = current.context;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("CALLED");
    e.preventDefault();
    signupStart(form);
  };

  if (user.user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      {user.error && <p>{user.error[0]}</p>}
      <div className="mt-5" style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem" }}>Sign Up</h1>
      </div>
      <Stepper
        steps={[
          { label: "Main info" },
          { label: "User info" },
          { label: "Password" },
        ]}
        activeStep={currentStepNumber}
      />
      <form onSubmit={handleSubmit} className="register-form">
        <CurrentStep />
        <div className="field mt-5">
          <div
            style={{ display: "flex" }}
            className="is-flex-direction-row is-justify-content-space-between"
          >
            {currentStepNumber > 0 && (
              <button
                onClick={() => {
                  send({ type: "PREV" });
                }}
                type="button"
                className={`button is-success `}
              >
                Previos
              </button>
            )}

            {currentStepNumber === lastStep && (
              <button className={`button is-success `}>Sign Up</button>
            )}
            {currentStepNumber < lastStep && (
              <button
                style={{ marginLeft: "auto" }}
                onClick={() => {
                  send({ type: "NEXT" });
                }}
                type="button"
                className={`button is-success `}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

const RegisterPageWithProvider = () => {
  return (
    <FormProvider>
      <RegisterPage />
    </FormProvider>
  );
};

export default RegisterPageWithProvider;
