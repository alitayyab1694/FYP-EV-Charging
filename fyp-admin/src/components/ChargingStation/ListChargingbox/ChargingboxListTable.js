import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import history from "@history";
import _ from "@lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "reactstrap";

const tableColumns = [
  "Registration Status",
  "Country",
  "State",
  "City",
  "Zipcode",
  "Latitude",
  "Longitude",
  "Edit",
  "Delete",
];

export default function ChargingboxListTable({ data, deleteHandler }) {
  console.log("data", data);
  const dispatch = useDispatch();

  return (
    <>
      <div className="table-responsive">
        <Table hover striped className="text-nowrap mb-0">
          <thead className="thead-light">
            {tableColumns.map((h, ind) => (
              <th key={ind}>{h}</th>
            ))}
          </thead>
          <tbody>
            {data?.map((row, ind) => (
              <tr key={ind}>
                <td className="text-center">
                  {row?.ocpp?.registrationStatus?.value === "Active"
                    ? "Registered"
                    : "Not Registered"}
                </td>
                <td className="text-center">{row?.address?.country?.label}</td>
                <td className="text-center">{row?.address?.state?.label}</td>
                <td className="text-center">{row?.address?.city?.label}</td>
                <td className="text-center">{row?.address?.zipcode}</td>
                <td className="text-center">{row?.misc?.latitude}</td>
                <td className="text-center">{row?.misc?.longitude}</td>
                <td className="text-center">
                  <Button
                    onClick={(e) => history.push(`/chargeboxes/${row._id}`)}
                    color="neutral-primary"
                    className="mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center"
                  >
                    <FontAwesomeIcon
                      icon={["far", "edit"]}
                      className="font-size-sm"
                    />
                  </Button>
                </td>
                <td className="text-center">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteHandler(row._id);
                    }}
                    color="neutral-primary"
                    className="mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center"
                  >
                    <FontAwesomeIcon
                      icon={["fa", "trash"]}
                      className="font-size-sm"
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* <div className="divider" />
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
          </div> */}
    </>
  );
}
