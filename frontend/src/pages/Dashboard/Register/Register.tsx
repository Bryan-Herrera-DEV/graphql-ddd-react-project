import * as Yup from 'yup';
import { Form, Formik, Field } from 'formik';
import { type IUser } from '../../../interfaces/utils.interface';

const Register = () => {
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().required("Required").email("Invalid email"),
    password: Yup.string().required("Required").min(6, "Too short"),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match'),
  });
  const initialValues: Omit<IUser, "todoLists" | "id"> = {
    email: "",
    password: "",
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={async (values) => {
        console.log('a');
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
              className={`input input-bordered ${
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
              className={`input input-bordered ${
                errors.password && touched.password ? "input-error" : ""
              }`}
            />
            {errors.password && touched.password ? (
              <div className="text-red-500">{errors.password}</div>
            ) : null}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <Field
              name="passwordConfirm"
              type="password"
              placeholder="Password"
              className={`input input-bordered ${
                errors.passwordConfirm && touched.passwordConfirm ? "input-error" : ""
              }`}
            />
            {errors.passwordConfirm && touched.passwordConfirm ? (
              <div className="text-red-500">{errors.passwordConfirm}</div>
            ) : null}
          </div>

          <div className="form-control">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </Form>
        )
      }}
    </Formik>
  );
}

export default Register
