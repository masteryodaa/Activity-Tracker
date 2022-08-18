import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #758bfd;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 50%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  label {
    margin: 10px 0;
  }

  input {
    padding: 10px;
    border: none;
    border-radius: 5px;
    outline: none;
  }

  button {
    margin: 20px 0;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #758bfd;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }

  span {
    color: #758bfd;
    font-weight: 600;
    cursor: pointer;
  }
`;

const Login = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useNavigate();

  const loginUser = async () => {
    const searchParams = new URLSearchParams();
    searchParams.append("username", username);
    searchParams.append("password", password);

    const response = await fetch("http://localhost:8000/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: searchParams.toString(),
    });
    const data = await response.json();

    return data;
  };

  const handleSubmit = async (e) => {

    console.log(username, password);

    e.preventDefault();
        loginUser().then((data) => {
            props.setToken(data.access_token);
            localStorage.setItem("token", JSON.stringify(data.access_token));
            console.log(data);
            history("/");
        });
    };

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" placeholder="Enter your username..." value={username} onChange={e => setUsername(e.target.value)} />
        <label>Password</label>
        <input type="password" placeholder="Enter your password..." value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <span onClick={()=>history("/register")} >Don't have an account? Register</span>
      </Form>
    </Container>
  );
};

export default Login;
