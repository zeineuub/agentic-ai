import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "./AuthPage.css"; 
import Image from 'react-bootstrap/Image';
import { useAuth } from '../../utils/AuthContext';

import TalanLogoDark from "../../assets/images/talan-image.png"; // Logo Talan
import AuthBG from "../../assets/images/auth-bg.png"; // Image de fond
const AuthPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    // try {
    //   const requestBody = { email, password };
    //   const response = await axios.post(
    //     "https://api.p2.lc2s5.foxhub.space/login",
    //     requestBody
    //   );
    //   localStorage.setItem("access_token", response.data.access_token);
    //   navigate("/");
    // } catch (error) {
    //   console.log(error);
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: error?.response?.data?.message || "Something went wrong!",
    //   });
    // }
    login(email);
    navigate("/home");
  }

  // Connexion SSO (exemple)
  const handleAzureSSO = () => {

    window.location.href = "https://login.microsoftonline.com/.../oauth2/v2.0/authorize?...";
  };

  return (
    <Container fluid className="auth-page h-100">
      <Row className="h-100">
    <Col
      md={6}
      className="d-flex flex-column justify-content-center align-items-center bg-white p-5"
    >
  <div className="w-100" style={{ maxWidth: "90%" }}>
    <div className="text-center mb-4">
      <img 
        src={TalanLogoDark} 
        alt="Talan Logo" 
        className="mb-2" 
        style={{ width: "12em" }}
      />
      <h2 className="mb-3 fw-bold">Login to your account</h2>
      <p className="text-muted">Welcome back! </p>
    </div>

    <Form onSubmit={handleLogin}>
      <Form.Group controlId="formEmail" className="mb-4">
        <Form.Label className="fw-medium text-secondary">Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          className="rounded-pill  border-2"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            borderColor: '#D54FAF',
            transition: 'all 0.3s ease',
            backgroundColor: 'white', 
          }}
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-">
        <Form.Label className="fw-medium text-secondary">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          className="rounded-pill border-2"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            borderColor: '#D54FAF',
            transition: 'all 0.3s ease',
            backgroundColor: 'white', 
          }}
        />
      </Form.Group>

      <Button 
        variant="primary" 
        type="submit" 
        className="w-100 btn-submit rounded-pill  fw-medium  align-items-center justify-content-center shadow-sm mb-3"
      >
        Sign In
      </Button>
      
      <div className="position-relative text-center mb-4">
        <hr className="text-muted" />
        <span className="position-absolute bg-white px-2" style={{ 
          top: '-0.8em', 
          left: '50%', 
          transform: 'translateX(-50%)',
        }}>
          Or
        </span>
      </div>

      <Button 
        variant="outline-secondary" 
        className="w-100 rounded-pill btn-azure fw-medium d-flex align-items-center justify-content-center shadow-sm mb-3"
        onClick={handleAzureSSO}
        style={{
          border: '0.2rem solid var(--border-color)',
          transition: 'all 0.3s ease'
        }}
      >
         <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" 
                  alt="Azure" 
                  className="me-2"
                  style={{ width: '1.25rem' }} 
                />
        Continue with Azure AD
      </Button>
    </Form>
  </div>
</Col>

       
        
<Col
  md={6}
  className="d-none d-md-flex p-0" 
  style={{ height: "100vh" }}
>
  <div className="w-100 h-100">
    <Image
      src={AuthBG}
      alt="background"
      className="h-100 w-100"
      style={{ 
        objectFit: 'cover', 
        objectPosition: 'center' 
      }}
    />
  </div>
  

      
</Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
