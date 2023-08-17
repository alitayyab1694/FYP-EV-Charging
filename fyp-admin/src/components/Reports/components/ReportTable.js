import React from 'react';
import { Table } from 'reactstrap';

const heading = [
  'Co2 Reduction(kg)',
  'Distance Convered(km)',
  'Consumption(kW)'
];

const ReportTable = ({ row, duration }) => {
  return (
    <Table responsive className="my-2">
      <thead>
        <tr>
          {[duration === 'weekly' ? 'Week' : 'Month', ...heading].map(
            (head) => (
              <td key={head}>{head}</td>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {row.map((row, ind) => {
          return (
            <tr key={ind}>
              <td scope="row">{row.time_period ? row.time_period : 0}</td>
              <td>
                {row.total_co2_reduction
                  ? parseFloat(row.total_co2_reduction).toFixed(2)
                  : 0}
              </td>
              <td>
                {row.total_distance
                  ? parseFloat(row.total_distance).toFixed(2)
                  : 0}
              </td>
              <td>
                {row.total_consumption
                  ? parseFloat(row.total_consumption).toFixed(2)
                  : 0}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ReportTable;
