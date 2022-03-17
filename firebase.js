import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: 'perfect-transit-344619.firebaseapp.com',
  projectId: 'perfect-transit-344619',
  storageBucket: 'perfect-transit-344619.appspot.com',
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()

export { db }
