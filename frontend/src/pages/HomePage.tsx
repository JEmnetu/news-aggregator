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
  const [page, setPage] = useState<number>(1);

  const pageSize = 10;

  const categories: string[] = [
    'All',
    'General',
    'Politics',
    'Sports',
    'Tech',
    'Business',
  ];

  const getNewsArticles = async (
    currentPage: number = 1,
    currentCategory: string = category,
  ) => {
    const response =
      currentCategory === 'all'
        ? await getNews('', '', currentPage, pageSize)
        : await getNews(currentCategory, '', currentPage, pageSize);
    setNews(response);
    window.scrollTo(0, 0);
  };

  const handleSelectCategory = async (cat: string) => {
    setSearchTerm('');
    setCategory(cat);
    setPage(1);
    const response =
      cat === 'all'
        ? await getNews('', '', 1, pageSize)
        : await getNews(cat, '', 1, pageSize);
    setNews(response);
  };

  const handleFilterSearch = async (search: string) => {
    setCategory('all');
    setPage(1);
    const response = await getNews('', search, 1, pageSize);
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
                      className="border-2"
                      variant={
                        category === c.toLowerCase()
                          ? 'outline-primary'
                          : 'primary'
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
                      className="button-2"
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
              {news?.data.length !== 0 &&
                news?.data.map((articleData) => {
                  return (
                    <ArticleCard article={articleData} key={articleData.id} />
                  );
                })}

              {news?.data.length === 0 && (
                <>
                  {' '}
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: '50vh' }}
                  >
                    {' '}
                    <h3>No articles found!</h3>{' '}
                  </div>
                </>
              )}
            </Row>
            {news && (
              <Row className="justify-content-center my-4">
                <Col xs="auto">
                  <Button
                    variant="primary"
                    disabled={page === 1}
                    onClick={() => {
                      setPage(page - 1);
                      getNewsArticles(page - 1);
                    }}
                  >
                    Previous
                  </Button>
                </Col>
                <Col xs="auto" className="d-flex align-items-center text-white">
                  Page {page} of {Math.ceil(news.total / pageSize)}
                </Col>
                <Col xs="auto">
                  <Button
                    variant="primary"
                    disabled={page >= Math.ceil(news.total / pageSize)}
                    onClick={() => {
                      setPage(page + 1);
                      getNewsArticles(page + 1);
                    }}
                  >
                    Next
                  </Button>
                </Col>
              </Row>
            )}
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
