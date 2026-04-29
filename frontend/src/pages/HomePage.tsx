import { useState, useEffect } from "react"
import { getNews } from "../services/api"
import { NewsResponse } from "../types/NewsResponse"

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
        <h1>Home Page</h1>
        {!loading && console.log(news)}
    </>
}



export default HomePage