import React, { useState } from 'react';

import './Filter.css';

interface Props {
  handleFilter: any;
}

type DropdownOptionType = { [index: number]: string };

const Filter: React.FC<Props> = props => {
  const DropdownOption: DropdownOptionType = {
    0: 'Filter',
    1: 'Newest',
    2: 'Oldest',
    3: 'Most Votes',
    4: 'Least Votes'
  };

  let [dropdownOption, setDropdownOption] = useState(DropdownOption[0]);

  const handleDropdownChange = (selectedOption: number) => {
    props.handleFilter(selectedOption);
    setDropdownOption(DropdownOption[selectedOption]);
  };

  return (
    <ul className="nav nav-tabs mt-3">
      <li className="nav-item dropdown">
        <span
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {dropdownOption}
        </span>
        <div className="dropdown-menu">
          <span
            className="dropdown-item"
            onClick={() => handleDropdownChange(1)}
          >
            Newest
          </span>
          <span
            className="dropdown-item"
            onClick={() => handleDropdownChange(2)}
          >
            Oldest
          </span>
          <span
            className="dropdown-item"
            onClick={() => handleDropdownChange(3)}
          >
            Most Votes
          </span>
          <span
            className="dropdown-item"
            onClick={() => handleDropdownChange(4)}
          >
            Least Votes
          </span>
        </div>
      </li>
    </ul>
  );
};

export default Filter;
