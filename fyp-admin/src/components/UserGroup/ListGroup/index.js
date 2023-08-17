import * as Actions from 'Actions';
import Table from 'custom-components/Table';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyUsers, getUserGroups, SearchUserGroup } from 'store/reducer/appReducerSlice';

export default function LivePreviewExample() {
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => ({
    groups: state.appReducer.userGroup
  }));
  console.log("🚀 ~ file: index.js:12 ~ const{groups}=useSelector ~ groups:", groups)
  const [header, setHeader] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const runAction = async () => {
      setisLoading(true);
      await dispatch(await getCompanyUsers());
      setisLoading(false);
    };
    runAction();
  }, []);
  useEffect(() => {
    setHeader([
      { name: 'Name', fieldName: 'name' },
      { name: 'Company Name', special: 'group/description' },
      { name: 'Email', fieldName: 'email' },
      // {
      //   name: 'Edit',
      //   special: 'Actions',
      //   Link: 'Add-User-Group',
      //   PrimaryId: 'groupid'
      // }
    ]);
  }, []);

  // useEffect(() => {
  //   setisLoading(true);

  //   const fetchData = async () => {
  //     try {
  //       await dispatch(await SearchUserGroup(searchTerm));
  //       setisLoading(false);
  //     } catch (error) {
  //       console.log('Error', error);
  //       setisLoading(false);
  //     }
  //   };

  //   const delayDebounceFn = setTimeout(() => {
  //     fetchData();
  //   }, 3000);
  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchTerm]);

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="table-responsive-md">
        <Table
          Title="User"
          isLoading={isLoading}
          setisLoading={setisLoading}
          headers={header}
          row={groups ? groups : []}
          total={groups?.count}
          next={groups?.next}
          previous={groups?.previous}
          paginateFunction={getCompanyUsers}
          searchHandler={searchHandler}
        />
      </div>
    </>
  );
}
