import firebase from 'firebase';
import * as admin from 'firebase-admin'
import {environmentConfig} from '../../config'
const dotenv = require('dotenv')

dotenv.config()
admin.initializeApp({credential: admin.credential.cert(environmentConfig["FIREBASE-ADMIN-CONFIG"])})
firebase.initializeApp(environmentConfig['FIREBASE-CONFIG'])

export const LogFirebaseUser = async(email: string, password: string):Promise<firebase.auth.UserCredential|firebase.FirebaseError> => {
    return await firebase.auth().signInWithEmailAndPassword(email, password)
}
