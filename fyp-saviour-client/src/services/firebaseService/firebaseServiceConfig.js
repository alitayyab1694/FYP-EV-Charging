const prodConfig = {
 apiKey: "AIzaSyC4vlj7Z2PLCa_L0wOBKyWy-wnhpDK_rnY",
  authDomain: "slack-clone-c2e49.firebaseapp.com",
  projectId: "slack-clone-c2e49",
  storageBucket: "slack-clone-c2e49.appspot.com",
  messagingSenderId: "585783101825",
  appId: "1:585783101825:web:90ef2e40c92b567c13c080",
   databaseURL: 'https://slack-clone-c2e49.firebaseio.com/',
  measurementId: "G-XFNQJZGM3Y"
};

const devConfig = {
 apiKey: "AIzaSyC4vlj7Z2PLCa_L0wOBKyWy-wnhpDK_rnY",
  authDomain: "slack-clone-c2e49.firebaseapp.com",
  projectId: "slack-clone-c2e49",
  storageBucket: "slack-clone-c2e49.appspot.com",
  messagingSenderId: "585783101825",
   databaseURL: 'https://slack-clone-c2e49.firebaseio.com/',
  appId: "1:585783101825:web:90ef2e40c92b567c13c080",
  measurementId: "G-XFNQJZGM3Y"
};
 
const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
