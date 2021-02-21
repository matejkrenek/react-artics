import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { removeDoc, readDoc, updateDoc, readCollection } from "../../../firebase/firebase";
import { format, isToday } from "date-fns"
import { useHistory } from "react-router-dom"
import parser from "html-react-parser"
import Loader from "../../../widgets/Loader/Loader";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { BiChevronLeft, BiLike, BiTrash, BiEditAlt } from "react-icons/bi"

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
        }).then((res) => {
            readCollection("users")
            .then((users) => {
                users.forEach(user => {
                    if(user.data().likedArticles.indexOf(article.id) >= 0){
                        updateDoc("users", user.data().uid, {likedArticles: user.data().likedArticles.filter(articleId => articleId != article.id)})
                    }
                })
            }).catch(err => console.log(err))
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
                        <Link onClick={history.goBack} className="backBtn flex-box ai-center"><BiChevronLeft/> Go back</Link>
                        <h1>{article.title}</h1>
                        <p>Wrote by {article.author}</p>
                        <span>{isToday(article.created.toDate()) ? "today" : format(new Date(article.created.toDate()), 'd. M. EEEE,  h:mm aa')}</span>
                        <hr />
                        <p className="ArticleBody">{parser(article.body)}</p>
                        <div className="btn__container">
                            <button className={isLiked ? "likeBtn filled" : "likeBtn outlined"} onClick={handleLike}><BiLike /> like</button>
                            {user != null && user.uid == article.authorId ? <button className="removeBtn" onClick={handleRemove}><BiTrash /> Remove</button> : false}
                            {user != null && user.uid == article.authorId ? <Link className="editBtn" to={`/article/edit/${id}`}><BiEditAlt /> Edit</Link> : false}
                        </div>
                    </div>
                </>
            }
        </>
    );
}
 
export default ArticlePreview;