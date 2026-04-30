import { useState } from "react"
import { Article } from "../types/Article"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Bookmark, BookmarkFill } from "react-bootstrap-icons";
import { createBookmark } from "../services/api";
import { MessageResponse } from "../types/MessageResponse";
import { useAuth } from "../context/AuthContext"

interface ArticleCardProps {
    article: Article
}

const ArticleCard = ({ article }: ArticleCardProps) => {

    const { bookmarks, fetchBookmarks } = useAuth()

    const [bookmarkHover, setBookmarkHover] = useState(false);
    const isBookmarked = bookmarks.some((b) => b.article_url === article.url)




    const saveBookmark = async () => {
        const response = await createBookmark(article.url, article.title, article.image_url)
        await fetchBookmarks()
        console.log(response)

    }

    return (
        <>
            <Col sm={12} md={6} className="mb-4">
                <Card className="h-100 d-flex flex-column" >
                    <Card.Img variant="top" src={article.image_url} style={{ height: '200px', objectFit: 'cover' }} />
                    <Card.Body>
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Subtitle>{(new Date(article.published_at).toDateString().slice(4))}</Card.Subtitle>
                        <Card.Text>
                            {article.description}
                        </Card.Text>

                        <Row className="d-flex justify-content-between align-items-center mt-auto">
                            <Col xs="auto">
                                <Button variant="primary" href={article.url} target="_blank" rel="noopener noreferrer" className="mb-1">Read More</Button></Col>
                            <Col xs="auto">
                                {isBookmarked &&
                                    <BookmarkFill size={24} className={bookmarkHover ? 'bookmark-hover' : ''}
                                        style={{ color: '#0d6efd' }}
                                        onMouseEnter={() => setBookmarkHover(true)}
                                        onMouseLeave={() => setBookmarkHover(false)}
                                    // onClick={() => setIsBookmarked(false)}
                                    />
                                }
                                {!isBookmarked &&
                                    <Bookmark size={24} className={bookmarkHover ? 'bookmark-hover' : ''}
                                        style={{ color: '#0d6efd' }}
                                        onMouseEnter={() => setBookmarkHover(true)}
                                        onMouseLeave={() => setBookmarkHover(false)}
                                        onClick={() => saveBookmark()}
                                    />}
                            </Col>
                        </Row>


                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

export default ArticleCard