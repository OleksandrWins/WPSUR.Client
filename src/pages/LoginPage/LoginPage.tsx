import { AxiosResponse } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../../styles/custom.css";
import AuthService from "../../shared/http-services/AuthService";
import LoginRequest from "../../models/users/requests/LoginRequest";

const LoginPage = () => {
  const [emailInput, setEmail] = useState<string>("");
  const [passwordInput, setPassword] = useState<string>("");

  const loginSubmit = (event: FormEvent<HTMLElement>) => {
    console.log(event);
    login(emailInput, passwordInput);
  };

  const login = (email: string, password: string) => {
    let userData: LoginRequest = {
      email: email,
      password: password,
    };

    AuthService.LoginUser(userData)
      .then(async (response: AxiosResponse<string>) => {
        localStorage.setItem("token", response.data);
        window.location.reload();
      })
      .catch((err: any) => console.error(err));
  };

  return (
    <Container>
      <Row>
        <Col />
        <Col>
          <Form
            className="justify-content-center"
            onSubmit={(event) => {
              event.preventDefault();
              loginSubmit(event);
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(event) => {
                  event.preventDefault();
                  setEmail(event.target.value);
                }}
                value={emailInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  event.preventDefault();
                  setPassword(event.target.value);
                }}
                value={passwordInput}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col />
      </Row>
    </Container>
  );
};

export default LoginPage;
