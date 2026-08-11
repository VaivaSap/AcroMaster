import { useForm } from "react-hook-form"
import React from "react";
import { registerUser } from "../Services/AuthService";
import { useNavigate} from "react-router-dom";
import { useState} from "react";


function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState(null);

 const onSubmit = async(data) => {
    const response = await registerUser(data);

    if(!response.ok) {
      const errorData = await response.json()
      console.error("Registration failed:", errorData);
      setRegisterError(errorData);
      return;
    }

    const responseData = await response.json();
    localStorage.setItem("token", responseData.token);
    console.log("Registration successful:", responseData);
    alert("Registration successful!");
    navigate("/");
  };

return (
    <div className="register-form text-white w-3/4 max-w-md py-8 px-6 bg-gray-800 rounded-lg shadow-md">
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
              required: { 
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
                message: "This field is required" } 
              }
            )}
          />
          {errors.password && <p className="text-pink-400 text-sm">{errors.password.message}</p>}
        </div>
        <button type="submit" className="bg-pink-400 active:bg-pink-500 hover:bg-pink-500 transition-colors text-white font-bold py-1 px-3 rounded">
          Submit
        </button>

        <div className="display-errors mt-4 text-sm text-gray-400">
        {registerError && (
          <div className="text-pink-400 text-sm mt-2">
            {registerError.map((regError) => (
              <div key={regError.code}>{regError.description}</div>
            ))}
          </div>
        )}
        </div>

      </form>
    </div>
  );
}

export default RegisterForm;