import BookmarkCard from '../components/BookmarkCard';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

const BookmarksPage = () => {
  const { bookmarks, fetchBookmarks } = useAuth();
  //   !loading && console.log(bookmarks);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const load = async () => {
      await fetchBookmarks();
      setLoading(false);
    };
    load();
  }, [loading]);

  return (
    <>
      <Container>
        <Row className="justify-content-center mt-5 mb-4">
          <Col md={4}>
            <h2 className="text-center">Bookmarks</h2>
          </Col>
        </Row>
        {loading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '50vh' }}
          >
            <Spinner animation="border" variant="primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {!loading && bookmarks.length < 1 && (
          <Row className="justify-content-center" style={{}}>
            <Col md={6} className="">
              <h3 className="text-center">
                You haven't saved any bookmarks yet!
              </h3>
            </Col>
          </Row>
        )}
        <Row>
          {bookmarks.map((b) => {
            return <BookmarkCard bookmark={b} key={b.id} />;
          })}
        </Row>
      </Container>
    </>
  );
};

export default BookmarksPage;
