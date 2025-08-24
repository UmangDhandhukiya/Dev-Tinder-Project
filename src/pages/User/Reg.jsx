import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BASE_URL } from "../../utils/Constants";

const Reg = () => {
  const [error, seterror] = useState();
  const navigate = useNavigate()
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row p-6 bg-black">
      <div className="hidden md:flex w-1/2 border-2 h-full border-white rounded-tl-3xl rounded-bl-3xl px-8 py-12 flex-col justify-between">
        <h1 className="text-amber-300 text-4xl Logo">Dev-Tinder</h1>
        <h1 className="text-2xl text-white">
          Create your dev profile today and find your perfect project partner!
        </h1>
      </div>

      <div className="w-full p-2 md:w-1/2 border-2 h-full border-white md:rounded-tr-3xl md:rounded-br-3xl py-12 px-8 flex items-center justify-center">
        <Formik
          initialValues={{
            fName: "",
            lName: "",
            email: "",
            password: ""
          }}
          validate={(values) => {
            const errors = {};
            if (!values.fName) {
              errors.fName = "Required";
            }
            if (!values.lName) {
              errors.lName = "Required";
            }
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            // console.log(values);
            const response = await fetch( BASE_URL + "/signup", {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(values)
            });
            const data = await response.json();
            if (!response.ok) {
              seterror(data.message);
              return;
            } else {
              // console.log(data.message);
              navigate("/login")

            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-full h-auto flex flex-col items-center gap-8">
              <h1 className="text-3xl font-semibold text-white mb-7">
                Register
              </h1>

              <div className="w-full md:w-2/3 flex flex-col">
                <Field
                  className="text-white px-5 py-3 border-b border-white bg-transparent focus:outline-none text-sm sm:text-base md:text-lg"
                  type="text"
                  name="fName"
                  placeholder="First Name"
                />
                <ErrorMessage
                  name="fName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="w-full md:w-2/3 flex flex-col">
                <Field
                  className="text-white px-5 py-3 border-b border-white bg-transparent focus:outline-none text-sm sm:text-base md:text-lg"
                  type="text"
                  name="lName"
                  placeholder="Last Name"
                />
                <ErrorMessage
                  name="lName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

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

              {error && <p style={{ color: "red" }}>{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-2/3 text-white py-3 rounded-md bg-gray-500 font-semibold hover:bg-gray-700"
              >
                Sign Up
              </button>

              <p className="text-sm md:text-lg text-white">
                Already Have an Account?{" "}
                <Link to={"/login"} className="underline">
                  Login Now
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Reg;
