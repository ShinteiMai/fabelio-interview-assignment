import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register, userSelector } from "../features/userSlice";
import { useHistory } from "react-router-dom";
import { SliceStatus } from "../globals";

const signupSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be more than 6 characters")
    .max(26, "Password must be below than 26 characters")
    .required("Password is required"),
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(userSelector);
  const history = useHistory();

  const [error, setError] = useState("");

  useEffect(() => {
    if (status.state === SliceStatus.ERROR && status.error) {
      setError(status.error);
    }

    if (status.state === SliceStatus.SUCCESS) {
      localStorage.setItem("jwt", "");
      history.push("/login");
    }
    //eslint-disable-next-line
  }, [status]);

  return (
    <Layout title="Sign up">
      <div>
        <h1 className="text-5xl font-semibold">Sign up</h1>
        <p className="text-sm">
          Login or create an account to access more features and get more
          benefits such as promotional codes and discounts.
        </p>
        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            lastName: "",
          }}
          validationSchema={signupSchema}
          onSubmit={({ email, password, firstName, lastName }) => {
            dispatch(register({ email, password, firstName, lastName }));
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col flex-start items-start justify-between mt-4">
              <div className="mb-4">
                <Field
                  name="firstName"
                  className="shadow appearance-none border rounded py-1 px-3 text-grey-darker"
                />
                {errors.firstName && touched.firstName ? (
                  <div>{errors.firstName}</div>
                ) : null}
                <p>First Name</p>
              </div>
              <div className="mb-4">
                <Field
                  name="lastName"
                  className="shadow appearance-none border rounded py-1 px-3 text-grey-darker"
                />
                {errors.lastName && touched.lastName ? (
                  <div>{errors.lastName}</div>
                ) : null}
                <p>Last Name</p>
              </div>
              <div className="mb-4">
                <Field
                  name="email"
                  type="email"
                  className="shadow appearance-none border rounded py-1 px-3 text-grey-darker"
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
                <p>Email</p>
              </div>
              <div className="mb-4">
                <Field
                  name="password"
                  type="password"
                  className="shadow appearance-none border rounded py-1 px-3 text-grey-darker"
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                <p>Password</p>
              </div>

              <button
                type="submit"
                className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
              <div className="mb-8">{error && <p>{error}</p>}</div>

              {/* <GoogleAuth /> */}
              <a
                href="/login"
                className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
              >
                Login
              </a>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default RegisterPage;
