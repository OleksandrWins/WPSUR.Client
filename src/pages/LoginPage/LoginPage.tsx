import { AxiosResponse } from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./styles.css";
import AuthService from "../../shared/http-services/AuthService";
import { Link } from "react-router-dom";
import LoginRequest from "../../models/users/requests/loginRequest";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    loginUser(email, password);
  };

  const loginUser = (email: string, password: string) => {
    let LoginCredentials : LoginRequest = {
      email: email,
      password: password,
    };

    AuthService.loginUser(LoginCredentials)
      .then((response: AxiosResponse<string>) => {
        console.log(response.status);
        localStorage.setItem("token", response.data);
        window.location.reload();
        
      }).catch((err: Error) => console.log(err));
      
  };

  return (
    <Container className="login">
      <Form onSubmit={handleSubmit}>
        <Link role="button" to="/sign-up">
          {" "}
          Sign up
        </Link>

        <br />

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}/>
        </Form.Group>

        <br />

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter last name"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </Form.Group>

        <br />

        <Button type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
