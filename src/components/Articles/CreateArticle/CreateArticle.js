import { useState } from 'react';

const CreateArticle = () => {
    return ( 
        <div className="smallContent--container">
            <div className="errorMessage"></div>
            <div className="authHeader">
                <h1>Create your own article</h1>
            </div>
            <form>
                <div className="inputField">
                    <label htmlFor="title">Article Title</label>
                    <input
                        type="text"
                    />
                </div>
                <div className="inputField">
                    <label htmlFor="body">Article Body</label>
                
                </div>
                <button type="submit" className="btn blue">
                    Create an Article
                </button>
            </form>
        </div> 
     );
}
 
export default CreateArticle;