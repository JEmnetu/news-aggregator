import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
  return (
    <>
      <Container
        fluid
        className="bg-primary mx-0 d-flex"
        style={{ height: '10em', color: 'white' }}
      >
        <Row className="justify-content-center align-items-center w-100">
          <Col md={6} className="text-center">
            <p className="my-0">Jacob Habtemariam</p>
            <p className="my-0">github.com/JEmnetu</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
