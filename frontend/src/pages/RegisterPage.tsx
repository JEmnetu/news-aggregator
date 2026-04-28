import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")

    const { register } = useAuth()
    const navigate = useNavigate()

    const handleRegister = async () => {
        await register(email, password, firstName, lastName)
        navigate("/");
    }

    return (

        <>
            <Container>
                <Row>
                    <h1>News Aggregator</h1>
                </Row>

                <Row>
                    <Form.Group className='mb-3' controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='firstName'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type='text' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='lastName'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type='text' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </Form.Group>
                </Row>

                <Button variant='primary' onClick={handleRegister}>Register</Button>

            </Container>

        </>
    )
}

export default RegisterPage