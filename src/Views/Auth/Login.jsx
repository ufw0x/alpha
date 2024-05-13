import React from "react";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  document.title = `Morning Courses Dashboard - Login`;
  const nav = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    try {
      let dataset = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      toast.loading("Loading", { id: "lgi" });
      let response = await axios.post(`auth/login`, dataset);
      let data = response.data.data;
      toast.success("Authenticated", { id: "lgi" });
      localStorage.setItem("_access-token", data.token);
      nav("/");
    } catch (error) {
      toast.error("Something went wrong", { id: "lgi" });
    }
  }
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-[90%] sm:w-[80%] md:w-[50%] lg:w-[35%] xl:w-[30%]">
        <div className="text-3xl mb-4 font-bold">Sign In</div>
        <form onSubmit={handleLogin}>
          <Input label="Email" type="email" name="email" />
          <Input
            label="Password"
            className="mb-3"
            type="password"
            name="password"
          />
          <Button>Login</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
