import Article from "./Article/Article";
import Loader from "../../widgets/Loader/Loader"
import { useState } from "react";

const Articles = () => {
    const [isLoading, setIsLoading] = useState(true)

    setTimeout(() => {
        setIsLoading(false)
    }, 500)

    const renderArticles = () => {
        return (
            <>
                <Article 
                        image="https://images.pexels.com/photos/1280638/pexels-photo-1280638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        title="Article About LGBT"
                        author="Jaroslav Novak"
                        created="Today at 12:30"
                        likes="12"
                        comments="3"
                />
                <Article 
                    image="https://images.pexels.com/photos/1280638/pexels-photo-1280638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    title="Article About LGBT"
                    author="Jaroslav Novak"
                    created="Today at 12:30"
                    likes="12"
                    comments="3"
                />
                <Article 
                    image="https://images.pexels.com/photos/1280638/pexels-photo-1280638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    title="Article About LGBT"
                    author="Jaroslav Novak"
                    created="Today at 12:30"
                    likes="12"
                    comments="3"
                />
                <Article 
                        image="https://images.pexels.com/photos/1280638/pexels-photo-1280638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        title="Article About LGBT"
                        author="Jaroslav Novak"
                        created="Today at 12:30"
                        likes="12"
                        comments="3"
                />
                <Article 
                        image="https://images.pexels.com/photos/1280638/pexels-photo-1280638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        title="Article About LGBT"
                        author="Jaroslav Novak"
                        created="Today at 12:30"
                        likes="12"
                        comments="3"
                />
                <Article 
                        image="https://images.pexels.com/photos/1280638/pexels-photo-1280638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        title="Article About LGBT"
                        author="Jaroslav Novak"
                        created="Today at 12:30"
                        likes="12"
                        comments="3"
                />
            </>
        )

    }


    return ( 
        <div className="articles">
            {isLoading && <Loader />}
            {isLoading == false && renderArticles()}
        </div>
    );
}
 
export default Articles;