import Article from "./Article/Article";
import { format, isToday, is } from "date-fns"
import Loader from "../../widgets/Loader/Loader"
import { useState, useEffect } from "react";
import { db } from "../../config"

const Articles = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [articles, setArticles] = useState([])

    useEffect(() => {
        db.collection("articles").onSnapshot((items) => {
            try {
                let arr = []
                items.forEach(item => {
                    arr.push(item.data())
                })
    
                arr.sort((a, b) => {
                    return b.created.toDate() - a.created.toDate()
                })
    
                setArticles(arr)
                setIsLoading(false)
            }
            catch(err){
                console.log(err)
            }
        })
    }, []) 


    
    return ( 
        <div className="articles">
            {isLoading && <Loader />}
            {isLoading == false && 
                articles.map(article => (
                    <Article key={article.created} image={article.image} title={article.title} author={article.author} created={isToday(article.created.toDate()) ? "today" : format(new Date(article.created.toDate()), 'd. M. EEEE,  h:mm aa')} likes={article.likes} comments={article.comments} />
                ))
            }
        </div>
    );
}
 
export default Articles;