import * as Actions from 'Actions';
import Table from 'custom-components/Table';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers, SearchCustomer } from 'store/reducer/appReducerSlice';

export default function LivePreviewExample() {
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => ({
    customer: state.appReducer.customer
  }));
  const [header, setHeader] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const runAction = async () => {
      setisLoading(true);
      await dispatch(await getCustomers({ paginate: false, query: '' }));
      setisLoading(false);
    };
    runAction();
  }, []);
  useEffect(() => {
    setHeader((prev) => {
      return [
        ...prev,
        { name: 'Email', fieldName: 'email', drawer: true, customer: true },
        { name: 'User Tag', fieldName: 'idtag_fk' },
        { name: 'Policy Tags', special: 'customer/tag' },

        {
          name: 'Action',
          special: 'Model',
          PrimaryId: 'idtag_fk'
        }
      ];
    });
  }, []);

  useEffect(() => {
    setisLoading(true);

    const fetchData = async () => {
      try {
        await dispatch(await SearchCustomer(searchTerm));
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
          Title="Customer"
          isLoading={isLoading}
          setisLoading={setisLoading}
          headers={header}
          row={customer?.results ? customer?.results : []}
          total={customer?.count}
          next={customer?.next}
          previous={customer?.previous}
          paginateFunction={getCustomers}
          searchHandler={searchHandler}
        />
      </div>
    </>
  );
}
