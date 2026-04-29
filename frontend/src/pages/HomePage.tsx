import { useState, useEffect } from "react"
import { getNews } from "../services/api"
import { NewsResponse } from "../types/NewsResponse"
import ArticleCard from "../components/ArticleCard"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

const HomePage = () => {

    const [news, setNews] = useState<NewsResponse>()
    const [loading, setLoading] = useState<boolean>(true)

    const getNewsArticles = async () => {

        const response = await getNews();
        setNews(response)
    }

    useEffect(() => {
        const load = async () => {
            await getNewsArticles()
            setLoading(false)
        }
        load()
    }, [])

    return <>
        <Container className="mt-5">
            {!loading && <>
                <Row className="text-center">
                    <h4> Article Cards</h4>
                </Row>
                <Row className="">
                    {news?.data.map((articleData)=> {
                        return(<ArticleCard article = {articleData} key={articleData.id}/>)
                    })}
                </Row>
            </>}
        </Container>
    </>
}



export default HomePage