import { useContext } from "react";
import { FormContext } from "../FormProvider";

export const MainInfo = () => {
  const { form, registerFormValue } = useContext(FormContext);

  return (
    <div>
      <div style={{ textAlign: "center", fontSize: "2rem" }} className="mb-3">
        Main Info
      </div>
      <div className="field">
        <p className="control">
          <input
            required
            {...registerFormValue("firstName")}
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
            {...registerFormValue("lastName")}
            className="input"
            type="text"
            placeholder="Last Name"
          />
        </p>
      </div>
    </div>
  );
};
