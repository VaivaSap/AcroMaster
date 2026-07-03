import { useForm } from "react-hook-form"
import React from "react";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

 const onSubmit = (data) => {
    console.log("data", data);
  };

return (
    <div className="login-form text-white w-3/4 max-w-md py-8 px-6 bg-gray-800 rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4"> 
          <label htmlFor="email" className="block text-white mb-2">
            Email
          </label>
          <input id="email"
            className="w-full py-1 rounded-md border border-gray-300 pl-2"
            placeholder=". . ."
            type="email"
            {...register("email", {
              required:             { 
                value: true, 
                message: "This field is required" },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format"
              }
            })}
          />
          {errors.email && (
            <p className="text-pink-400 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-white mb-2">
            Password
          </label>
          <input
            id="password"
            className="w-full py-1 rounded-md border border-gray-300 pl-2"
            placeholder=". . ."
            type="password"
            {...register("password", { required: { 
                value: true, 
                message: "This field is required" } })}
          />
          {errors.password && <p className="text-pink-400 text-sm">{errors.password.message}</p>}
        </div>
        <button type="submit" className="bg-pink-400 active:bg-pink-500 hover:bg-pink-500 transition-colors text-white font-bold py-1 px-3 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;