import React from 'react';
import Chart from 'react-apexcharts';

import { UserContext } from '../../contexts/UserContext';

import './Poll.css';

interface Props {
  match: any;
}

interface State {
  poll: any;
  options?: any;
  series?: any;
  donutOptions?: any;
  labels?: any;
}

class Poll extends React.Component<Props, State> {
  static contextType = UserContext;
  constructor(props: Props) {
    super(props);
    this.state = {
      poll: {},
      donutOptions: {
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
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']
      }
    };
  }

  componentDidMount = async () => {
    const res = await fetch(`/polls/${this.props.match.params.pollId}`);
    const data = await res.json();

    const options = data.poll.options.map((option: any) => option.option);

    const chartData = data.poll.options.map((option: any) => option.voteCount);

    this.setState({
      poll: data.poll,
      donutOptions: {
        ...this.state.donutOptions,
        options: {
          labels: options
        },
        series: chartData,
        labels: options
      }
    });
  };

  handleVoteClick = async (option: any) => {
    // Send one vote
    const voteRes = await fetch(
      `/polls/${this.props.match.params.pollId}/${option}`
    );
    const voteData = await voteRes.json();

    // Get one poll
    const pollRes = await fetch(`/polls/${this.props.match.params.pollId}`);
    const pollData = await pollRes.json();

    const options = pollData.poll.options.map((option: any) => option.option);

    const chartData = pollData.poll.options.map(
      (option: any) => option.voteCount
    );
    this.setState({
      poll: pollData.poll,
      donutOptions: {
        ...this.state.donutOptions,
        options: {
          labels: options
        },
        series: chartData,
        labels: options
      }
    });
  };

  render() {
    if (!this.state.poll) return <h1>Loading...</h1>;
    return (
      <div className="card text-white bg-primary my-3">
        <div className="card-header">{this.state.poll.question}</div>
        <div className="card-body">
          <div className="card-body-left">
            {/* <h4 className="card-title">lello</h4> */}
            {this.state.poll.options?.map((option: any, index: number) => {
              return (
                <div className="option mb-3">
                  <p className="card-text" key={index}>
                    {option.voteCount} {option.option}
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => this.handleVoteClick(option.option)}
                  >
                    Vote
                  </button>
                </div>
              );
            })}
          </div>
          <Chart
            options={this.state.donutOptions.options}
            series={this.state.donutOptions.series}
            type="donut"
            // width="380"
          />
        </div>
      </div>
    );
  }
}

export default Poll;
