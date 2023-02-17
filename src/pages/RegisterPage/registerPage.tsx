import { AxiosResponse } from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./styles.css";
import AuthService from "../../shared/http-services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import RegisterRequest from "../../models/users/requests/registerRequest";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    registerUser(firstName, lastName, email, password);
  };

  const navigate = useNavigate();

  const registerUser = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    let RegisterCredentials: RegisterRequest = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    AuthService.registerUser(RegisterCredentials)
      .then((response: AxiosResponse<string>) => {
        alert(response.data);
        navigate("/sign-in");
      })
      .catch((err: Error) => console.log(err));
  };

  return (
    <Container className="login">
      <Form onSubmit={handleSubmit}>
        <Link role="button" to="/sign-in">
          {" "}
          Sign in
        </Link>

        <br />

        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="firstName"
            placeholder="Enter first name"
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
          />
        </Form.Group>

        <br />

        <Form.Group controlId="formLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="lastName"
            placeholder="Enter last name"
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
          />
        </Form.Group>

        <br />

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </Form.Group>

        <br />

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </Form.Group>

        <br />

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
