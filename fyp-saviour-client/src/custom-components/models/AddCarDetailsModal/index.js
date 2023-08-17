import React, { useState } from 'react';

import Select from 'rc-select';
import { Form, Button, Modal, ModalBody } from 'reactstrap';
import styled from 'styled-components';

const Body = styled.div`
  padding: 15% 10%;
`;

const options = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org'
  },
  {
    id: 2,
    disabled: true,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    phone: '010-692-6593 x09125',
    website: 'anastasia.net'
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    phone: '1-463-123-4447',
    website: 'ramiro.info'
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
    phone: '493-170-9623 x156',
    website: 'kale.biz'
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
    phone: '(254)954-1289',
    website: 'demarco.info'
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    username: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
    phone: '1-477-935-8478 x6430',
    website: 'ola.org'
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
    phone: '210.067.6132',
    website: 'elvis.io'
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    username: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
    phone: '586.493.6943 x140',
    website: 'jacynthe.com'
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
    phone: '(775)976-6794 x41206',
    website: 'conrad.com'
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    username: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
    phone: '024-648-3804',
    website: 'ambrose.net'
  }
];

export default function LivePreviewExample({ open, handleModal }) {
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    multi: true,
    disabled: false,
    loading: false,
    selectValues: [],
    searchBy: 'username',
    searchable: true,
    addPlaceholder: '+ click to add',
    labelField: 'username',
    valueField: 'email'
  });

  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Modal zIndex={2000} centered isOpen={open} toggle={handleModal}>
          <ModalBody>
            <Body>
              <h4 className="font-weight-bold mb-3">New Vehicle</h4>
              <Form>
                <div className="row justify-content-center align-items-center">
                  <div className="col-12 my-3">
                    <Select
                      options={options}
                      className="w-100"
                      placeholder="Make"
                      searchable={state.searchable}
                      disabled={state.disabled}
                      labelField={state.labelField}
                      valueField={state.valueField}
                      values={[
                        options.find((opt) => opt.username === 'Elwyn.Skiles')
                      ]}
                      onChange={(values) => this.setValues(values)}
                    />
                  </div>
                  <div className="col-12 my-3">
                    <Select
                      options={options}
                      className="w-100"
                      placeholder="Model"
                      searchable={state.searchable}
                      disabled={state.disabled}
                      labelField={state.labelField}
                      valueField={state.valueField}
                      values={[
                        options.find((opt) => opt.username === 'Elwyn.Skiles')
                      ]}
                      onChange={(values) => this.setValues(values)}
                    />
                  </div>
                  <div className="col-12 my-3">
                    <Select
                      options={options}
                      className="w-100"
                      placeholder="Trim"
                      searchable={state.searchable}
                      disabled={state.disabled}
                      labelField={state.labelField}
                      valueField={state.valueField}
                      values={[
                        options.find((opt) => opt.username === 'Elwyn.Skiles')
                      ]}
                      onChange={(values) => this.setValues(values)}
                    />
                  </div>
                  <div className="col-12 my-3">
                    <Select
                      options={options}
                      className="w-100"
                      placeholder="Color"
                      searchable={state.searchable}
                      disabled={state.disabled}
                      labelField={state.labelField}
                      valueField={state.valueField}
                      values={[
                        options.find((opt) => opt.username === 'Elwyn.Skiles')
                      ]}
                      onChange={(values) => this.setValues(values)}
                    />
                  </div>
                  <div className="col-12 my-3">
                    <Button color="primary" className="w-100">
                      Add Vehicle
                    </Button>
                  </div>
                </div>
              </Form>
            </Body>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
}
