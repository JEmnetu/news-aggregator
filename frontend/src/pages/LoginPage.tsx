import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import ToastContainer from 'react-bootstrap/ToastContainer'

const LoginPage = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null)
    const [showToast, setShowToast] = useState<boolean>(false)

    const { login } = useAuth();
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            await login(email, password)
            navigate('/')
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.detail)
                setShowToast(true)
                setTimeout(() => {
                    setShowToast(false)
                }, 3000)
            }
            else {
                setError('Something went wrong.')
                setShowToast(true)
                setTimeout(() => {
                    setShowToast(false)
                }, 3000)
            }
        }
    }

    return <>

        <Container className='d-flex flex-column justify-content-center' style={{ minHeight: 'calc(100vh - 85px)' }}>
            <Row className='justify-content-center mb-3'>
                <Col md={6}>
                    <h2>Sign in</h2>
                </Col>
            </Row>
            <Row>

                <Form>
                    <Row className='justify-content-center'>
                        <Col md={6}>
                            <Form.Group className='mb-3' controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className='justify-content-center'>
                        <Col md={6}>
                            <Button style={{ width: '100%' }} variant='primary' onClick={handleLogin}>Log In</Button>
                        </Col>
                    </Row>
                </Form>
            </Row>

            <Row className='mt-4 justify-content-center'>
                <Col md={6}>
                    <p>Don't have an account? <Link to='/register'>Register</Link></p>
                </Col>
            </Row>
            <Row>
                <Col md={6} className='mb-2'>
                    <ToastContainer className='p-3' position='bottom-end' style={{ zIndex: 1 }}>
                        <Toast show={showToast} bg='danger'>
                            <Toast.Body className='text-white'>{error}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </Col>
            </Row>
        </Container>
    </>
}



export default LoginPage