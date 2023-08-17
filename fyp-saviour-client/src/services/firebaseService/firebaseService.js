import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import '@firebase/functions';
import config from './firebaseServiceConfig';

class FirebaseService {
  init(success) {
    //;
    if (Object.entries(config).length === 0 && config.constructor === Object) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          'Missing Firebase Configuration at src/app/services/firebaseService/firebaseServiceConfig.js'
        );
      }
      success(false);
      return;
    }
    //;
    if (firebase.apps.length) {
      return;
    }
    //;
    firebase.initializeApp(config);
    this.db = firebase.database();
    this.functions = firebase.functions();
    this.auth = firebase.auth();
    success(true);
  }

  getUserData = (userId) => {
    //;
    
      if (!firebase.apps.length) {
      return false;
      }
    
    
    return new Promise(async (resolve, reject) => {
    
      const ref = this.db.ref(`users/${userId}`);
    

      try {
    

        const snapshot = await ref.once('value')
        const data = snapshot.val();
          resolve(data);
      } catch (error) {
        console.log("🚀 ~ file: firebaseService.js:45 ~ FirebaseService ~ returnnewPromise ~ error:", error)
        
      }
   
        
    });
  };

  updateUserData = (user) => {
    if (!firebase.apps.length) {
      return false;
    }
    //;
    return this.db.ref(`users/${user.uid}`).set(user);
  };

  onAuthStateChanged = (callback) => {
    //;
    if (!this.auth) {
      return;
    }
    this.auth.onAuthStateChanged(callback);
  };

  signOut = () => {
    if (!this.auth) {
      return;
    }
    this.auth.signOut();
  };
}

const instance = new FirebaseService();

export default instance;
