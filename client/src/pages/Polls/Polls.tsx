import React from 'react';
import { Link } from 'react-router-dom';

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
    const data = await res.json();
    this.setState(
      {
        polls: data.polls
      },
      () => {
        console.log('polls after setting state', this.state.polls);
      }
    );
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
                {poll.question}
                <Link to={`/polls/${poll._id}`}>
                  <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                  >
                    Vote
                  </button>
                </Link>
              </div>
              <div className="card-body">
                <h4 className="card-title">lello</h4>

                {poll.options.map((option: any, index: number) => {
                  return (
                    <p className="card-text" key={index}>
                      {option.voteCount}: {option.option}
                    </p>
                  );
                })}
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Polls;
