import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDispatch, useSelector } from "react-redux";
import { getChargeBoxes } from "store/reducer/appReducerSlice";
import ChargingboxListTable from "./ChargingboxListTable";
import clsx from "clsx";
import { PulseLoader } from "react-spinners";
import * as API from "api";
import { Card, CardBody, CardHeader, Input } from "reactstrap";

export default function ListChargebox() {
  const [searchOpen, setSearchOpen] = useState(false);

  const dispatch = useDispatch();
  const { chargeboxes    , user} = useSelector((state) => ({
    chargeboxes: state.appReducer.chargeBox,
    user: state.user,
  }));
  const [isLoading, setisLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [reloadData, setReloadData] = useState(false);
  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);
  useEffect(() => {
   
    const runAction = async () => { 
 try {
     await dispatch( await getChargeBoxes(user?.company));
      setisLoading(false);
    } catch (error) {
      console.log("error", error);
      setisLoading(false);
    }
    }
    runAction()
  }, [reloadData]);

  const deleteHandler = async (id) => {
    ;
    try {
      await API.deleteApi(API.DELETE_CHARGEBOX + id);
      setReloadData((prev) => !prev);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="table-responsive-xl">
        <Card className="card-box mb-5">
          <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-4">
            <div>
              <h6 className="font-weight-bold font-size-lg mb-0 text-black">
                Chargeboxes
              </h6>
            </div>
          </CardHeader>
          <div className="divider" />
          <div className="px-4 py-3">
            <div
              className={clsx(
                "search-wrapper search-wrapper--alternate search-wrapper--grow",
                { "is-active": searchOpen }
              )}
            >
              <span className="icon-wrapper text-black">
                <FontAwesomeIcon icon={["fas", "search"]} />
              </span>
              <Input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={openSearch}
                onBlur={closeSearch}
                placeholder="Search terms..."
              />
            </div>
          </div>
          <div className="divider" />
          <CardBody className="p-0">
            {isLoading ? (
              <div className="d-flex align-items-center flex-column  justify-content-center text-center py-3">
                <div className="d-flex align-items-center flex-column px-4">
                  <PulseLoader color={"#2f2f2f"} loading />
                </div>
                <div className="text-muted font-size-xl text-center pt-3">
                  Please wait while data is Loading......
                </div>
              </div>
            ) : (
              <ChargingboxListTable
                data={chargeboxes}
                deleteHandler={deleteHandler}
              />
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
}
