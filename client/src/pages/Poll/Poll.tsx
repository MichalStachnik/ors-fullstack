import React from 'react';
import { Link } from 'react-router-dom';
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
  commentValue: string;
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
        series: [],
        labels: []
      },
      commentValue: ''
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

  onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const comment = {
      comment: this.state.commentValue
    };

    try {
      const res = await fetch(
        `/polls/${this.props.match.params.pollId}/comment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(comment)
        }
      );

      const data = await res.json();
    } catch (error) {
      console.log('error adding comment');
      console.error(error.message);
      throw error;
    }
  };

  handleCommentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ commentValue: evt.target.value });
  };

  handleLikeClick = async () => {
    console.log('like clicked');
    const res = await fetch(`/polls/${this.props.match.params.pollId}/like`);
    const data = await res.json();
    console.log('data back on fe', data);
  };

  handleDisLikeClick = () => {
    console.log('dislike clicked');
  };

  render() {
    if (!this.state.poll) return <h1>Loading...</h1>;
    return (
      <div>
        <Link to="/">
          <button type="button" className="btn btn-outline-secondary mt-3">
            Back
          </button>
        </Link>
        <div className="card text-white bg-primary my-3">
          <div className="card-header">
            <div className="question">{this.state.poll.question}</div>
            <div className="likes">
              <i
                className="fa fa-thumbs-up"
                onClick={() => this.handleLikeClick()}
              ></i>
              <i
                className="fa fa-thumbs-down"
                onClick={() => this.handleDisLikeClick()}
              ></i>
            </div>
          </div>
          <div className="card-body">
            <div className="card-body-left">
              {/* <h4 className="card-title">lello</h4> */}
              {this.state.poll.options?.map((option: any, index: number) => {
                return (
                  <div className="option mb-3" key={index}>
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
            />
          </div>
        </div>
        <form onSubmit={evt => this.onSubmit(evt)}>
          <div className="form-group">
            <label htmlFor="commentTextarea">Add comment</label>
            <textarea
              className="form-control"
              id="commentTextarea"
              rows={3}
              value={this.state.commentValue}
              onChange={evt => this.handleCommentChange(evt)}
            ></textarea>
            <div className="button-container">
              <button type="submit" className="btn btn-outline-info mt-3">
                Post
              </button>
            </div>
          </div>
        </form>
        {this.state.poll.comments?.map((comment: any, index: number) => {
          return (
            <div className="card border-info mb-3">
              <div className="card-header"></div>
              <div className="card-body">
                <p className="card-text">{comment}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Poll;
