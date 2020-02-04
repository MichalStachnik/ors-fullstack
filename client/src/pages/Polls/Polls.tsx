import React from 'react';
import { Link } from 'react-router-dom';

import DonutChart from '../../components/DonutChart/DonutChart';
import Spinner from '../../components/Spinner/Spinner';

import './Polls.css';

interface Props {
  searchValue: string;
}

interface State {
  polls: any[];
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
    this.setState({
      polls
    });
    console.log('the polls we have in /polls');
    console.log(polls);
  };

  render() {
    if (this.state.polls.length === 0) return <Spinner />;
    return (
      <div>
        {this.state.polls
          .filter((poll: any, index: number) =>
            poll.question.includes(this.props.searchValue)
          )
          .map((poll: any, index: number) => {
            return (
              <div className="card text-white bg-dark my-3" key={index}>
                <div className="card-header">
                  <div className="card-question">
                    <h3>{poll.question}</h3>
                    <p className="text-primary">{poll.date}</p>
                  </div>
                  <Link to={`/polls/${poll._id}`}>
                    <button
                      className="btn btn-secondary my-2 my-sm-0"
                      type="button"
                    >
                      Vote
                    </button>
                  </Link>
                </div>
                <div className="card-body">
                  <div className="card-options">
                    {poll.options.map((option: any, index: number) => {
                      return (
                        <p className="card-text" key={index}>
                          <span className="badge badge-primary badge-pill">
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
