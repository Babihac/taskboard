import { useContext } from "react";
import { FormContext } from "../FormProvider";

export const Password = () => {
  const { form, registerFormValue } = useContext(FormContext);

  return (
    <div>
      <div className="mb-3">Password</div>
      <div className="field">
        <p className="control">
          <input
            required
            {...registerFormValue("password")}
            className="input"
            type="password"
            placeholder="password"
          />
        </p>
      </div>
      <div className="field">
        <p className="control">
          <input
            required
            {...registerFormValue("passwordConfirm")}
            className="input"
            type="password"
            placeholder="confirm password"
          />
        </p>
      </div>
    </div>
  );
};
