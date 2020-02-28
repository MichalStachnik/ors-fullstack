import { NextPage } from 'next';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout';

const Index: NextPage = (props: any) => {
  console.log('the props I got', props);

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
    <Layout>
      <div>
        {/* <Filter handleFilter={handleFilter} /> */}
        {props.polls
          .filter((poll: any, index: number) => {
            return poll.question
              .toLowerCase()
              .includes(props.searchValue.toLowerCase());
          })
          .map((poll: any, index: number) => {
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
                    {/* <DonutChart pollData={poll.options} />  */}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

Index.getInitialProps = async function() {
  const res = await fetch('http://localhost:5000/polls');
  const { polls } = await res.json();

  return {
    polls,
    searchValue: ''
  };
};

export default Index;
