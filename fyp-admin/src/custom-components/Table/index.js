import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import history from "@history";
import _ from "@lodash";
import * as Actions from "Actions";
import clsx from "clsx";
import moment from "moment";
import Switch from "rc-switch";
import React, { useState } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Circle,
  Settings,
} from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DropdownMenu,
  DropdownToggle,
  Input,
  Nav,
  NavItem,
  NavLink as NavLinkStrap,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import { SelectChargebox, SelectCustomer } from "store/reducer/appReducerSlice";
import {
  chargeBoxTageHandler,
  customerPolicyModelHandler,
  GroupUserHandler,
} from "store/reducer/modalSlice";
// import {
//   setHeaderDrawerToggle,
//   setHeaderDrawerToggleCustomer
// } from 'reducers/ThemeOptions';
import {
  setHeaderDrawerToggle,
  setHeaderDrawerToggleCustomer,
} from "store/reducer/themeOptionsSlice";
import UpdateChargeBoxModel from "../UpdateChargeBoxModel";
import UpdateCustomerModel from "../UpdateCustomerModel";
import UpdateGroupModel from "../UpdateGroup";

export default function LivePreviewExample({
  headers,
  isLoading,
  setisLoading,
  row,
  total,
  next,
  previous,
  Title,
  disabledSearch,
  paginateFunction,
  searchHandler,
}) {
  console.log("row", row);
  const dispatch = useDispatch();
  const { headerDrawerToggle, headerDrawerToggleCustomer } = useSelector(
    (state) => ({
      headerDrawerToggle: state.ThemeOptions.headerDrawerToggle,
      headerDrawerToggleCustomer: state.ThemeOptions.headerDrawerToggleCustomer,
    })
  );

  const [searchOpen, setSearchOpen] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);
  const [userId, setUserId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [chargeBoxId, setchargeBoxId] = useState("");
  const [drawerDataId, setDrawerDataId] = useState("");
  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);
  const onNextHandler = async (action, url, page) => {
    setisLoading(true);
    if (action === "next") {
      setcurrentPage(currentPage + 1);
    } else if (action === "exact") {
      setcurrentPage(page);
    } else {
      setcurrentPage(currentPage - 1);
    }
    if (page) {
      const updatedUrl = url;
      const offsetValue = updatedUrl.split("?")[1].split("&")[1];
      await dispatch(
        await paginateFunction({
          paginate: true,
          query: url
            ?.split("?")[1]
            .replace(offsetValue, "offset=" + page + "0"),
        })
      );
    } else {
      await dispatch(
        await paginateFunction({ paginate: true, query: url?.split("?")[1] })
      );
    }
    setisLoading(false);
  };
  const toogleHeaderDrawer = () => {
    dispatch(setHeaderDrawerToggle(!headerDrawerToggle));
  };

  const openDrawer = (id, customerId) => {
    if (customerId) {
      dispatch(setHeaderDrawerToggleCustomer(true));
      dispatch(SelectCustomer(customerId));
      toogleHeaderDrawer();
    } else {
      dispatch(setHeaderDrawerToggleCustomer(false));
      dispatch(SelectChargebox(id));
      toogleHeaderDrawer();
    }
  };

  const historyPushHandler = (link, id) => {
    history.push(`/${link}/${id}`);
  };
  const download = (e) => {
    fetch(e, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <UpdateCustomerModel userId={userId} />
      <UpdateGroupModel groupId={groupId} />
      <UpdateChargeBoxModel
        chargeBoxId={chargeBoxId}
        tags={
          row?.find((chargebox) => chargebox.chargeboxid === chargeBoxId)
            ?.chargebox_tag
        }
      />
      <Card className="card-box mb-5">
        <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-4">
          <div>
            <h6 className="font-weight-bold font-size-lg mb-0 text-black">
              {Title}
            </h6>
          </div>
          <div className="d-flex align-items-center">
            <UncontrolledDropdown>
              <DropdownToggle
                outline
                color="primary"
                className="d-flex align-items-center justify-content-center d-40 p-0 rounded-pill"
              >
                <Settings className="w-50" />
              </DropdownToggle>
              <DropdownMenu
                right
                className="dropdown-menu-lg overflow-hidden p-0"
              >
                <div className="font-weight-bold px-4 pt-3">Results</div>
                <Nav className="nav-neutral-first nav-pills-rounded flex-column p-2">
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <Circle />
                      </div>
                      <span className="font-size-md">
                        <b>10</b> results per page
                      </span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <Circle />
                      </div>
                      <span className="font-size-md">
                        <b>20</b> results per page
                      </span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <Circle />
                      </div>
                      <span className="font-size-md">
                        <b>30</b> results per page
                      </span>
                    </NavLinkStrap>
                  </NavItem>
                </Nav>
                <div className="divider" />
                <div className="font-weight-bold px-4 pt-4">Order</div>
                <Nav className="nav-neutral-first nav-pills-rounded flex-column p-2">
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <ArrowUpCircle />
                      </div>
                      <span className="font-size-md">Ascending</span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <ArrowDownCircle />
                      </div>
                      <span className="font-size-md">Descending</span>
                    </NavLinkStrap>
                  </NavItem>
                </Nav>
              </DropdownMenu>
            </UncontrolledDropdown>
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
              disabled={disabledSearch}
              type="search"
              onChange={(e) => searchHandler(e)}
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
                <PulseLoader color={"#2f2f2f"} loading={true} />
              </div>
              <div className="text-muted font-size-xl text-center pt-3">
                Please wait while data is Loading......
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover striped className="text-nowrap mb-0">
                <thead className="thead-light">
                  {headers?.map((h) => {
                    return h?.width ? (
                      <th style={{ width: h?.width }}>{h?.name}</th>
                    ) : (
                      <th
                        style={{ wordWrap: "break-word" }}
                        className="text-center"
                      >
                        {h?.name}
                      </th>
                    );
                  })}
                </thead>
                <tbody>
                  {row?.map((r , inx) => {
                    return (
                      <tr>
                        {headers?.map((h) => {
                          return h?.special ? (
                            h?.special === "user" ? (
                              <td className="text-center">
                                {r?.["firstname"] + " " + r?.["lastname"]}
                              </td>
                            ) : h?.special === "group/chargebox" ? (
                              <td className="text-center">
                                {r?.["chargebox"].length
                                  ? r?.["chargebox"].length
                                  : "-"}
                              </td>
                            ) : h?.special === "group/pricingpolicy" ? (
                              <td className="text-center">
                                {r?.pricingpolicy
                                  ?.map((p) => p.profilename)
                                  .join(",")}
                              </td>
                            ) : h?.special === "status" ? (
                              <td className="text-center">
                                <Switch
                                  checked={
                                    !r.status || r.status === null
                                      ? false
                                      : true
                                  }
                                  onChange={() => {
                                    dispatch(
                                      Actions.updateStatus(
                                        r.groupid,
                                        "group",
                                        r
                                      )
                                    );
                                  }}
                                  className="switch-medium toggle-switch-success"
                                />
                              </td>
                            ) : h?.special === "charge/siteArea" ? (
                              <td className="text-center">
                                {r?.["zip_code"] + "," + r?.["street"]}
                              </td>
                            ) : h?.special === "charge/status" ? (
                              <td className="text-center">
                                {r?.status ? "Connected" : "Disconnected"}
                              </td>
                            ) : h?.special === "charge/instantPower" ? (
                              <td className="text-center">
                                {r?.consumption ? (
                                  <div>
                                    {`${r?.consumption}/${r?.capacity}KW`}
                                    <Progress
                                      value={
                                        Number(r?.consumption * 100) /
                                          Number(r?.capacity) !==
                                        0
                                          ? Number(r?.consumption * 100) /
                                            Number(r?.capacity)
                                          : 100
                                      }
                                      className="progress-animated-alt progress-lg"
                                      color="primary"
                                    >
                                      {Number(r?.consumption * 100) /
                                        Number(r?.capacity) !==
                                      0
                                        ? Number(r?.consumption * 100) /
                                          Number(r?.capacity)
                                        : 100}
                                    </Progress>
                                  </div>
                                ) : (
                                  <div>
                                    {`0/${r?.capacity}KW`}
                                    <Progress
                                      value={
                                        Number(0 * 100) /
                                          Number(r?.capacity) !==
                                        0
                                          ? Number(0 * 100) /
                                            Number(r?.capacity)
                                          : 100
                                      }
                                      className="progress-animated-alt progress-lg"
                                      color="primary"
                                    >
                                      {Number(r?.capacity)}
                                    </Progress>
                                  </div>
                                )}
                              </td>
                            ) : h?.special === "charge/public" ? (
                              <td className="text-center">Yes</td>
                            ) : h?.special === "charge/tags" ? (
                              <td
                                style={{
                                  width: "20px",
                                }}
                                className="text-center"
                              >
                                {r?.chargebox_tag?.join(", ")}
                              </td>
                            ) : h?.special === "group/description" ? (
                              <td className="text-center">
                                {r?.company?.companyname }
                              </td>
                            ) : h?.special === "Actions" ? (
                              <td className="text-center">
                                <Button
                                  onClick={(e) => {
                                    historyPushHandler(
                                      h?.Link,
                                      r[h?.PrimaryId]
                                    );
                                  }}
                                  color="neutral-primary"
                                  className="mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center"
                                >
                                  <FontAwesomeIcon
                                    icon={["far", "edit"]}
                                    className="font-size-sm"
                                  />
                                </Button>
                              </td>
                            ) : h?.special === "reservation/chargeboxId" ? (
                              <td className="text-center">
                               {`CH-${inx+1}`}
                              </td>
                            ):  h?.special === "reservation/policy" ? (
                              <td className="text-center">
                                {r?.reservePolicyId_fk?.profilename
                                  ? r?.reservePolicyId_fk?.profilename
                                  : "-"}
                              </td>
                            ) : h?.special === "reservation/chargeboxid_fk" ? (
                              <td className="text-center">
                                {r?.chargeboxid_fk?.chargeboxid
                                  ? r?.chargeboxid_fk?.chargeboxid
                                  : "-"}
                              </td>
                            ) : h?.special === "customer/policy" ? (
                              <td className="text-center">
                                {r?.user?.policy?.length > 0
                                  ? r?.user?.policy
                                      ?.map((p) => {
                                        return p?.profilename;
                                      })
                                      .join(", ")
                                  : "-"}
                              </td>
                            ) : h?.special === "customer/tag" ? (
                              <td className="text-center">
                                {r?.user?.user_tag?.length > 0
                                  ? r?.user?.user_tag
                                      ?.map((t) => {
                                        return t?.tag_name;
                                      })
                                      .join(", ")
                                  : "-"}
                              </td>
                            ) : h?.special === "Model" ? (
                              <td className="text-center">
                                <Button
                                  onClick={(e) => {
                                    if (h?.component === "ChargeBox") {
                                      dispatch(chargeBoxTageHandler());
                                      setchargeBoxId(r?.chargeboxid);
                                      return;
                                    }
                                    if (h?.component === "Group") {
                                      dispatch(GroupUserHandler());
                                      setGroupId(r?.groupid);
                                      return;
                                    }
                                    dispatch(customerPolicyModelHandler());
                                    setUserId(r?.idtag_fk);
                                  }}
                                  color="neutral-primary"
                                  className="mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center"
                                >
                                  <FontAwesomeIcon
                                    icon={["far", "edit"]}
                                    className="font-size-sm"
                                  />
                                </Button>
                              </td>
                            ) : h?.special === "reservation/created_by" ? (
                              <td className="text-center">
                                {r?.idtag_fk?.idtag_fk?.[0]?.email
                                  ? r?.idtag_fk?.idtag_fk?.[0]?.email
                                  : "-"}
                              </td>
                            ) : h?.special === "chargebox/qr" ? (
                              <td className="text-center">
                                {r?.chargeboxid ? (
                                  <a
                                    download
                                    target="_blank"
                                    onClick={(e) =>
                                      download(
                                        `${process.env.REACT_APP_QR_CODE}${r?.chargeboxid}.png`
                                      )
                                    }
                                    className="btn btn-primary text-white hover-scale-sm neutral-primary"
                                  >
                                    Preview
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </td>
                            ) : h?.special === "userId/email" ? (
                              <td className="text-center">
                                  {r?.userId?.email ? r?.userId?.email : "-"}
                              </td>
                            ): h?.special === "userId/name" ? (
                              <td className="text-center">
                                  {r?.userId?.name ? `${r?.userId?.name}` : "-"}
                              </td>
                            ) : h?.special === "rate/StartTime" ? (
                              <td className="text-center">
                                {moment
                                  .utc(
                                    `${r?.profilestart} ${r?.profilestarttime}`
                                  )

                                  .local()
                                  .format("HH:mm:ss")}
                              </td>
                            ) : (
                              h?.special === "rate/EndTime" && (
                                <td className="text-center">
                                  {moment
                                    .utc(
                                      `${r?.profileend} ${r?.profileendtime}`
                                    )

                                    .local()
                                    .format("HH:mm:ss")}
                                </td>
                              )
                            )
                          ) : h?.startCase ? (
                            <td
                              className="text-center"
                              style={{ border: "1px solid red" }}
                            >
                              {r[h?.fieldName]
                                ? _.startCase(r[h?.fieldName])
                                : "-"}
                            </td>
                          ) : h.date ? (
                                <td className="text-center">
                                  {moment(r[h?.fieldName]).format("YYYY-MM-DD")} {
                                    moment(
                                      r[h?.fieldName]
                                    )
                                    .format("HH:mm:ss")}
                            </td>
                          ) : h.time ? (
                            <td className="text-center">
                              {`${moment
                                .utc(
                                  `${r?.reserveDate.split("T")[0]} ${
                                    r?.reserveStartTime
                                  }`
                                )

                                .local()
                                .format("HH:mm:ss")} |
                                ${moment
                                  .utc(
                                    `${r?.reserveDate.split("T")[0]} ${
                                      r?.reserveExpiryTime
                                    }`
                                  )
                                  .local()
                                  .format("HH:mm:ss")}`}
                            </td>
                          ) : h.drawer ? (
                            <td
                              className="text-center"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                openDrawer(r?.chargeboxid, r?.idtag_fk);
                              }}
                            >
                              {r[h?.fieldName] ? r[h?.fieldName] : "-"}
                            </td>
                          ) : (
                            <td className="text-center">
                              {r[h?.fieldName] ? r[h?.fieldName] : "-"}
                              {h?.fieldName === "tag_multiplier" && "%"}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}

          <div className="divider" />
          <div className="divider" />
          <div className="p-3 d-flex justify-content-center">
            <Pagination className="pagination-primary">
              <PaginationItem disabled={!previous}>
                <PaginationLink
                  previous
                  onClick={(e) => {
                    onNextHandler("previous", previous);
                  }}
                >
                  <FontAwesomeIcon icon={["fas", "chevron-left"]} />
                </PaginationLink>
              </PaginationItem>

              {_.chunk([...Array(total).keys()], 10).map((pig, i) => {
                return (
                  <PaginationItem active={currentPage === i}>
                    <PaginationLink
                      onClick={(e) => {
                        if (currentPage > i) {
                          onNextHandler("exact", previous, i);
                        } else {
                          onNextHandler("exact", next, i);
                        }
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem disabled={!next}>
                <PaginationLink
                  previous
                  onClick={(e) => {
                    onNextHandler("next", next);
                  }}
                >
                  <FontAwesomeIcon icon={["fas", "chevron-right"]} />
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
