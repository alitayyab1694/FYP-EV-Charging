import React from 'react';
import { useSelector } from 'react-redux';
import avatar9 from '../../assets/images/stock-photos/avatar9.svg';
const SidebarUserbox = (props) => {
  const { singleBox } = useSelector((state) => ({
    singleBox: state.appReducer.singleBox
  }));
  return (
    <>
      <div className="app-sidebar--userbox  mb-3 ">
        <div>
          <img src={avatar9} alt="..." width="100%" height="100%" />{' '}
        </div>
        <div className="userbox-details px-3 my-2 text-center">
          {singleBox?.chargeboxid}
        </div>
      </div>
    </>
  );
};

export default SidebarUserbox;
