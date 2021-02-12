import { auth, provider } from "../config"

const emailSignup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
}

const emailLogin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
} 

const googleLogin = () => {
    auth.signInWithPopup(provider)
    .then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

export {
    emailSignup,
    emailLogin,
    googleLogin
}