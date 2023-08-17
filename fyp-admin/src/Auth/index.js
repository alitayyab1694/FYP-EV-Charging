import React, { Component, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { connect } from "react-redux";
import { CircleLoader } from "react-spinners";
// import { bindActionCreators } from "redux";
// import firebaseService from "services/firebaseService";
import {
  // logoutUser,
  setUserData,
  // setUserDataFirebase,
} from "store/reducer/userSlice";
import { getLocalStorage } from "utils";

const Auth = (props) => {
  const [state, setState] = useState({ waitAuthCheck: true });
  const dispatch = useDispatch();
  // state = {
  //   waitAuthCheck: true,
  // };

  useEffect(() => {
    const userExists = getLocalStorage("evap-user");
    console.log("userExists", userExists);
    if (Object.keys(userExists).length >= 1) {
      dispatch(setUserData({ ...userExists, isAuth: true }));
      // mapDispatchToProps(setUserData(userExists));
    }
    setState({ waitAuthCheck: false });
  }, []);
  // componentDidMount() {
  // return Promise.all([
  //   // Comment the lines which you do not use
  //   this.firebaseCheck()
  // ]).then(() => {
  //   this.setState({ waitAuthCheck: false });
  // });

  // }

  // firebaseCheck = () =>
  //   new Promise((resolve) => {
  //     firebaseService.init((success) => {
  //       if (!success) {
  //         resolve();
  //       }
  //     });
  //     firebaseService.onAuthStateChanged((authUser) => {
  //       if (authUser) {
  //         /**
  //          * Retrieve user data from Firebase
  //          */
  //         //;

  //         firebaseService.getUserData(authUser.uid).then(
  //           (user) => {
  //             this.props.setUserDataFirebase({ user, authUser });

  //             resolve();
  //           },
  //           (error) => {
  //             resolve();
  //           }
  //         );
  //       } else {
  //         resolve();
  //       }
  //     });

  //     return Promise.resolve();
  //   });

  // render() {
  return state.waitAuthCheck ? (
    <>
      <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
        <div className="d-flex align-items-center flex-column px-4">
          <CircleLoader color={"#2f2f2f"} loading={true} />
        </div>
        <div className="text-muted font-size-xl text-center pt-3">
          Please wait while we load.....
        </div>
      </div>
    </>
  ) : (
    <>{props.children}</>
  );
};
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(
//     {
//       logout: logoutUser,
//       setUserData,
//       setUserDataFirebase,
//     },
//     dispatch
//   );
// }
// const mapStateToProps = (state) => ({
//   pgUser: state.appReducer.pgUser,
//   storeUser: state.user,
// });
// export default connect(mapStateToProps, mapDispatchToProps)(Auth);
export default Auth;
