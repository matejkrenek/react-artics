import { useState, useEffect, createContext } from "react"
import { db } from "../config"

export const ArticleContext = createContext();

export const ArticleProvider = (props) => {
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
            }
            catch(err){
                console.log(err)
            }
        })
    }, [])

    return (
        <ArticleContext.Provider value={[articles, setArticles]}>
            {props.children}
        </ArticleContext.Provider>
    );
}