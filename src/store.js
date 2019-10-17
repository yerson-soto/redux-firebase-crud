import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';

//configurar firestore
const firebaseConfig = {
    apiKey: "AIzaSyDAJcTgM3Hj12j7wjEnCTLOkyvJ-23rCZA",
    authDomain: "bibliostore-30fb7.firebaseapp.com",
    databaseURL: "https://bibliostore-30fb7.firebaseio.com",
    projectId: "bibliostore-30fb7",
    storageBucket: "bibliostore-30fb7.appspot.com",
    messagingSenderId: "329291767757",
    appId: "1:329291767757:web:51e8844bf4b7eb1a"
}
//inicializar firebase
firebase.initializeApp(firebaseConfig);

//configuracion de react-redux
const rrfConfig = {
    userProfile: 'users',
    userFirestoreForProfile: true
}

//crear el enhancer con compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore)


//Reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

//state inicial
const initialState = {};

//crear el store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)); 

export default store;