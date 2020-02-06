import React, { useState } from 'react';

import './Filter.css';

enum DropdownOption {
  None,
  Newest,
  Oldest,
  MostVotes,
  LeastVotes
}

interface Props {
  handleFilter: any;
  //   dropdownOption: DropdownOption;
}

const Filter: React.FC<Props> = props => {
  const dropdownOption: DropdownOption = 0;

  console.log('dropdownOption');
  console.log(dropdownOption); // 0

  //   let [dropdownOption, setDropdownOption] = useState();

  const handleDropdownChange = (dropdownOption: number) => {
    // console.log('handleDropdown change fired in filter');
    // console.log(props);
    // console.log(dropdownOption);
    // setDropdownOption(dropdownOption);
    props.handleFilter(dropdownOption);
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
          Filter {dropdownOption}
        </a>
        <div className="dropdown-menu">
          <a className="dropdown-item" onClick={() => handleDropdownChange(0)}>
            Newest
          </a>
          <a className="dropdown-item" onClick={() => handleDropdownChange(1)}>
            Oldest
          </a>
          <a className="dropdown-item" onClick={() => handleDropdownChange(2)}>
            Most Votes
          </a>
          <a className="dropdown-item" onClick={() => handleDropdownChange(3)}>
            Least Votes
          </a>
        </div>
      </li>
    </ul>
  );
};

export default Filter;
