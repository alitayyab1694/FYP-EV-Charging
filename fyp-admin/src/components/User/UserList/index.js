import * as Actions from 'Actions';
import Table from 'custom-components/Table';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'store/reducer/appReducerSlice';

export default function LivePreviewExample() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => ({
    users: state.appReducer.users
  }));
  const [header, setHeader] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const runAction = async () => {
      setisLoading(true);
      await dispatch(await getUsers());
      setisLoading(false);
    };
    runAction();
  }, []);
  useEffect(() => {
    setHeader((prev) => {
      return [
        ...prev,
        { name: 'Full Name', special: 'user' },
        { name: 'Email', fieldName: 'email' },
        { name: 'Country', fieldName: 'country' },
        { name: 'Contact info', fieldName: 'phone' }
      ];
    });
  }, []);

  const searchHandler = () => {};

  return (
    <>
      <div className="table-responsive-md">
        <Table
          Title="Users"
          isLoading={isLoading}
          setisLoading={setisLoading}
          headers={header}
          row={users?.results ? users?.results : []}
          total={users?.count}
          next={users?.next}
          previous={users?.previous}
          paginateFunction={Actions.getUsers}
          searchHandler={searchHandler}
        />
      </div>
    </>
  );
}
