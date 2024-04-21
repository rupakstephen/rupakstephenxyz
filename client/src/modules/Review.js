import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';

function Review() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/reviews/all")
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
  }, []);

  let reviewCards = []

  if(data != null){
     reviewCards = data.map((review, idx) => {
      let card_tag = "card_" + idx
      return (
        <Col key={idx}>
          <ReviewCard key={card_tag} data={review} />
        </Col>
      )
    })
  }

 

  return (
    <Container>
      <Row>
        <Col>
          <br />
          <h1> My reviews on media!</h1>
          <br />
        </Col>
      </Row>
      <Row className="d-flex align-items-center justify-content-center g-4" xs={1} sm={2} lg={2} xl={3} xxl={4}>
        {reviewCards}
      </Row>
    </Container> 
  )
};
export default Review; 