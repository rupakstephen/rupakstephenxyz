import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

const leftJustify = {
  "text-align": "left"
}

function About() { 
    return ( 
      <Container>
      <Row>
        <Col>
          <br />
          <h1> A bit about me...</h1>
          <br />
          <Stack style={leftJustify}>
            <div>
              <p>
                I am a passionate and eager Software Engineer with a dual Computer Science and Information Technology degree. I am a
                hard-working, sociable, teammate who believes in learning at every chance possible!
              </p>
            </div>
            <div>
              <h4>Work Experience</h4>
              <Stack gap={2}>
                <div>
                  <h6>Assistant Staff, <i>MIT Lincoln Laboratory</i></h6>
                  <p>
                    Lorem ipsum dolor.
                  </p>
                </div>
                <div>
                  <h6>Corporate Business Intern, <i>Johnson and Johnson</i></h6>
                  <p>
                    Lorem ipsum dolor.
                  </p>
                </div>
              </Stack>
            </div>
            <div>
              <h4>Education</h4>
              <Stack gap={2}>
                <div>
                  <h6>B.S., Computer Science/Information Technology, <i>Rensselaer Polytechnic Institute</i></h6>
                  <ul>
                    <li>GPA: 3.62</li>
                    <li>Dean's List: Fall '19, Spring '20, Spring '21, Spring '22</li>
                  </ul>
                </div>
              </Stack>
              <h4>Skills</h4>
              <Stack gap={2}>
                <div>
                  <h6>Programming Langages</h6>
                  <ul>
                    <li>Python (Proficient)</li>
                    <li>C++ (Proficient)</li>
                    <li>C (Working Knowledge)</li>
                    <li>SQL (Working Knowledge)</li>
                  </ul>
                  <h6>Technologies/Frameworks</h6>
                  <ul>
                    <li>React</li>
                    <li>Angular</li>
                    <li>Node</li>
                    <li>Express</li>
                    <li>MongoDB</li>
                    <li>PostgreSQL</li>
                  </ul>
                </div>
              </Stack>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>  
    ); 
} 
export default About; 