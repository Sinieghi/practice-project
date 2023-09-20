import React from "react";
import {
  Form,
  Link,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customAxios";
import { toast } from "react-toastify";
export const actions = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/users/login", data);
    toast.success("Login success");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    console.log(error);
    return error;
  }
};
const Login = () => {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      name: "Zippy",
      email: "test@test.com",
      password: "secret123",
      lastName: "ShakeAndBake",
      location: "Codeville",
    };
    try {
      await customFetch.post("/users/login", data);
      toast.success("Take a ride on demonstration trial");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          Demo
        </button>
        <p>
          not a member
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
