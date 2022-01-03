import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyC-MKmtCA_Xai7njQ3qXS8IiRGb5aSs8FA",
    authDomain: "vueappprototype.firebaseapp.com",
    projectId: "vueappprototype",
    storageBucket: "vueappprototype.appspot.com",
    messagingSenderId: "400386555896",
    appId: "1:400386555896:web:fa131e4ee9a58b3480200d"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export {timestamp};
  export default firebaseApp.firestore();