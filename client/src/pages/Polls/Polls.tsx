import React from 'react';
import { Link } from 'react-router-dom';

import DonutChart from '../../components/DonutChart/DonutChart';
import Spinner from '../../components/Spinner/Spinner';
import Filter from '../../components/Filter/Filter';

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
  };

  handleFilter = (dropdownOption: number) => {
    // Sort this.state.polls
    const sortedPolls = [...this.state.polls];
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

    this.setState({ polls: sortedPolls });
  };

  formatDate = (date: string) => {
    // Get milliseconds from string
    const milliseconds = Date.parse(date);
    // Construct a new date object from milliseconds
    const theDate = new Date(milliseconds);

    const theDay = theDate.getDate();
    const theMonth = theDate.getMonth() + 1;
    const theYear = theDate.getFullYear();
    return `${theMonth}/${theDay}/${theYear}`;
  };

  render() {
    if (this.state.polls.length === 0) return <Spinner />;
    return (
      <div>
        <Filter handleFilter={this.handleFilter} />
        {this.state.polls
          .filter((poll: any, index: number) => {
            return poll.question
              .toLowerCase()
              .includes(this.props.searchValue.toLowerCase());
          })
          .map((poll: any, index: number) => {
            return (
              <div className="card text-white bg-dark my-3" key={index}>
                <div className="card-header">
                  <div className="card-question">
                    <h3>{poll.question}</h3>
                    <p className="text-primary">{this.formatDate(poll.date)}</p>
                  </div>
                  <div className="card-tags">
                    {poll.isGeoEnabled && (
                      <React.Fragment>
                        <i
                          className="fa fa-globe-americas"
                          title="This poll requires geolocation"
                        ></i>
                        <span>This poll requires geolocation</span>
                      </React.Fragment>
                    )}
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
