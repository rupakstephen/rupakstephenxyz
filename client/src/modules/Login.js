import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { api, useAuth } from './api';

export default function Login() {
  const { setAdmin } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    api('/login', 'POST', { password })
      .then(() => { setAdmin(true); navigate('/'); })
      .catch((err) => setError(err.message));
  };

  return (
    <Container style={{ maxWidth: 400 }}>
      <br />
      <h1>Login</h1>
      <Form onSubmit={submit}>
        <Form.Control type="password" placeholder="Password" autoFocus
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        {error && <Alert variant="danger">{error}</Alert>}
        <Button type="submit">Log in</Button>
      </Form>
    </Container>
  );
}
