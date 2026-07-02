import RegisterForm from "../Components/RegisterForm";
          
function Register() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 bg-gray-900">   
    <h1 className="text-pink-400 text-2xl font-bold mb-4">Create an account</h1> 
      <RegisterForm />
    </div>
  );
}

export default Register;