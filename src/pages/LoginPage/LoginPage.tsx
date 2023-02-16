import React, { useState } from "react";
import { Container } from "react-bootstrap";

const Credentials = {
  login: "",
}

const LoginPage = () => {

  const [formData, setLogin] = useState(Credentials);

  const onChange= (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();

    loginUser(formData.login);
  }

  const loginUser = (login: string) => {
    console.log(login)

    localStorage.setItem("token", login)
  }

  return(
    <Container>
      <form action="" onSubmit={onSubmit}>
      <input type="text" id="login" onChange={onChange}/>
      <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </Container>
  );
}

export default LoginPage;