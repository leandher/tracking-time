import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCU1GaRMvpvHNKf2nKgj5fQ2WkVzdPiDOE',
  authDomain: 'time-tracking-798b8.firebaseapp.com',
  databaseURL: 'https://time-tracking-798b8.firebaseio.com',
  projectId: 'time-tracking-798b8',
  storageBucket: 'time-tracking-798b8.appspot.com',
  messagingSenderId: '162591039220',
  appId: '1:162591039220:web:8ec29008d0c2a1e62888a1',
  measurementId: 'G-8ZX6CR5808',
};

firebase.initializeApp(config);

export default firebase;
