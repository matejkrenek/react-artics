import { auth, provider, db } from "../config"

const emailSignup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
}

const emailLogin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
} 

const googleLogin = () => {
    auth.signInWithRedirect(provider)
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

const updateDoc = (collectionName, docId, data) => {
    db.collection(collectionName).doc(docId).update(data)
}

const readDoc = (collectionName, docId) => {
    return db.collection(collectionName).doc(docId).get()
}

const removeDoc = (collectionName, docId) => {
    return db.collection(collectionName).doc(docId).delete()
}
 
export {
    emailSignup,
    emailLogin,
    googleLogin,
    storeUserInFirestore,
    updateDoc,
    readDoc,
    removeDoc
}