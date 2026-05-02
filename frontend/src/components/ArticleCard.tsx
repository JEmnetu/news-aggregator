import { useState } from 'react';
import { Article } from '../types/Article';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Bookmark, BookmarkFill } from 'react-bootstrap-icons';
import { createBookmark } from '../services/api';
import { MessageResponse } from '../types/MessageResponse';
import { useAuth } from '../context/AuthContext';
import placeholder from '../assets/placeholder.png';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const { bookmarks, fetchBookmarks } = useAuth();

  const [bookmarkHover, setBookmarkHover] = useState(false);
  const isBookmarked = bookmarks.some((b) => b.article_url === article.url);

  const saveBookmark = async () => {
    const response = await createBookmark(
      article.url,
      article.title,
      article.description,
      article.published_at,
      article.image_url,
    );
    await fetchBookmarks();
  };

  return (
    <>
      <Col sm={12} md={6} lg={4} className="mb-5">
        <Card className="h-100 d-flex flex-column">
          <Card.Img
            variant="top"
            src={article.image_url ? article.image_url : placeholder}
            onError={(e) => (e.currentTarget.src = placeholder)}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {article.title}
            </Card.Title>
            <Card.Subtitle>
              {new Date(article.published_at).toDateString().slice(4)}
            </Card.Subtitle>
            <Card.Text
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {article.description}
            </Card.Text>

            <Row className="d-flex justify-content-between align-items-center mt-3">
              <Col xs="auto">
                <Button
                  variant="primary"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-1"
                >
                  Read More
                </Button>
              </Col>
              <Col xs="auto">
                {isBookmarked && (
                  <BookmarkFill
                    size={24}
                    className={bookmarkHover ? 'bookmark-hover' : ''}
                    style={{ color: '#0d6efd' }}
                    onMouseEnter={() => setBookmarkHover(true)}
                    onMouseLeave={() => setBookmarkHover(false)}
                    // onClick={() => setIsBookmarked(false)}
                  />
                )}
                {!isBookmarked && (
                  <Bookmark
                    size={24}
                    className={bookmarkHover ? 'bookmark-hover' : ''}
                    style={{ color: '#0d6efd' }}
                    onMouseEnter={() => setBookmarkHover(true)}
                    onMouseLeave={() => setBookmarkHover(false)}
                    onClick={() => saveBookmark()}
                  />
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default ArticleCard;
