import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import { login, userSelector } from "../features/userSlice";
import { SliceStatus } from "../globals";
import { useHistory } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";

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
      console.log("got here");
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
              <Form className="flex flex-col">
                <div className="mb-4">
                  <Field name="email" type="email" />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                  <p>Email</p>
                </div>
                <div className="mb-4">
                  <Field name="password" type="password" />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                  <p>Password</p>
                </div>

                <button type="submit">Submit</button>
                {!!error && <p>{error}</p>}
              </Form>
            )}
          </Formik>
          <GoogleAuth />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
