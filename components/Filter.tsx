import React, { useState } from 'react';

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
      <style jsx>{`
        .nav {
          justify-content: flex-end;
        }

        .nav-item.dropdown {
          min-width: 110px;
          text-align: center;
        }

        .nav-item .nav-link {
          color: #919191;
          width: 100%;
          padding-left: 0;
          padding-right: 0;
          cursor: pointer;
        }

        .nav-item .nav-link.dropdown-toggle::after {
          margin-left: 30%;
        }

        .nav-item.show .nav-link {
          border-radius: 0;
          background: var(--dark);
          color: var(--primary);
        }

        .nav-item.show .dropdown-menu {
          background: var(--dark);
        }

        .nav-item.show .dropdown-item {
          cursor: pointer;
          color: var(--primary);
        }

        .nav-item.show .dropdown-item:active {
          background: var(--primary);
          color: var(--light);
        }
      `}</style>
    </ul>
  );
};

export default Filter;
