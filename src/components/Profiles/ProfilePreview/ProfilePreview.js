import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { format, isToday } from "date-fns"
import { UserContext } from "../../../contexts/UserContext"
import { readDoc } from "../../../firebase/firebase"
import Loader from "../../../widgets/Loader/Loader"
import Article from "../../Articles/Article/Article"

const ProfilePreview = () => {
    const { uid } = useParams()
    const [thisUser, setThisUser] = useState()
    const [user, setUser] = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [userArticles, setUserArticles] = useState()
    const [userLikedArticles, setUserLikedArticles] = useState()

    useEffect(() => {
        if(uid == undefined && !thisUser){
            readDoc("users", user.uid)
            .then(res => {
                setThisUser(res.data())
                setIsLoading(false)
            }).catch(err => {
                console.log(err)
                setIsLoading(false)
            })
        } else if(!thisUser){
            readDoc("users", uid)
            .then(res => {
                setThisUser(res.data())
                setIsLoading(false)
            }).catch(err => {
                console.log(err)
                setIsLoading(false)
            })
        }

        if(thisUser){
            if(thisUser.articles){
                thisUser.articles.forEach(article => {
                    readDoc("articles", article)
                    .then(res => {
                        setUserArticles(prevState => {
                            if(prevState){
                                return [...prevState, res.data()]
                            } else{
                                return [res.data()]
                            }
                        })
                    }).catch(err => console.log(err))
                })
            } 
            if(thisUser.likedArticles){
                thisUser.likedArticles.forEach(likedArticle => {
                    readDoc("articles", likedArticle)
                    .then(res => {
                        setUserLikedArticles(prevState => {
                            if(prevState){
                                return [...prevState, res.data()]
                            } else{
                                return [res.data()]
                            }
                        })
                    }).catch(err => console.log(err))
                })
            }
            else{
                setUserArticles(null)
                setUserLikedArticles(null)
            }

        }
    }, [thisUser])
    
    return ( 
        <>
            {isLoading ? <Loader /> : 
                <div className="content--container">
                    <div className="flex-box ai-center">
                        <div className="userImage">
                            <img src={thisUser.photoURL} alt=""/>
                        </div>
                        <h1>{thisUser.displayName ? thisUser.displayName : thisUser.email}</h1>
                    </div>
                    <hr />
                    <div>
                        <div className="articles">
                            <h1>Created Articles by {thisUser.displayName ? thisUser.displayName : thisUser.email}</h1>
                            {userArticles === undefined ? <Loader /> : userArticles === null ? "Nothing" : 
                            userArticles.map(article => (
                                <Article key={article.id} id={article.id} image={article.image} title={article.title} author={article.author} created={isToday(article.created.toDate()) ? "today" : format(new Date(article.created.toDate()), 'd. M. EEEE,  h:mm aa')} likes={article.likes} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="articles">
                            <h1>Articles that {thisUser.displayName ? thisUser.displayName : thisUser.email} likes</h1>
                            {userLikedArticles === undefined ? <Loader /> : userLikedArticles === null ? "Nothing" : 
                            userLikedArticles.map(article => (
                                <Article key={article.id} id={article.id} image={article.image} title={article.title} author={article.author} created={isToday(article.created.toDate()) ? "today" : format(new Date(article.created.toDate()), 'd. M. EEEE,  h:mm aa')} likes={article.likes} />
                            ))}
                        </div>
                    </div>
                </div>
            }  
        </>
    );
}
 
export default ProfilePreview;