import { useForm } from "react-hook-form"
import React from "react";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

 const onSubmit = (data) => {
    console.log("data", data);
  };

return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format"
              }
            })}
          />
          {errors.email && (
            <p>This field is required and needs to be a valid email</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            placeholder="Enter your password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <p>This field is required</p>}
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default RegisterForm;