import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const Charts = ({ chartData, chargeboxName, durationType }) => {
  const [chart, setChart] = useState({
    series: [
      {
        name: 'Report Data',
        data: []
      }
    ],
    options: {
      chart: {
        toolbar: {
          export: {
            csv: {
              filename: chargeboxName?.toString()
            },
            svg: {
              filename: chargeboxName?.toString()
            },
            png: {
              filename: chargeboxName?.toString()
            }
          }
        },
        id: chargeboxName?.toString(),
        height: 350,
        type: 'line',
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Report',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep'
        ]
      }
    }
  });
  useEffect(() => {
    if (durationType === 'monthly') {
      setChart({
        ...chart,
        options: {
          ...chart.options,

          chart: {
            ...chart.options.chart,
            toolbar: {
              export: {
                csv: {
                  filename: chargeboxName?.toString()
                },
                svg: {
                  filename: chargeboxName?.toString()
                },
                png: {
                  filename: chargeboxName?.toString()
                }
              }
            },
            id: chargeboxName?.toString(),
            height: 350,
            type: 'line',
            zoom: {
              enabled: true
            },
            id: chargeboxName
          },
          xaxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          }
        }
      });
    } else if (durationType === 'weekly') {
      setChart({
        ...chart,
        options: {
          ...chart.options,
          chart: {
            ...chart.options.chart,
            toolbar: {
              export: {
                csv: {
                  filename: chargeboxName?.toString()
                },
                svg: {
                  filename: chargeboxName?.toString()
                },
                png: {
                  filename: chargeboxName?.toString()
                }
              }
            },
            id: chargeboxName?.toString(),
            height: 350,
            type: 'line',
            zoom: {
              enabled: true
            },
            id: chargeboxName
          },
          xaxis: {
            categories: [...Array(52).keys()].map((i) => i + 1),
            tickAmount: 52,
            labels: {
              formatter: function (value, timestamp, opts) {
                return value;
              }
            }
          }
        }
      });
    }
  }, [durationType]);

  useEffect(() => {
    setChart({
      ...chart,
      options: {
        ...chart.options,
        chart: {
          ...chart.options.chart,
          toolbar: {
            export: {
              csv: {
                filename: chargeboxName?.toString()
              },
              svg: {
                filename: chargeboxName?.toString()
              },
              png: {
                filename: chargeboxName?.toString()
              }
            }
          },
          id: chargeboxName?.toString(),
          height: 350,
          type: 'line',
          zoom: {
            enabled: true
          },
          id: chargeboxName
        }
      },
      series: [
        {
          name: `${chargeboxName} Data`,
          data: chartData.map((item) => item.value)
        }
      ]
    });
  }, [chartData]);
  return (
    <div>
      <Chart
        toolbar={chart.toolbar}
        options={chart.options}
        series={chart.series}
        type="line"
        width="100%"
      />
    </div>
  );
};

export default Charts;
