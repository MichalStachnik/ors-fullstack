import { NextPage, NextPageContext } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout';
import Filter from '../components/Filter';

// const DonutChart = dynamic(() => import('../components/DonutChart'), {
//   loading: () => <p>i'm loading...</p>
// });
// Have to dynamically import the donut chart because it
// requires the document object which does not exist on the server
const DonutChart = dynamic(() => import('../components/DonutChart'), {
  ssr: false
});

import Poll from '../models/Poll';

interface Props {
  polls: any;
  searchValue: string;
  url: any;
}

const Index: NextPage = (props: any) => {
  let [searchValue, setSearchValue] = useState('');
  let [polls, setPolls] = useState(props.polls);

  const inputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(evt.target.value);
  };

  const inputClearHandler = () => {
    setSearchValue('');
  };

  const handleFilter = (dropdownOption: number) => {
    // Sort this.state.polls
    const sortedPolls = [...props.polls];
    if (dropdownOption === 1) {
      // Newest selected
      sortedPolls.sort((a, b) => {
        const aDate = Date.parse(a.date);
        const bDate = Date.parse(b.date);
        return bDate - aDate;
      });
      // Oldest first
    } else if (dropdownOption === 2) {
      sortedPolls.sort((a, b) => {
        const aDate = Date.parse(a.date);
        const bDate = Date.parse(b.date);

        return aDate - bDate;
      });
    }
    // Most votes
    else if (dropdownOption === 3) {
      sortedPolls.sort((a, b) => {
        return b.totalVotes - a.totalVotes;
      });
    }
    // Least votes
    else if (dropdownOption === 4) {
      sortedPolls.sort((a, b) => a.totalVotes - b.totalVotes);
    }

    setPolls(sortedPolls);
  };

  const formatDate = (date: string) => {
    // Get milliseconds from string
    const milliseconds = Date.parse(date);
    // Construct a new date object from milliseconds
    const theDate = new Date(milliseconds);

    const theDay = theDate.getDate();
    const theMonth = theDate.getMonth() + 1;
    const theYear = theDate.getFullYear();
    return `${theMonth}/${theDay}/${theYear}`;
  };

  return (
    <Layout onInputChanged={inputChangeHandler} searchValue={searchValue}>
      <div>
        <Filter handleFilter={handleFilter} />
        {polls
          .filter((poll: Poll, index: number) => {
            return poll.question
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          })
          .map((poll: Poll, index: number) => {
            return (
              <div className="card text-white bg-dark my-3" key={index}>
                <div className="card-header">
                  <div className="card-question">
                    <h3>{poll.question}</h3>
                    <p className="text-primary">{formatDate(poll.date)}</p>
                  </div>
                  <div className="card-tags">
                    {poll.isGeoEnabled && (
                      <div>
                        <i
                          className="fa fa-globe-americas"
                          title="This poll requires geolocation"
                        ></i>
                        <span>This poll requires geolocation</span>
                      </div>
                    )}
                  </div>
                  <Link href={`/polls/${poll._id}`}>
                    <div className="card-vote">
                      <button
                        className="btn btn-secondary my-2 my-sm-0"
                        type="button"
                      >
                        Vote
                      </button>
                    </div>
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
      <style jsx>
        {`
          .card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .card-tags {
            position: relative;
            flex: 0.3;
          }

          .card-tags span {
            position: absolute;
            bottom: -40px;
            right: 50%;
            width: 100%;
            max-width: 280px;
            background: var(--light);
            color: var(--dark);
            padding: 8px;
            text-align: center;
            font-size: 0.7rem;
            line-height: 0.7rem;
            opacity: 0;
            border-radius: 5px;
            transition: 0.3s all ease-in-out;
          }

          .card-tags span::before {
            content: '';
            border: 5px solid;
            border-bottom-color: var(--light);
            position: absolute;
            right: calc(50% - 10px);
            top: -10px;
          }

          .card-tags i {
            cursor: unset;
          }

          .card-tags i:hover + span {
            opacity: 1;
          }

          .card-body {
            display: flex;
            justify-content: space-between;
          }

          .card-options {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: right;
          }

          .card-text {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 60%;
          }

          .card-chart {
            max-width: 50%;
            display: flex;
            align-items: center;
          }

          @media only screen and (max-width: 414px) {
            .Polls .card-header {
              padding: 0.5rem 1rem;
              display: grid;
              grid-template-areas:
                'question tags'
                'question vote';
              grid-template-columns: 3fr 1fr;
              grid-template-rows: 1fr 2fr;
            }

            .card-header .card-question {
              grid-area: question;
            }

            .card-header .card-tags {
              grid-area: tags;
              place-self: center;
            }

            .card-header .card-vote {
              grid-area: vote;
              place-self: center;
            }

            .card-body {
              padding: 1rem;
            }

            .card-options {
              width: 50%;
            }

            .card-text {
              width: 100%;
            }

            .card-chart {
              max-width: 40%;
            }
          }
        `}
      </style>
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:5000/polls');
  const { polls } = await res.json();

  return {
    polls,
    searchValue: ''
  };
};

export default Index;
