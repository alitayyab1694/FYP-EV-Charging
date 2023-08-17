const prodConfig = {
  apiKey: 'AIzaSyCp1tQyw5qb8e0rCl3vjra4s9h3dvaKN0c',
  authDomain: 'evap-csms.firebaseapp.com',
  databaseURL: 'https://evap-csms-default-rtdb.firebaseio.com',
  projectId: 'evap-csms',
  storageBucket: 'evap-csms.appspot.com',
  messagingSenderId: '832063283756',
  appId: '1:832063283756:web:6fe11a253cef18b6d3a789',
  measurementId: 'G-RW23Z847KL'
};

const devConfig = {
  apiKey: 'AIzaSyCp1tQyw5qb8e0rCl3vjra4s9h3dvaKN0c',
  authDomain: 'evap-csms.firebaseapp.com',
  databaseURL: 'https://evap-csms-default-rtdb.firebaseio.com/',
  projectId: 'evap-csms',
  storageBucket: 'evap-csms.appspot.com',
  messagingSenderId: '832063283756',
  appId: '1:832063283756:web:6fe11a253cef18b6d3a789',
  measurementId: 'G-RW23Z847KL'
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
