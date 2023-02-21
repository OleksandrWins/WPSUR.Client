import { AxiosResponse } from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row} from "react-bootstrap";
import "../../styles/custom.css";
import AuthService from "../../shared/http-services/AuthService";
import { Navigate, useNavigate } from "react-router";


const LoginPage = () => {
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const navigate = useNavigate();

  //useEffect(()=>{navigate('/*',{replace : true})},[token])
  const handleSubmit = (event: FormEvent) => {
    loginUser(email,password);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  
  const loginUser = (login: string, password: string) => {
  var data = JSON.stringify({
  "email": email,
  "password": password});

  AuthService.loginUser(data)
  .then((response: AxiosResponse<string>) => {
    console.log(response);
    localStorage.setItem("token",response.data);
    setToken(response.data);
  })
  .catch((err: any) => console.log(err));
}

  return(
    <Container>

<Row>
        <Col />
        <Col><Form className="justify-content-center">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={email} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={password} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    </Col>
        <Col />
        </Row>
    </Container>
  );
  }

export default LoginPage;