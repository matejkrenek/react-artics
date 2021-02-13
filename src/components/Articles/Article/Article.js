import { BiBookmark, BiComment, BiLike } from "react-icons/bi"
import { Link } from "react-router-dom";

const Article = ({ image, title, author, created, likes, comments, id }) => {

    return ( 
        <Link to={`/article/${id}`} className="singleArticle__link">
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
                                {likes ? likes : 0} <BiLike className="icon--extraSmall"/>
                            </p>

                            <p>
                                {comments ? comments : 0} <BiComment className="icon--extraSmall"/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
 
export default Article;