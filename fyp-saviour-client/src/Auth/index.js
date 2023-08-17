import * as Actions from 'Actions';
import  { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebaseService from 'services/firebaseService';

class Auth extends Component {
  state = {
    waitAuthCheck: false
  };

  componentDidMount() {
    return Promise.all([
      // Comment the lines which you do not use
      this.firebaseCheck()
    ]).then(() => {
      this.setState({ waitAuthCheck: false });
    });
  }
  firebaseCheck = () =>
    new Promise((resolve) => {
      firebaseService.init((success) => {
        if (!success) {
          resolve();
        }
      });
      firebaseService.onAuthStateChanged((authUser) => {
        if (authUser) {

          firebaseService.getUserData(authUser.uid).then(
            async (user) => {

              this.props.setUserDataFirebase(user, authUser);
              resolve();
            },
            (error) => {
            console.log("🚀 ~ file: index.js:47 ~ Auth ~ firebaseService.onAuthStateChanged ~ error:", error)

              resolve();
            }
          );
        } else {
          resolve();
        }
      });

      return Promise.resolve();
    });

  render() {
    return this.props.children
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: Actions.logoutUser,
      setUserData: Actions.setUserData,
      setUserDataFirebase: Actions.setUserDataFirebase
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Auth);
