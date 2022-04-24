import { useContext } from "react";
import { FormContext } from "../FormProvider";

export const UserInfo = () => {
  const { form, registerFormValue } = useContext(FormContext);

  return (
    <div>
      <div style={{ textAlign: "center", fontSize: "2rem" }} className="mb-3">
        User Info
      </div>
      <div className="field">
        <p className="control">
          <label htmlFor="">User Name</label>
          <input
            required
            {...registerFormValue("username")}
            className="input"
            type="text"
            placeholder="username"
          />
        </p>
      </div>
      <div className="field">
        <p className="control">
          <label htmlFor="">Email</label>
          <input
            required
            {...registerFormValue("email")}
            className="input"
            type="email"
            placeholder="email"
          />
        </p>
      </div>
    </div>
  );
};
