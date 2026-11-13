import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { api, useAuth } from './api';

export default function Blog() {
  const { admin } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => { api('/posts').then(setPosts).catch(console.error); }, []);

  return (
    <Container style={{ textAlign: 'left' }}>
      <br />
      <h1>Blog {admin && <Button as={Link} to="/blog/new" size="sm">New post</Button>}</h1>
      <ListGroup variant="flush">
        {posts.map((p) => (
          <ListGroup.Item key={p.slug} action as={Link} to={`/blog/${p.slug}`}>
            <strong>{p.title}</strong>{' '}
            <small className="text-muted">{new Date(p.created).toLocaleDateString()}</small>
          </ListGroup.Item>
        ))}
        {posts.length === 0 && <p className="text-muted">No posts yet.</p>}
      </ListGroup>
    </Container>
  );
}
