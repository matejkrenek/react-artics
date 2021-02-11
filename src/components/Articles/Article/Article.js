import { BiBookmark, BiComment, BiLike } from "react-icons/bi"

const Article = ({ image, title, author, created, likes, comments }) => {
    return ( 
        <a href="" className="singleArticle__link">
            <div className="singleArticle flex-box">
                <div className="singleArticle__image">
                    <img src={image} alt=""/>
                </div>
                <div className="singleArticle__content flex-box ai-start jc-space">
                    <div className="singleArticle__meta">
                        <h2>{title}</h2>
                        <p>{author}</p>
                        <small>{created}</small>
                    </div>
                    <div className="singleArticle__cta flex-box jc-end ai-end flex-dir-col">
                        <div className="flex-box ai-center singleArticle__stats">
                            <p>
                                {likes} <BiLike className="icon--extraSmall"/>
                            </p>

                            <p>
                                {comments} <BiComment className="icon--extraSmall"/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}
 
export default Article;