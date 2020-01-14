import React from 'react';
import { UserContext } from '../../contexts/UserContext';

import './Poll.css';

interface Props {
  match: any;
}

interface State {
  poll: any;
}

class Poll extends React.Component<Props, State> {
  static contextType = UserContext;
  constructor(props: Props) {
    super(props);
    this.state = {
      poll: {}
    };
  }
  // userContext = useContext(UserContext);

  componentDidMount = async () => {
    console.log('this.context in componentDidMount', this.context);
    console.log(this.context.getUser());
    console.log('poll.tsx', this.props);
    // Proxy error?
    const res = await fetch(`/polls/${this.props.match.params.pollId}`);
    const data = await res.json();
    this.setState({ poll: data.poll });
  };

  handleVoteClick = async (option: any) => {
    const res = await fetch(
      `/polls/${this.props.match.params.pollId}/${option}`
    );
    console.log('res from vote click', res);
  };

  render() {
    if (!this.state.poll) return <h1>Loading...</h1>;
    // console.log('this.context.getUser()', this.context.getUser());
    console.log('this.context', this.context);
    // console.log(this.state.poll.options);
    return (
      <div className="card text-white bg-primary my-3">
        <div className="card-header">{this.state.poll.question}</div>
        <div className="card-body">
          <h4 className="card-title">lello</h4>
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
      </div>
    );
  }
}

export default Poll;
