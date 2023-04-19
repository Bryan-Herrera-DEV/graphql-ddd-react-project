import * as Yup from "yup";
import { Form, Formik, Field } from "formik";
import { type IUser } from "../../../interfaces/utils.interface";
import { toast } from "react-hot-toast";
import { gql, useMutation  } from "@apollo/client";
/*
mutation Login($password: String!, $email: String! ) {
  login(password: $password, email: $email)
}
*/

const Login = () => {
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().required("Required").email("Invalid email"),
    password: Yup.string().required("Required").min(6, "Too short"),
  });
  const initialValues: Omit<IUser, "todoLists" | "id"> = {
    email: "",
    password: "",
  };

  const LOGIN = gql`
    mutation Login($password: String!, $email: String!) {
      login(password: $password, email: $email)
    }
  `;
  const [login, { data, loading, error }] = useMutation(LOGIN);
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={async (values) => {
        toast.success("Login successful");  
        await login({
          variables: {
            email: values.email,
            password: values.password,
          }
        })          
      }}
    >
      {({ errors, touched }) => {
        return (
          <Form className="grid gap-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className={`input-bordered input ${
                  errors.email && touched.email ? "input-error" : ""
                }`}
              />
              {errors.email && touched.email ? (
                <div className="text-red-500">{errors.email}</div>
              ) : null}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className={`input-bordered input ${
                  errors.password && touched.password ? "input-error" : ""
                }`}
              />
              {errors.password && touched.password ? (
                <div className="text-red-500">{errors.password}</div>
              ) : null}
            </div>
            <div className="form-control">
              <button type="submit" className="btn-primary btn">
                Login
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Login;
