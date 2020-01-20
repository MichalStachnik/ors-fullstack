import React, { useState } from 'react';
import Chart from 'react-apexcharts';

interface Props {
  pollData: any;
}

const DonutChart: React.FC<Props> = props => {
  const options = props.pollData.map((option: any) => option.option);

  const chartData = props.pollData.map((option: any) => option.voteCount);

  const donutOptions = {
    options: {
      plotOptions: {
        pie: {
          expandOnClick: true,
          donut: {
            labels: {
              show: false,
              name: {
                color: '#fff'
              },
              value: { color: '#fff' },
              total: { color: '#fff' }
            }
          }
        }
      },
      legend: {
        show: false,
        labels: {
          colors: '#fff'
        }
      },
      responsive: [
        {
          breakpoint: 500,
          options: {
            plotOptions: {
              pie: {
                expandOnClick: false
              }
            }
          }
        }
      ]
    },
    series: chartData,
    labels: options
  };

  // const [donutData, setDonutData] = useState({
  //   donutOptions
  // });

  return (
    <Chart
      options={donutOptions.options}
      series={donutOptions.series}
      type="donut"
      width="100%"
    />
  );
};

export default DonutChart;
