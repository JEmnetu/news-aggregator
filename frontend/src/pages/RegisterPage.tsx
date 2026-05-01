import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const RegisterPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(email, password, firstName, lastName);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.detail);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } else {
        setError('Something went wrong.');
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    }
  };

  return (
    <>
      <Container
        className="d-flex flex-column justify-content-center"
        style={{ minHeight: 'calc(100vh - 85px)' }}
      >
        <Row className="justify-content-center mb-2">
          <Col md={6}>
            <h2>Create an account</h2>
          </Col>
        </Row>
        <Form>
          <Row className="justify-content-center">
            <Col md={6}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={6}>
              <Button
                style={{ width: '100%' }}
                variant="primary"
                onClick={handleRegister}
              >
                Register
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          <Row className="mt-3 justify-content-center">
            <Col md={6}>
              <p>
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </Col>
          </Row>
          <Col md={6} className="mb-2">
            <ToastContainer
              className="p-3"
              position="bottom-end"
              style={{ zIndex: 1 }}
            >
              <Toast show={showToast} bg="danger">
                <Toast.Body className="text-white">{error}</Toast.Body>
              </Toast>
            </ToastContainer>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPage;
