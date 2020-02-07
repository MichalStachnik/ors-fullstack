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
    props.handleFilter(dropdownOption);
    setDropdownOption(DropdownOption[selectedOption]);
  };

  return (
    <ul className="nav nav-tabs mt-3">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {dropdownOption}
        </a>
        <div className="dropdown-menu">
          <a className="dropdown-item" onClick={() => handleDropdownChange(1)}>
            Newest
          </a>
          <a className="dropdown-item" onClick={() => handleDropdownChange(2)}>
            Oldest
          </a>
          <a className="dropdown-item" onClick={() => handleDropdownChange(3)}>
            Most Votes
          </a>
          <a className="dropdown-item" onClick={() => handleDropdownChange(4)}>
            Least Votes
          </a>
        </div>
      </li>
    </ul>
  );
};

export default Filter;
