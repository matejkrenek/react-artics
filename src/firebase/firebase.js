import { auth, provider, db } from "../config"

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

const storeUserInFirestore = (user) => {
    db.collection("users").doc(user.uid).set({
        email: user.email,
        displayName: user.displayName,
    })
}

const updateUserInFirestore = (userId, data) => {
    db.collection("users").doc(userId).update(data)
}
 
export {
    emailSignup,
    emailLogin,
    googleLogin,
    storeUserInFirestore,
    updateUserInFirestore
}