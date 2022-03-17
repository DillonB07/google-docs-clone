import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: 'dillonb07-studio.firebaseapp.com',
  projectId: 'dillonb07-studio',
  storageBucket: 'dillonb07-studio.appspot.com',
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()

export { db }
