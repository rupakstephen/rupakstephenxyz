import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';


const flexboxCenter = {
  "display": "flex",
  "justify-content": "center"
}

function Home() { 
    return ( 
       <Container>
        <Row>
          <Col>
            <br />
            <div>
              <h1> Hi, I'm Rupak!</h1>
              <p>
                I am a developer that just wanted to practice a bunch of different types of skills such as...
              </p>
              <ListGroup horizontal style={flexboxCenter}>
                  <ListGroup.Item>Full-Stack Development</ListGroup.Item>
                  <ListGroup.Item>UI/UX Design</ListGroup.Item>
                  <ListGroup.Item>Review Writing</ListGroup.Item>
                  <ListGroup.Item>Databse Stuff</ListGroup.Item>
              </ListGroup>
            </div>
            <br />
            <div>
              <h3>About this website...</h3>
              <p>
                This website is primarily a way for me to show my skills in multiple different ways, but it's also just a kind of way for me to have fun with designing full architechure 
                applications. I wanted this to be a way for me to practice other skills such as deployment on mutliple levels and how to set up hostnames, domain names, and other wacky 
                and things that are apart of the great concept that is web development and information technology!
              </p>
              <p>
                Some of my interests include partaking in video games, playing volleyball (I really enjoy beach and grass vball), and messing around with new web development technologies
                and not being good at using them.
              </p>
              <p>
                Recently, I have realized that I consume a lot of different forms of media (books, movies, manga, television, etc.) and wanted to give myself the opportunity to do
                multiple things. I wanted to brush up on my writing skills, figure out what kind of opinions I have about certain things, and there no better way to do that then pair
                it up with practicing my development and deployment skills! So thus, this site has been created.
              </p>
            </div>            
          </Col>
        </Row>
      </Container> 
    )
};
export default Home; 