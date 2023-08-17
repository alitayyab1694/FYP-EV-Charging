import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import filterFactory, {
  textFilter,
  selectFilter,
  Comparator
} from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { getUsers } from 'store/reducer/appReducerSlice';

const { SearchBar } = Search;

const columns = [
  {
    dataField: 'name',
    text: 'Full Name',
    sort: true
  },
  {
    dataField: 'email',
    text: 'Email',
    sort: true
  },
  {
    dataField: 'country',
    text: 'Country',
    sort: true
  },
  {
    dataField: 'contactinfo',
    text: 'Contact Info',
    sort: true
  },
  {
    dataField: 'action',
    text: 'Action'
  }
];

const defaultSorted = [
  {
    dataField: 'name',
    order: 'desc'
  }
];

const products = [
  {
    name: 'aik do',
    email: 'teen@char.com	',
    country: 'malaysia',
    contactinfo: 'None'
  },
  {
    name: 'aik do',
    email: 'teen1@char.com	',
    country: 'malaysia',
    contactinfo: 'None'
  },
  {
    name: 'aik do',
    email: 'teen2@char.com	',
    country: 'malaysia',
    contactinfo: 'None'
  },
  {
    name: 'aik do',
    email: 'teen3@char.com	',
    country: 'malaysia',
    contactinfo: 'None'
  },
  {
    name: 'aik do',
    email: 'teen4@char.com	',
    country: 'malaysia',
    contactinfo: 'None'
  }
];

export default function LivePreviewExample() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const { users } = useSelector((state) => ({ users: state.appReducer.users }));
  return (
    <>
      <div className="table-responsive-md">
        <ToolkitProvider
          keyField="id"
          bootstrap4
          data={products}
          columns={columns}
          defaultSorted={defaultSorted}
          search>
          {(props) => (
            <div>
              <div style={{ textAlign: 'right' }}>
                <SearchBar {...props.searchProps} />
              </div>

              <hr />

              <BootstrapTable
                {...props.baseProps}
                filter={filterFactory()}
                pagination={paginationFactory()}
              />
            </div>
          )}
        </ToolkitProvider>
      </div>
    </>
  );
}
