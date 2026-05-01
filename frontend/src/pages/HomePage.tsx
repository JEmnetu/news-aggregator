import { useState, useEffect } from 'react';
import { getNews } from '../services/api';
import { NewsResponse } from '../types/NewsResponse';
import ArticleCard from '../components/ArticleCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Search } from 'react-bootstrap-icons';
import Spinner from 'react-bootstrap/Spinner';

const HomePage = () => {
  const [news, setNews] = useState<NewsResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories: string[] = [
    'All',
    'General',
    'Politics',
    'Sports',
    'Tech',
    'Business',
  ];

  const getNewsArticles = async () => {
    const response = await getNews('', '', 1, 20);
    setNews(response);
  };

  const handleSelectCategory = async (cat: string) => {
    setSearchTerm('');
    setCategory(cat);
    const response =
      cat === 'all'
        ? await getNews('', '', 1, 20)
        : await getNews(cat, '', 1, 20);
    setNews(response);
  };

  const handleFilterSearch = async (search: string) => {
    const response = await getNews('', search, 1, 20);
    setNews(response);
  };

  useEffect(() => {
    const load = async () => {
      await getNewsArticles();
      setLoading(false);
    };
    load();
  }, []);

  return (
    <>
      <Container className="mt-3 mt-md-5">
        {!loading && (
          <>
            <Row className="mb-4 d-none d-md-flex align-items-center">
              <Col className="d-flex gap-2 overflow-auto">
                {categories.map((c, index) => {
                  return (
                    <Button
                      key={index}
                      size="sm"
                      variant={
                        category === c.toLowerCase()
                          ? 'primary'
                          : 'outline-primary'
                      }
                      onClick={() => handleSelectCategory(c.toLowerCase())}
                    >
                      {c}
                    </Button>
                  );
                })}
              </Col>
              <Col md="auto">
                <InputGroup className="">
                  <InputGroup.Text
                    id="search-icon"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleFilterSearch(searchTerm)}
                  >
                    <Search />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && handleFilterSearch(searchTerm)
                    }
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row className="d-md-none">
              <div className="d-flex gap-2 overflow-auto py-3">
                {categories.map((c, index) => {
                  return (
                    <Button
                      key={index}
                      variant={
                        category === c.toLowerCase()
                          ? 'primary'
                          : 'outline-primary'
                      }
                      onClick={() => handleSelectCategory(c.toLowerCase())}
                    >
                      {c}
                    </Button>
                  );
                })}
              </div>
            </Row>
            <Row className="mb-4 d-md-none">
              <InputGroup className="">
                <InputGroup.Text
                  id="search-icon"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleFilterSearch(searchTerm)}
                >
                  <Search />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && handleFilterSearch(searchTerm)
                  }
                />
              </InputGroup>
            </Row>

            <Row className="">
              {news &&
                news.data.map((articleData) => {
                  return (
                    <ArticleCard article={articleData} key={articleData.id} />
                  );
                })}

              {!news && <h3>No articles found!</h3>}
            </Row>
          </>
        )}
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
      </Container>
    </>
  );
};

export default HomePage;
