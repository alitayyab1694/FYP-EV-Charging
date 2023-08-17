import * as Actions from 'Actions';
import Table from 'custom-components/Table';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRates, SearchRate } from 'store/reducer/appReducerSlice';
export default function LivePreviewExample() {
  const dispatch = useDispatch();
  const { rates } = useSelector((state) => ({
    rates: state.appReducer.rates
  }));
  const [header, setHeader] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const runAction = async () => {
      setisLoading(true);
      await dispatch(await getRates({ paginate: true, query: '' }));
      setisLoading(false);
    };
    runAction();
  }, []);
  useEffect(() => {
    setHeader((prev) => {
      return [
        ...prev,
        { name: 'StartDate', fieldName: 'profilestart' },
        { name: 'EndDate', fieldName: 'profileend' },
        {
          name: 'StartTime',
          fieldName: 'profilestarttime',
          special: 'rate/StartTime'
        },
        {
          name: 'EndTime',
          fieldName: 'profileendtime',
          special: 'rate/EndTime'
        },
        { name: 'ProfileType', fieldName: 'profilepricetype' },
        { name: 'Price', fieldName: 'profilepriceunit' }
      ];
    });
  }, []);

  useEffect(() => {
    setisLoading(true);

    const fetchData = async () => {
      try {
        await dispatch(await SearchRate(searchTerm));
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
          Title="Groups"
          isLoading={isLoading}
          setisLoading={setisLoading}
          headers={header}
          row={rates?.results ? rates?.results : []}
          total={rates?.count}
          next={rates?.next}
          previous={rates?.previous}
          paginateFunction={getRates}
          searchHandler={searchHandler}
        />
      </div>
    </>
  );
}
