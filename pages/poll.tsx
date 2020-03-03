import { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import fetch from 'isomorphic-unfetch';

// import Spinner from '../../components/Spinner/Spinner';
const DonutChart = dynamic(() => import('../components/DonutChart'), {
  ssr: false
});
// import PollMap from '../../components/PollMap';

// import { UserContext } from '../../contexts/UserContext';

import Layout from '../components/Layout';

import PollModel from '../models/Poll';

interface Props {
  pollData?: PollModel;
  url?: any;
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

const Poll: NextPage<Props> = ({ pollData, url }) => {
  let [poll, setPoll] = useState(pollData);

  console.log('in poll.tsx poll', poll);

  //   const options = poll.options.map((option: any) => option.option);

  //   const chartData = poll.options.map((option: any) => option.voteCount);
  //   const voteCount = poll.options.map((option: any) => option.voteCount);

  //   console.log('options', options);
  //   console.log('chartData', voteCount);

  let isLoading, userHasVoted, userToken;

  return (
    <Layout onInputChanged={() => null} searchValue={''}>
      <div>
        <Link href="/">
          <button type="button" className="btn btn-outline-secondary mt-3">
            Back
          </button>
        </Link>
        <div className="card text-white bg-dark my-3">
          <div className="card-header">
            <div className="question">
              <h4>{poll.question}</h4>
            </div>
            {/* {userToken && (
            <div className="likes-container">
              <div className="likes">
                <span>Liked: {poll.likes}</span>
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
          )} */}
          </div>
          <div className="card-body">
            {isLoading ? (
              //   <Spinner />
              <div>loading</div>
            ) : (
              <div className="card-body-left">
                {poll.options?.map((option: any, index: number) => {
                  return (
                    <div className="option mb-3" key={index}>
                      <p className="card-text" key={index}>
                        <span className="badge badge-primary badge-pill">
                          {option.voteCount}
                        </span>
                        {option.option}
                      </p>
                      {!userHasVoted && userToken && (
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
              <DonutChart pollData={poll.options} />
              {/* {poll.isGeoEnabled && <PollMap voters={poll.voters} />} */}
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
                value={''}
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

        {poll.comments?.map((comment: any, index: number) => {
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
    </Layout>
  );
};

Poll.getInitialProps = async ({ query }) => {
  const res = await fetch(`http://localhost:5000/polls/${query.pollId}`);
  const data = await res.json();

  return {
    pollData: data.poll,
    url: null
  };
};

export default Poll;
