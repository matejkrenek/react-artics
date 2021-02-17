import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { removeDoc, readDoc, updateDoc } from "../../../firebase/firebase";
import { format, isToday } from "date-fns"
import { useHistory } from "react-router-dom"
import parser from "html-react-parser"
import Loader from "../../../widgets/Loader/Loader";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const ArticlePreview = () => {
    const { id } = useParams();
    const [user, setUser] = useContext(UserContext)
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false)
    const history = useHistory()


    useEffect(() => {
        readDoc("articles", id)
        .then(article => {
            setArticle(article.data())
            setIsLoading(false)
            if(user != null){
                readDoc("users", user.uid)
                .then(user => {
                    if(user.data().likedArticles.indexOf(article.id) >= 0 && user.data().likedArticles != null){
                        setIsLiked(true)
                    }
                }).catch(err => {
                    setIsLiked(false)
                })
            }
        })
        .catch(err => console.log(err))
        
    }, [])


    const handleRemove = () => {
        const remove = removeDoc("articles", id)
        .then(res => {
            readDoc("users", user.uid)
            .then(res => {
                updateDoc("users", user.uid, {articles: res.data().articles.filter(article => article != id)})
                history.push("/")
            }).catch(err => {
                console.log(err)
            })


        })
        .catch(err => console.log(err))
    }

    const handleLike = () => {
        if(user != null){
            readDoc("users", user.uid )
            .then((res) => {
                const prevItems = res.data().likedArticles && res.data().likedArticles
                const prevLikes = article.likes ? article.likes : 0
    
                if(res.data().likedArticles.indexOf(article.id) >= 0 && res.data().likedArticles != null){
                    updateDoc("users", user.uid, {likedArticles: prevItems.filter(id => id != article.id)})
                    updateDoc("articles", article.id, {likes: prevLikes - 1})
                    setIsLiked(false)
                } else{
                    updateDoc("users", user.uid, {likedArticles: [...prevItems, article.id]})
                    updateDoc("articles", article.id, {likes: prevLikes + 1})
                    setIsLiked(true)
                }
            }).catch(err => {
                console.log(err)
            })
        } else{
            history.push("/register")
        }
        
    }

    return (
        <>
            {isLoading ? <Loader/> : 
                <>
                    <div className="content--container">
                        <h1>{article.title}</h1>
                        <p>Wrote by {article.author}</p>
                        <span>{isToday(article.created.toDate()) ? "today" : format(new Date(article.created.toDate()), 'd. M. EEEE,  h:mm aa')}</span>
                        <hr />
                        <p>{parser(article.body)}</p>
                        <button onClick={handleLike}>{isLiked ? "dislike" : "like"}</button>
                        {user != null && user.uid == article.authorId ? <button onClick={handleRemove}>Remove</button> : false}
                    </div>
                </>
            }
        </>
    );
}
 
export default ArticlePreview;