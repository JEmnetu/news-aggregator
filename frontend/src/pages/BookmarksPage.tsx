import BookmarkCard from '../components/BookmarkCard';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const BookmarksPage = () => {
  const { bookmarks, loading, fetchBookmarks } = useAuth();
  !loading && console.log(bookmarks);
  return (
    <>
      <Container>
        <Row className="justify-content-center mt-5 mb-4">
          <Col md={4}>
            <h2 className="text-center">Bookmarks</h2>
          </Col>
        </Row>
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
