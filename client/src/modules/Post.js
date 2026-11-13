import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { api, useAuth } from './api';

// Shared by the post page and the editor preview.
export const renderMarkdown = (md) => ({ __html: DOMPurify.sanitize(marked.parse(md)) });

export default function Post() {
  const { slug } = useParams();
  const { admin } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => { api(`/posts/${slug}`).then(setPost).catch((e) => setError(e.message)); }, [slug]);

  const remove = () => {
    if (window.confirm('Delete this post?'))
      api(`/posts/${slug}`, 'DELETE').then(() => navigate('/blog')).catch((e) => setError(e.message));
  };

  if (error) return <Container><br /><p>{error}</p></Container>;
  if (!post) return null;

  return (
    <Container style={{ textAlign: 'left' }}>
      <br />
      <h1>{post.title}</h1>
      <p className="text-muted">{new Date(post.created).toLocaleDateString()}</p>
      {admin && (
        <p>
          <Button as={Link} to={`/blog/${slug}/edit`} size="sm">Edit</Button>{' '}
          <Button variant="danger" size="sm" onClick={remove}>Delete</Button>
        </p>
      )}
      <div dangerouslySetInnerHTML={renderMarkdown(post.body)} />
    </Container>
  );
}
