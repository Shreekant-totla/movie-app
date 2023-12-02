import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  display: ${(props)=> props.auth ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const Login = ({ auth, onClose, redirectToLogin,setUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (redirectToLogin) {
      setIsSignUp(false); // Switch to login mode after successful signup
    }
  }, [redirectToLogin])

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("")
    // Perform login or signup logic here
    if (isSignUp) {
      // Signup logic
      const user = { username, password };
      localStorage.setItem("user", JSON.stringify(user));
      alert("Signup successful!");
      redirectToLogin(); // Redirect to login after signup
    } else {
      // Login logic
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.username === username && storedUser.password === password) {
        alert("Login successful!");
        setUser(storedUser)
        onClose(); // Close the modal after login
      } else {
        alert("Invalid credentials. Please try again.");
      }
    }
  };

  return (
    <ModalContainer auth={auth}>
      <ModalContent>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">{isSignUp ? "Sign Up" : "Login"}</Button>
        </Form>
        <Button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Switch to Login" : "Switch to Sign Up"}
        </Button>
        <Button onClick={onClose}>Close</Button>
      </ModalContent>
    </ModalContainer>
  );
};

export default Login;
