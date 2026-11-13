import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { api, useAuth } from './api';
import { renderMarkdown } from './Post';

// Used for both /blog/new and /blog/:slug/edit. Markdown on the left, live preview on the right.
export default function Editor() {
  const { slug } = useParams();
  const { admin } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (slug) api(`/posts/${slug}`).then((p) => { setTitle(p.title); setBody(p.body); })
      .catch((e) => setError(e.message));
  }, [slug]);

  if (!admin) return <Navigate to="/login" replace />;

  const save = () => {
    const req = slug ? api(`/posts/${slug}`, 'PUT', { title, body }) : api('/posts', 'POST', { title, body });
    req.then((r) => navigate(`/blog/${r.slug}`)).catch((e) => setError(e.message));
  };

  return (
    <Container fluid style={{ textAlign: 'left' }}>
      <br />
      <Form.Control size="lg" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col md={6}>
          <Form.Control as="textarea" rows={25} placeholder="Write markdown here..."
            style={{ fontFamily: 'monospace' }} value={body} onChange={(e) => setBody(e.target.value)} />
        </Col>
        <Col md={6}>
          <div className="border rounded p-3" style={{ minHeight: '100%' }}
            dangerouslySetInnerHTML={renderMarkdown(body)} />
        </Col>
      </Row>
      <br />
      <Button onClick={save} disabled={!title || !body}>Save</Button>
    </Container>
  );
}
