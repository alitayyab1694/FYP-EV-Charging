import Table from 'custom-components/Table';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPolices, SearchPolicy } from 'store/reducer/appReducerSlice';

export default function LivePreviewExample() {
  const dispatch = useDispatch();
  const { policies } = useSelector((state) => ({
    policies: state.appReducer.policies
  }));
  const [header, setHeader] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const runAction = async () => {
      setisLoading(true);
      await dispatch(await getPolices({ paginate: false, query: '' }));
      setisLoading(false);
    };
    runAction();
  }, []);
  useEffect(() => {
    setHeader((prev) => {
      return [
        ...prev,
        { name: 'Name', fieldName: 'profilename' },
        { name: 'Type', fieldName: 'applicabletype' },
        { name: 'Profile day', fieldName: 'profileday' },
        { name: 'Priority', fieldName: 'profilepriority' },
        { name: 'Minimum Limit', fieldName: 'limitminutes' },
        {
          name: 'Action',
          special: 'Actions',
          Link: 'Add-Pricing-Policy',
          PrimaryId: 'paymentpolicyid'
        }
      ];
    });
  }, []);

  useEffect(() => {
    setisLoading(true);
    const fetchData = async () => {
      ;
      try {
        await dispatch(await SearchPolicy(searchTerm));
        setisLoading(false);
      } catch (error) {
        console.log('Error', error);
        setisLoading(false);
      }
    };
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 3000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="table-responsive-md">
        <Table
          Title="Pricing Policy"
          isLoading={isLoading}
          setisLoading={setisLoading}
          headers={header}
          row={policies?.results ? policies?.results : []}
          total={policies?.count}
          next={policies?.next}
          previous={policies?.previous}
          paginateFunction={getPolices}
          searchHandler={searchHandler}
        />
      </div>
    </>
  );
}
