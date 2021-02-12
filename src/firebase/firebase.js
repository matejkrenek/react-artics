import { auth } from "../config"

const emailSignup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
}

const emailLogin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
}

export {
    emailSignup,
    emailLogin
}