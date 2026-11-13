import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import { api, useAuth } from './api';

const EMPTY = { media_name: '', media_type: '', rating: 5, review_str: '', tags: '', completed: false };

function ReviewForm({ onSaved }) {
  const [f, setF] = useState(EMPTY);
  const [error, setError] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const tags = f.tags.split(',').map((t) => t.trim()).filter(Boolean);
    api('/reviews', 'POST', { ...f, tags, rating: Number(f.rating) })
      .then(() => { setF(EMPTY); setError(''); onSaved(); })
      .catch((err) => setError(err.message));
  };

  return (
    <Form onSubmit={submit} className="mb-4" style={{ textAlign: 'left', maxWidth: 600, margin: 'auto' }}>
      <Form.Control className="mb-2" placeholder="Name" value={f.media_name} onChange={set('media_name')} required />
      <Form.Control className="mb-2" placeholder="Type (movie, book, game...)" value={f.media_type} onChange={set('media_type')} />
      <Form.Control className="mb-2" type="number" min="0" max="10" step="0.5" value={f.rating} onChange={set('rating')} />
      <Form.Control className="mb-2" as="textarea" rows={3} placeholder="Review" value={f.review_str} onChange={set('review_str')} />
      <Form.Control className="mb-2" placeholder="Tags, comma separated" value={f.tags} onChange={set('tags')} />
      <Form.Check className="mb-2" label="Completed" checked={f.completed} onChange={set('completed')} />
      {error && <Alert variant="danger">{error}</Alert>}
      <Button type="submit">Add review</Button>
    </Form>
  );
}

function Review() {
  const { admin } = useAuth();
  const [data, setData] = useState([]);

  const load = () => api('/reviews').then(setData).catch(console.error);
  useEffect(() => { load(); }, []);

  const remove = (id) => {
    if (window.confirm('Delete this review?')) api(`/reviews/${id}`, 'DELETE').then(load).catch((e) => alert(e.message));
  };

  return (
    <Container>
      <Row>
        <Col>
          <br />
          <h1> My reviews on media!</h1>
          <br />
        </Col>
      </Row>
      {admin && <ReviewForm onSaved={load} />}
      <Row className="d-flex align-items-center justify-content-center g-4" xs={1} sm={2} lg={2} xl={3} xxl={4}>
        {data.map((review) => (
          <Col key={review.review_id}>
            <ReviewCard data={review} onDelete={admin ? () => remove(review.review_id) : null} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default Review;
