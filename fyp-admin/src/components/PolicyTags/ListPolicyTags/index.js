import Table from 'custom-components/Table';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPolicyTags, SearchPolicyTag } from 'store/reducer/appReducerSlice';

export default function LivePreviewExample() {
  const dispatch = useDispatch();
  const { policyTags } = useSelector((state) => ({
    policyTags: state.appReducer.policyTags
  }));
  const [header, setHeader] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const runAction = async () => {
      setisLoading(true);
      await dispatch(await getPolicyTags({ paginate: false, query: '' }));
      setisLoading(false);
    };
    runAction();
  }, []);
  useEffect(() => {
    setHeader([
      { name: 'Tag Name', fieldName: 'tag_name' },
      { name: 'Tag Multiplier', fieldName: 'tag_multiplier' },
      {
        name: 'Action',
        special: 'Actions',
        Link: 'policy-tag',
        PrimaryId: 'tag_id'
      }
    ]);
  }, []);

  useEffect(() => {
    setisLoading(true);
    const fetchData = async () => {
      if (!!searchTerm) {
        try {
          await dispatch(await SearchPolicyTag(searchTerm));
          setisLoading(false);
        } catch (error) {
          console.log('Error', error);
          setisLoading(false);
        }
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
          Title="Policy Tag"
          isLoading={isLoading}
          disabledSearch={true}
          setisLoading={setisLoading}
          headers={header}
          row={policyTags?.results ? policyTags?.results : []}
          total={policyTags?.count}
          next={policyTags?.next}
          previous={policyTags?.previous}
          paginateFunction={getPolicyTags}
          searchHandler={searchHandler}
        />
      </div>
    </>
  );
}
