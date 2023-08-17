import * as Actions from 'Actions';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Badge,
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row
} from 'reactstrap';
import * as API from 'api';

export default function LivePreviewExample({ singleTag }) {
  const dispatch = useDispatch();
  const deletePolicyTagHandler = async (obj) => {
    try {
      const res = await API.patch(`/policy-tags-rm/${singleTag?.tag_id}/`, obj);
      // dispatch({
      //   type: Type.UPDATE_POLICY
      // });
      // return { success: true, data: res };
    } catch (error) {
      console.log(error.response);
      // return { success: false, data: error.response };
    }
  };

  const deleteUserPolicyTagHandler = async (obj) => {
    try {
      const res = await API.patch(`/policy-tags-rm/${singleTag?.tag_id}/`, obj);
      // dispatch({
      //   type: Type.UPDATE_POLICY
      // });
      // return { success: true, data: res };
    } catch (error) {
      console.log(error.response);
      // return { success: false, data: error.response };
    }
  };

  return (
    <>
      <Row>
        <Col xl="6">
          <Card className="card-box mb-5">
            <div className="card-header">
              <div className="card-header--title">
                <small className="d-block text-uppercase mt-1"></small>
                <b>ChargeBox</b>
              </div>
              <div className="card-header--actions">
                <Badge pill color="dark"></Badge>
              </div>
            </div>
            <ListGroup flush>
              <ListGroupItem className="py-3">
                <Row className="no-gutters">
                  {singleTag?.tag_chargebox?.map((c) => (
                    <>
                      <Col
                        key={c}
                        xl="6"
                        md="12"
                        className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon-wrapper mr-2">
                            <div className="avatar-icon"></div>
                          </div>
                          <div>
                            <span className="text-black-50 d-block">{c}</span>
                          </div>
                        </div>
                      </Col>
                      <Col
                        xl="6"
                        md="12"
                        className="pt-3 pt-xl-0 d-flex align-items-center">
                        <div className="align-box-row flex-grow-1">
                          <div className="d-flex flex-column flex-grow-1">
                            <div className="d-flex justify-content-between text-dark">
                              <div className="ml-auto">
                                <div className="font-weight-bold"></div>
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() =>
                              deletePolicyTagHandler({
                                tag_chargebox_id: c
                              })
                            }
                            // (e) => {
                            // e.preventDefault();
                            // dispatch(
                            //   Actions.deleteChargePolicyTag(singleTag, {
                            //     tag_chargebox_id: c
                            //   })
                            // );
                            // }
                            color="neutral-primary"
                            className="ml-4">
                            Delete
                          </Button>
                        </div>
                      </Col>
                    </>
                  ))}
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="card-box mb-5">
            <div className="card-header">
              <div className="card-header--title">
                <small className="d-block text-uppercase mt-1"></small>
                <b>Users</b>
              </div>
              <div className="card-header--actions">
                <Badge pill color="dark"></Badge>
              </div>
            </div>
            <ListGroup flush>
              <ListGroupItem className="py-3">
                <Row className="no-gutters">
                  {singleTag?.tag_user?.map((u, i) => (
                    <>
                      <Col
                        key={i}
                        xl="6"
                        md="12"
                        className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon-wrapper mr-2">
                            <div className="avatar-icon"></div>
                          </div>
                          <div>
                            <span className="text-black-50 d-block">
                              {u?.idtag_fk[0]?.email}
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col
                        xl="6"
                        md="12"
                        className="pt-3 pt-xl-0 d-flex align-items-center">
                        <div className="align-box-row flex-grow-1">
                          <div className="d-flex flex-column flex-grow-1">
                            <div className="d-flex justify-content-between text-dark">
                              <div className="ml-auto">
                                <div className="font-weight-bold"></div>
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => {
                              deleteUserPolicyTagHandler({
                                tag_user_id: u?.idtag
                              });
                              // dispatch(
                              //   Actions.deleteUserPolicyTag(singleTag, {
                              //     tag_user_id: u?.idtag
                              //   })
                              // );
                            }}
                            color="neutral-primary"
                            className="ml-4">
                            Delete
                          </Button>
                        </div>
                      </Col>
                    </>
                  ))}
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}
