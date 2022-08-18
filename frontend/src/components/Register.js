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

const Register = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useNavigate();

  const registerUser = async () => {
   
    const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password_hash: password,
        }),
    });

    const data = await res.json();
    console.log(data);
    return data;
  };

    const handleSubmit = async (e) => {
        console.log(username, password);
        e.preventDefault();
        registerUser().then((data) => {
            props.setToken(data.access_token);
            localStorage.setItem("token", JSON.stringify(data.access_token));
            history("/");
        });
    };

  return (
    <Container>
        <h1>Register</h1>
      <Form>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>
          Register
        </button>
        <span onClick={() => history("/login")}>Already have an account?</span>
      </Form>
    </Container>
  );
};

export default Register;
