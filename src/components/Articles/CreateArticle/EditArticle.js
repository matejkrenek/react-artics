import { useState, useContext, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useHistory, useParams } from "react-router-dom"
import { db } from "../../../config"
import { UserContext } from "../../../contexts/UserContext";
import Loader from "../../../widgets/Loader/Loader";
import { readDoc, updateDoc } from "../../../firebase/firebase";
import { ArticleContext } from "../../../contexts/ArticleContext";

const EditArticle = () => {
    const { id } = useParams()
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [user, setUser] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if(!user){
            history.push("/register")
        }

        readDoc("articles", id)
        .then((res) => {
            setTitle(res.data().title)
            setBody(res.data().body)
        }).catch(err => console.log(err))
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        updateDoc("articles", id, {title, body})
        .then(res => {
            setIsLoading(false)
            history.goBack()
        })
        .catch((err) => console.log(err))
    }

    return ( 
        <div className="smallContent--container">
            <div className="errorMessage"></div>
            <div className="authHeader">
                <h1>Edit your article</h1>
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
                    {isLoading ? <Loader /> : "Edit an Article"}
                </button>
            </form>
        </div> 
     );
}
 
export default EditArticle;