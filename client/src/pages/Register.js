import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../utils/hooks";

const Register = (props) => {
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  };

  const { onChange, onSubmit, values } = useForm(registerUser, initialState);

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="username"
          placeholder="username"
          name="username"
          type="text"
          error={errors.username ? true : false}
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="password"
          placeholder="password"
          name="password"
          error={errors.password ? true : false}
          value={values.password}
          type="password"
          onChange={onChange}
        />
        <Form.Input
          label="confirmPassword"
          placeholder="confirmPassword"
          name="confirmPassword"
          error={errors.confirmPassword ? true : false}
          value={values.confirmPassword}
          type="password"
          onChange={onChange}
        />
        <Form.Input
          label="email"
          placeholder="email"
          name="email"
          error={errors.email ? true : false}
          value={values.email}
          type="email"
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      id
      email
      username
      token
      createdAt
    }
  }
`;

export default Register;
