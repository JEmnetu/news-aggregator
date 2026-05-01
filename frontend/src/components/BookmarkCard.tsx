import { useState } from 'react';
import { Bookmark as BookmarkType } from '../types/Bookmark';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BookmarkFill } from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';
import { deleteBookmark } from '../services/api';
import placeholder from '../assets/placeholder.png';

interface BookmarkCardProps {
  bookmark: BookmarkType;
}

const BookmarkCard = ({ bookmark }: BookmarkCardProps) => {
  const [bookmarkHover, setBookmarkHover] = useState(false);
  const { fetchBookmarks } = useAuth();

  const handleDeleteBookmark = async (id: number) => {
    await deleteBookmark(id);
    await fetchBookmarks();
  };

  return (
    <>
      <Col sm={12} md={4} className="mb-4">
        <Card className="h-100 d-flex flex-column">
          <Card.Img
            variant="top"
            src={bookmark.image_url ? bookmark.image_url : placeholder}
            onError={(e) => (e.currentTarget.src = placeholder)}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title className="mb-3">{bookmark.title}</Card.Title>

            <Row className="d-flex justify-content-between align-items-center mt-auto">
              <Col xs="auto">
                <Button
                  variant="primary"
                  href={bookmark.article_url}
                  className="mb-1"
                >
                  Read More
                </Button>
              </Col>
              <Col xs="auto">
                <BookmarkFill
                  size={24}
                  className={bookmarkHover ? 'bookmark-hover' : ''}
                  style={{ color: '#0d6efd' }}
                  onMouseEnter={() => setBookmarkHover(true)}
                  onMouseLeave={() => setBookmarkHover(false)}
                  onClick={() => handleDeleteBookmark(bookmark.id)}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default BookmarkCard;
