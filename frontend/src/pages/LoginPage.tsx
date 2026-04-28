import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { login } = useAuth();
    const navigate = useNavigate()

    const handleLogin = async () => {
        await login(email, password)
        navigate('/')
    }

    return <>

        <Container>
            <Row>
                <h1>Login Page</h1>
            </Row>
            <Row>

                <Form>
                    <Form.Group className='mb-3' controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button variant='primary' onClick={handleLogin}>Submit</Button>
                </Form>
            </Row>

            <Row className='mt-4'>
                <Col>
                    <p>Don't have an account? <Link to='/register'>Register</Link></p>
                </Col>
            </Row>
        </Container>
    </>
}



export default LoginPage