import * as Actions from 'Actions';
import Table from 'custom-components/Table';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanies } from 'store/reducer/appReducerSlice';

export default function LivePreviewExample() {
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => ({
    companies: state.appReducer.companies
  }));
  const [header, setHeader] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const runAction = async () => {
      setisLoading(true);
      await dispatch(await getCompanies());
      setisLoading(false);
    };
    runAction();
  }, []);
  useEffect(() => {
    setHeader((prev) => {
      return [
        ...prev,
        { name: 'Company Name', fieldName: 'companyname' },
        { name: 'Description', fieldName: 'description' },
        { name: 'Owner', fieldName: 'ownername' },
        // { name: 'Status', special: 'status' },
        {
          name: 'Action',
          special: 'Actions',
          Link: 'Add-Company',
          PrimaryId: '_id'
        }
      ];
    });
  }, []);

  const searchHandler = () => {};

  return (
    <>
      <div className="table-responsive-md">
        <Table
          Title="Companies"
          isLoading={isLoading}
          setisLoading={setisLoading}
          headers={header}
          row={companies}
          total={companies?.count}
          next={companies?.next}
          previous={companies?.previous}
          paginateFunction={getCompanies}
          searchHandler={searchHandler}
        />
      </div>
    </>
  );
}
