import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';


const flexboxCenter = {
  "display": "flex",
  "justify-content": "center"
}

function Review() { 
    return ( 
       <Container>
        <Row>
          <Col>
            <br />
            <div>
              <h1> My reviews on media!</h1>
            </div>            
          </Col>
        </Row>
      </Container> 
    )
};
export default Review; 