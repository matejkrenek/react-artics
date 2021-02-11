import firebase from "firebase"
import config from "../config"

firebase.initializeApp(config)

const stateChange = () => {
    firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
    });
}
 
export default stateChange;