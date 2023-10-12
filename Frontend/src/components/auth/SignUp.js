import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { UserRegSchema } from "../../schemas/UserSchema";
import { database } from "../util/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState, forwardRef, useImperativeHandle } from "react";
import { Formik } from "formik";
import { notify } from "../ToastMessage";
import Spinner from "react-bootstrap/Spinner";

const SignUpForm = forwardRef((_props, ref) => {
  const [formKey, setFormKey] = useState(0); // add a key to reset the form
  useImperativeHandle(ref, () => ({
    resetFormChanges() {
      setFormKey((prevKey) => prevKey + 1); // increment the key to reset the form
      setInitialValues(initData);
    },
  }));
  const initData = {
    password: "",
    email: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(initData);
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      setIsLoading(true);
      const authData = await createUserWithEmailAndPassword(
        database,
        values.email,
        values.password
      );
      console.log(`authData`, authData);
      setSubmitting(false);
      setIsLoading(false);
      resetForm();
      notify("success", "User registered successfully");
      navigate("/auth");
    } catch (error) {
      console.error(`error`, error);
      let errorMessage = "";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use";
      } else {
        errorMessage = "Something went wrong";
      }
      setSubmitting(false);
      setIsLoading(false);
      notify("error", errorMessage);
    }
  };

  return (
    <div className="form-container sign-up-container">
      {isLoading && (
        <div className="loading-overlay">
          <Spinner animation="border" role="status" />
        </div>
      )}
      <Formik
        key={formKey} // add the key to reset the form
        validationSchema={UserRegSchema}
        onSubmit={submitHandler}
        initialValues={initialValues}
        enableReinitialize={true}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit} className="auth_form">
            <Row className="mb-3">
              <Form.Group md="4" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid" data-testid="error-email">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  isValid={touched.confirmPassword && !errors.confirmPassword}
                  isInvalid={touched.confirmPassword && errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <button className="auth_btn" type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default SignUpForm;
