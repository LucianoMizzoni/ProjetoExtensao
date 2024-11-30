import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
export const firebaseConfig = {
  apiKey: 'AIzaSyB4Z4c4JzTcgspm_auAtGEjat7AO0X32zM',
  authDomain: 'aplicativo-e1ae7.firebaseapp.com',
  projectId: 'aplicativo-e1ae7',
  storageBucket: 'aplicativo-e1ae7.appspot.com',
  messagingSenderId: '431166678727',
  appId: '1:431166678727:android:0ae6924303e05d703100e2',
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);


export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
