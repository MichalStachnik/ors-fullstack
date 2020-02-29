import React from 'react';
import Chart from 'react-apexcharts';
// import Spinner from '../Spinner/Spinner';

interface Props {
  pollData: any;
}

const DonutChart: React.FC<Props> = props => {
  // if (!props.pollData) {
  //   // return <Spinner />;
  //   return <div>yo</div>;
  // }

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
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined
      },
      labels: options,
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
        },
        {
          breakpoint: 376,
          options: {
            dataLabels: {
              enabled: false
            },
            plotOptions: {
              pie: {
                expandOnClick: false
              }
            }
          }
        }
      ]
    },
    series: chartData
  };

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
