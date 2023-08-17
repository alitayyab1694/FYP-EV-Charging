import Table from 'custom-components/Table';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from 'store/reducer/appReducerSlice';

export default function LivePreviewExample() {
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => ({
    groups: state.appReducer.groups
  }));
  const [header, setHeader] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const runAction = async () => {
      setisLoading(true);
      await dispatch(await getGroups({ paginate: false, query: '' }));
      setisLoading(false);
    };
    runAction();
  }, []);
  useEffect(() => {
    setHeader((prev) => {
      return [
        ...prev,
        { name: 'Group Name', fieldName: 'groupname' },
        { name: 'Policy Name', special: 'group/pricingpolicy' },
        { name: 'Charging Point', special: 'group/chargebox' },
        // { name: 'Status', special: 'status' },
        {
          name: 'Action',
          special: 'Actions',
          Link: 'Add-Group',
          PrimaryId: 'groupid'
        }
      ];
    });
  }, []);

  const searchHandler = () => {};

  return (
    <>
      <div className="table-responsive-md">
        <Table
          Title="Groups"
          isLoading={isLoading}
          setisLoading={setisLoading}
          headers={header}
          row={groups?.results ? groups?.results : []}
          total={groups?.count}
          next={groups?.next}
          previous={groups?.previous}
          paginateFunction={getGroups}
          searchHandler={searchHandler}
        />
      </div>
    </>
  );
}
