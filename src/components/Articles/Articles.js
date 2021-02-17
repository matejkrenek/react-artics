import Article from "./Article/Article";
import { format, isToday } from "date-fns"
import Loader from "../../widgets/Loader/Loader"
import { useState, useContext, useEffect } from "react";
import { ArticleContext } from "../../contexts/ArticleContext"

const Articles =  () => {
    const [articles, setArticles] = useContext(ArticleContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(articles.length){
            setIsLoading(false)
        }
    }, [articles])
    
    
    return ( 
        <div className="articles">
            <h1>Articles</h1>
            {isLoading && <Loader />}
            {isLoading == false &&
                articles.map(article => (
                    <Article key={article.id} id={article.id} image={article.image} title={article.title} author={article.author} created={isToday(article.created.toDate()) ? "today" : format(new Date(article.created.toDate()), 'd. M. EEEE,  h:mm aa')} likes={article.likes} />
                ))
            }
        </div>
    );
}
 
export default Articles;
