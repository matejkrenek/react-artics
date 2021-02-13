import { useState } from "react";
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
    const history = useHistory()

    const read = readDoc("articles", id)
    .then(res => {
        setArticle(res.data())
        setIsLoading(false)
    })
    .catch(err => console.log(err))

    const handleRemove = () => {
        const remove = removeDoc("articles", id)
        .then(res => {
            history.push("/")
        })
        .catch(err => console.log(err))
    }

    const handleLike = () => {
        if(user.likedArticles && user.likedArticles.indexOf(article.id) < 0 || user.likedArticles == null){
            const updateUser = updateDoc("users", user.uid, {likedArticles: [...user.likedArticles, article.id]})
            .then(res => console.log(res))
            .catch(err => console.log(err))
        } else{
            console.log(":[")
        }
    }

    return (
        <>
            {isLoading ? <Loader/> : 
                <div className="content--container">
                    <h1>{article.title}</h1>
                    <p>Wrote by {article.author}</p>
                    <span>{isToday(article.created.toDate()) ? "today" : format(new Date(article.created.toDate()), 'd. M. EEEE,  h:mm aa')}</span>
                    <hr />
                    <p>{parser(article.body)}</p>
                    <button onClick={handleLike}>Like</button>
                    {user != null && user.uid == article.authorId ? <button onClick={handleRemove}>Remove</button> : false}
                </div>
            }
        </>
    );
}
 
export default ArticlePreview;