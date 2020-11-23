import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import { login, userSelector } from "../features/userSlice";
import { SliceStatus } from "../globals";
import { useHistory } from "react-router-dom";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be more than 6 characters")
    .max(26, "Password must be below than 26 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(userSelector);
  const [error, setError] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    if (status.state === SliceStatus.ERROR && status.error) {
      setError(status.error);
    }

    if (status.state === SliceStatus.SUCCESS && !!localStorage.getItem("jwt")) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [status]);
  return (
    <Layout title="Products">
      <div>
        <h1 className="text-5xl font-semibold">Login</h1>
        <p className="text-sm">
          Login or create an account to access more features and get more
          benefits such as promotional codes and discounts.
        </p>
        <div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={({ email, password }) => {
              dispatch(login({ email, password }));
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col flex-start items-start justify-between mt-4">
                <div className="mb-4">
                  <Field
                    className="shadow appearance-none border rounded py-1 px-3 text-grey-darker"
                    name="email"
                    type="email"
                  />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                  <p className="text-sm">Email</p>
                </div>
                <div className="mb-4">
                  <Field
                    className="shadow appearance-none border rounded py-1 px-3 text-grey-darker"
                    name="password"
                    type="password"
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
                  Login
                </button>
                <div className="my-8">{!!error && <p>{error}</p>}</div>
                <a
                  href="/register"
                  className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                >
                  Register with Email
                </a>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
