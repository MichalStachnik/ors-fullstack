import React from 'react';
import { Link } from 'react-router-dom';
import Chart from 'react-apexcharts';
import DonutChart from '../../components/DonutChart/DonutChart';

import './Polls.css';

interface Props {}

interface State {
  polls: any;
}

class Polls extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      polls: []
    };
  }

  componentDidMount = async () => {
    const res = await fetch('/polls');
    const { polls } = await res.json();
    console.log('polls', polls);
    this.setState({
      polls
    });
  };

  componentDidUpdate = async () => {};

  render() {
    if (this.state.polls.length === 0) return <h1>Loading...</h1>;
    return (
      <div>
        {this.state.polls.map((poll: any, index: number) => {
          return (
            <div className="card text-white bg-primary my-3" key={index}>
              <div className="card-header">
                <div className="card-question">
                  <h3>{poll.question}</h3>
                  <p className="text-info">{poll.date}</p>
                </div>
                <Link to={`/polls/${poll._id}`}>
                  <button className="btn btn-info my-2 my-sm-0" type="submit">
                    Vote
                  </button>
                </Link>
              </div>
              <div className="card-body">
                <div className="card-options">
                  {poll.options.map((option: any, index: number) => {
                    return (
                      <p className="card-text" key={index}>
                        <span className="badge badge-info badge-pill">
                          {option.voteCount}
                        </span>
                        {option.option}
                      </p>
                    );
                  })}
                </div>
                <div className="card-chart">
                  <DonutChart pollData={poll.options} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Polls;
