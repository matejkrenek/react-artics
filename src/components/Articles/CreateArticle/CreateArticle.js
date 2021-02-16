import { useState, useContext, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useHistory } from "react-router-dom"
import { db } from "../../../config"
import { UserContext } from "../../../contexts/UserContext";
import Loader from "../../../widgets/Loader/Loader";
import { readDoc, updateDoc } from "../../../firebase/firebase";
import { ArticleContext } from "../../../contexts/ArticleContext";

const CreateArticle = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [user, setUser] = useContext(UserContext);
    const [articles, setArticles] = useContext(ArticleContext);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        db.collection("articles").add({
            title: title,
            author: user.displayName ? user.displayName : user.email,
            authorId: user.uid,
            body: body,
            created: new Date(),
        }).then(res => {
            db.collection("articles").doc(res.id).update({
                id: res.id
            })

            readDoc("articles", res.id)
            .then(articleData => {
                const newArray = [...articles, articleData.data()]
                updateDoc("users", user.uid, {articles: newArray.map(article => article.id)})
                setIsLoading(false)
                history.push("/")
            })
            .catch(err => console.log(err))



        })
        .catch(err => {
            setIsLoading(false)
            console.log(err.message)
        })

    }

    useEffect(() => {
        if(!user){
            history.push("/register")
        }
    }, [user])

    return ( 
        <div className="smallContent--container">
            <div className="errorMessage"></div>
            <div className="authHeader">
                <h1>Create your own article</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputField">
                    <label htmlFor="title">Article Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="inputField">
                    <label htmlFor="body">Description</label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={body}
                        onChange={(e, editor) => {
                            const data = editor.getData()
                            setBody(data)
                        }}
                    />
                </div>
                <button type="submit" className="btn blue">
                    {isLoading ? <Loader /> : "Create an Article"}
                </button>
            </form>
        </div> 
     );
}
 
export default CreateArticle;