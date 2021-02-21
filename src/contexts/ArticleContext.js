import { useState, useEffect, createContext } from "react"
import { db } from "../config"

export const ArticleContext = createContext();

export const ArticleProvider = (props) => {
    const [articles, setArticles] = useState()

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
    
                if(arr.length > 0){
                    setArticles(arr)
                } else{
                    setArticles(null)
                }

            }
            catch(err){
                console.log(err)
                setArticles(null)
            }
        })
    }, [])

    return (
        <ArticleContext.Provider value={[articles, setArticles]}>
            {props.children}
        </ArticleContext.Provider>
    );
}