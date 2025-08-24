import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../utils/UserSlice";
import { BASE_URL } from "../../utils/Constants";

const Login = () => {
  const [errors, seterror] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row p-6 bg-black">
      <div className="hidden md:flex w-1/2 border-2 h-full border-white rounded-tl-3xl rounded-bl-3xl px-8 py-12 flex-col justify-between">
        <h1 className="text-amber-300 text-4xl Logo">Dev-Tinder</h1>
        <h1 className="text-2xl text-white">Welcome back to Dev-Tinder!</h1>
      </div>

      <div className="w-full p-2 md:w-1/2 border-2 h-full border-white md:rounded-tr-3xl md:rounded-br-3xl py-12 px-8 flex justify-center items-center">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => {
            const error = {};
            if (!values.email) {
              error.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              error.email = "Invalid email address";
            }
            if (!values.password) {
              error.password = "Required";
            }
            return error;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await fetch( BASE_URL + "/login", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(values),
              });
              const data = await response.json();
              dispatch(addUser(data.user))
              // console.log(data.message);

              if (!response.ok) {
                seterror(data.message);
                console.log(errors);
                return;
              } else {
                navigate("/");
              }
            } catch {
              // console.log(errors);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-full h-auto flex flex-col items-center gap-8">
              <h1 className="text-3xl font-semibold text-white mb-7">Login</h1>

              <div className="w-full md:w-2/3 flex flex-col">
                <Field
                  className="text-white px-5 py-3 border-b border-white bg-transparent focus:outline-none text-sm sm:text-base md:text-lg"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="w-full md:w-2/3 flex flex-col">
                <Field
                  className="text-white px-5 py-3 border-b border-white bg-transparent focus:outline-none text-sm sm:text-base md:text-lg"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {errors && <p style={{ color: "red" }}>{errors}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-2/3 text-white py-3 rounded-md bg-gray-500 font-semibold hover:bg-gray-700"
              >
                Login Now
              </button>

              <p className="text-sm md:text-lg text-white">
                Create a New Account?{" "}
                <Link to={"/register"} className="underline">
                  Sign Up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
