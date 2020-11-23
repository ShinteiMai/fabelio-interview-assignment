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
            <Form className="flex flex-col">
              <div className="mb-4">
                <Field name="firstName" />
                {errors.firstName && touched.firstName ? (
                  <div>{errors.firstName}</div>
                ) : null}
                <p>First Name</p>
              </div>
              <div className="mb-4">
                <Field name="lastName" />
                {errors.lastName && touched.lastName ? (
                  <div>{errors.lastName}</div>
                ) : null}
                <p>Last Name</p>
              </div>
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

              <button type="submit">Register</button>
              {error && <p>{error}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default RegisterPage;
