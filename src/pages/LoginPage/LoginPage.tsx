import React, { ChangeEvent, FormEvent, useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import axios from "axios";

const LoginPage = () => {
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const mystyle = {
    color: "white",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: "10px",
    fontFamily: "Arial"
  };

  const handleSubmit = (event: FormEvent) => {
    loginUser(email,password);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  
  const loginUser = async (login: string, password: string) => {

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var data = JSON.stringify({
  "email": email,
  "password": password
});

var result = await axios.post('http://localhost:5164/api/Account/Login', data, {
  headers: {
      'Content-Type': 'application/json',
  }
}
).then((response) => {
            localStorage.setItem("token", response.data);
         });
   };
    
  return(
    <Container>
      <div style = {mystyle}>
      <form onSubmit={handleSubmit}>
        <p>
<input type="text" id="login" placeholder="Email" onChange={handleEmailChange} value={email} />
        </p>
      <p>
<input type="text" placeholder="Password" id="password" onChange={handlePasswordChange} value={password}/>
      </p>
      <p>
<button type="submit" className="btn btn-primary">Login</button>
      </p>
      </form>
        </div> 
    </Container>
  );
}

export default LoginPage;