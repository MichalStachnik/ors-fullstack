import React from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../../components/Spinner/Spinner';
import DonutChart from '../../components/DonutChart/DonutChart';
import PollMap from '../../components/PollMap/PollMap';

import { UserContext } from '../../contexts/UserContext';

import './Poll.css';

interface Props {
  match: any;
}

interface State {
  isLoading: boolean;
  poll: any;
  options?: any;
  series?: any;
  donutOptions?: any;
  labels?: any;
  commentValue: string;
  userHasVoted: boolean;
  userToken: string;
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
      commentValue: '',
      userHasVoted: false,
      userToken: '',
      isLoading: false
    };
  }

  componentDidMount = async () => {
    const res = await fetch(`/polls/${this.props.match.params.pollId}`);
    const data = await res.json();

    const options = data.poll.options.map((option: any) => option.option);

    const chartData = data.poll.options.map((option: any) => option.voteCount);

    // Check if the users ID is in the voters array of the poll
    const userId = this.context.getUserId();

    let userHasVoted = data.poll.voters.filter(
      (voter: any) => voter.voterId === userId
    );

    userHasVoted = userHasVoted.length > 0;

    const userToken = this.context.getToken();

    this.setState({
      poll: data.poll,
      donutOptions: {
        ...this.state.donutOptions,
        options: {
          labels: options
        },
        series: chartData,
        labels: options
      },
      userHasVoted,
      userToken
    });
  };

  handleVoteClick = async (option: any) => {
    // Start spinner
    this.setState({ isLoading: true });

    let lat, lon;
    let payload = {};

    // Check if geo is enabled
    if (this.state.poll.isGeoEnabled) {
      // Get window navigator
      if (!navigator.geolocation) {
        console.log('geolocation not available');
      } else {
        navigator.geolocation.getCurrentPosition(
          success => {
            lat = success.coords.latitude;
            lon = success.coords.longitude;

            payload = {
              lat,
              lon
            };

            // Send vote
            fetch(`/polls/${this.props.match.params.pollId}/vote/${option}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${this.state.userToken}`
              },
              body: JSON.stringify(payload)
            })
              .then(voteRes => voteRes.json())
              .then(data => {
                // Get one poll
                fetch(`/polls/${this.props.match.params.pollId}`)
                  .then(pollRes => pollRes.json())
                  .then(pollData => {
                    const options = pollData.poll.options.map(
                      (option: any) => option.option
                    );

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
                      },
                      userHasVoted: true
                    });
                  })
                  .catch(err => console.warn('error getting single poll', err));
              })
              .catch(err => console.warn('error', err));

            this.setState({ isLoading: false });
          },
          error => {
            console.error('error fetching geodata', error);
          }
        );
      }
    }
    // Vote is not geo enabled
    else {
      // Send vote
      const voteRes = await fetch(
        `/polls/${this.props.match.params.pollId}/vote/${option}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${this.state.userToken}`
          },
          body: JSON.stringify(payload)
        }
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
        },
        userHasVoted: true
      });
    }
  };

  // POST a comment
  onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const username = this.context.getUsername();
    const comment = {
      commentAuthor: username,
      commentText: this.state.commentValue
    };

    try {
      const res = await fetch(
        `/polls/${this.props.match.params.pollId}/comment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${this.state.userToken}`
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
    const res = await fetch(`/polls/${this.props.match.params.pollId}/like`);
    const data = await res.json();

    this.setState({
      poll: {
        ...this.state.poll,
        likes: data.poll.likes
      }
    });
  };

  handleDisLikeClick = async () => {
    const res = await fetch(`/polls/${this.props.match.params.pollId}/dislike`);
    const data = await res.json();

    this.setState({
      poll: {
        ...this.state.poll,
        dislikes: data.poll.dislikes
      }
    });
  };

  render() {
    if (!this.state.poll) return <Spinner />;
    return (
      <div>
        <Link to="/">
          <button type="button" className="btn btn-outline-secondary mt-3">
            Back
          </button>
        </Link>
        <div className="card text-white bg-dark my-3">
          <div className="card-header">
            <div className="question">{this.state.poll.question}</div>
            <div className="likes-container">
              <div className="likes">
                <span>Liked: {this.state.poll.likes}</span>
                <i
                  className="fa fa-thumbs-up fa-lg"
                  onClick={() => this.handleLikeClick()}
                ></i>
              </div>
              <div className="dislikes">
                <span>Disliked: {this.state.poll.dislikes}</span>
                <i
                  className="fa fa-thumbs-down fa-lg"
                  onClick={() => this.handleDisLikeClick()}
                ></i>
              </div>
            </div>
          </div>
          <div className="card-body">
            {this.state.isLoading ? (
              <Spinner />
            ) : (
              <div className="card-body-left">
                {this.state.poll.options?.map((option: any, index: number) => {
                  return (
                    <div className="option mb-3" key={index}>
                      <p className="card-text" key={index}>
                        <span className="badge badge-primary badge-pill">
                          {option.voteCount}
                        </span>
                        {option.option}
                      </p>
                      {!this.state.userHasVoted && this.state.userToken && (
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => this.handleVoteClick(option.option)}
                        >
                          Vote
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            <div className="card-body-right">
              <DonutChart pollData={this.state.poll.options} />
              {this.state.poll.isGeoEnabled && (
                <PollMap voters={this.state.poll.voters} />
              )}
            </div>
          </div>
        </div>
        <div className="card text-white bg-dark mb-3">
          <form className="container" onSubmit={evt => this.onSubmit(evt)}>
            <div className="form-group mt-3">
              <label htmlFor="commentTextarea">Add comment</label>
              <textarea
                className="form-control text-white"
                id="commentTextarea"
                rows={3}
                value={this.state.commentValue}
                onChange={evt => this.handleCommentChange(evt)}
              ></textarea>
              <div className="button-container">
                <button type="submit" className="btn btn-outline-primary mt-3">
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>

        {this.state.poll.comments?.map((comment: any, index: number) => {
          return (
            <div
              key={index}
              className="card border-primary text-white bg-dark mb-3"
            >
              <div className="card-header">
                <span>{comment.author}</span>
                <span className="text-primary">{comment.date}</span>
              </div>
              <div className="card-body">
                <p className="card-text">{comment.comment}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Poll;
