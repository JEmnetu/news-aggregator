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
      <Container className="mt-5">
        {!loading && (
          <>
            <Row className="text-center">
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
              </div>
            </Row>
            <Row className="">
              {news?.data.map((articleData) => {
                return (
                  <ArticleCard article={articleData} key={articleData.id} />
                );
              })}
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default HomePage;
