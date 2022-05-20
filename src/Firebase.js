import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
var firebaseConfig = {
  apiKey: "AIzaSyDn-wQ-O198BvCgxiIxIAhUJx5Sj2j3RC0",
  authDomain: "abtaran-5ec61.firebaseapp.com",
  projectId: "abtaran-5ec61",
  storageBucket: "abtaran-5ec61.appspot.com",
  messagingSenderId: "901918238374",
  appId: "1:901918238374:web:67d5ab3b06fa6a29f1b667"
};
if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig)
console.log("initializedApp")
}
const auth=firebase.auth()
const db=firebase.firestore()
const storage =firebase.storage()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
export {auth,db,storage,serverTimestamp}