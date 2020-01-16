import React, { useState } from 'react';
import Chart from 'react-apexcharts';

interface Props {
  pollData: any;
}

const DonutChart: React.FC<Props> = props => {
  console.log('my props', props);

  const options = props.pollData.map((option: any) => option.option);

  const chartData = props.pollData.map((option: any) => option.voteCount);

  console.log('our options', options);

  const donutOptions = {
    options: {
      plotOptions: {
        pie: {
          expandOnClick: true,
          donut: {
            labels: {
              show: true,
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
        labels: {
          colors: '#fff'
        }
      }
    },
    series: chartData,
    labels: options
  };

  console.log('donutOptions', donutOptions);

  const [donutData, setDonutData] = useState({
    donutOptions
  });
  console.log('donutData', donutData);

  return (
    <Chart
      options={donutOptions.options}
      series={donutOptions.series}
      type="donut"
      width="380"
    />
  );
};

export default DonutChart;
