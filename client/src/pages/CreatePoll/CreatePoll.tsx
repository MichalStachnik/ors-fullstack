import React, { useState, useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

import './CreatePoll.css';

const CreatePoll: React.FC = () => {
  const userContext = useContext(UserContext);

  const [pollData, setPollData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: ''
  });

  let { question, option1, option2, option3 } = pollData;

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPollData({
      ...pollData,
      [evt.target.name]: evt.target.value
    });
  };

  // const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
  //   console.log('select changed with', evt.target.name, evt.target.value);
  //   setPollData({
  //     ...pollData,
  //     optionValue: parseInt(evt.target.value)
  //   });
  // };

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    console.log(pollData);
    console.log('userContext in CreatePoll', userContext.getUser());

    const userToken = userContext.getUser();

    console.log('userTOKEN!', userToken);
    console.log('userTOKEN!', typeof userToken);

    let options = [
      { option: option1 },
      { option: option2 },
      { option: option3 }
    ];

    const postObj = {
      question,
      options
    };

    try {
      const res = await fetch('/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${userToken}`
        },
        body: JSON.stringify(postObj)
      });

      console.log(res);

      const data = await res.json();
      console.log('data:', data);

      // context.changeSearchValue('');
      userContext.setUser(data.token);
    } catch (error) {
      console.log('error registering user');
      console.error(error.message);
      throw error;
    }
  };

  return (
    <div className="my-3">
      <form className="my-3" onSubmit={evt => onSubmit(evt)}>
        <fieldset>
          <legend>Create Poll</legend>
          <div className="form-group">
            <label htmlFor="question">Question</label>
            <input
              type="input"
              className="form-control"
              id="question"
              aria-describedby="questionHelp"
              placeholder="Enter question"
              required
              name="question"
              value={question}
              onChange={evt => onChange(evt)}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="exampleSelect1">Number of options:</label>
            <select
              value={optionValue}
              onChange={evt => onSelectChange(evt)}
              className="form-control"
              id="optionSelect"
              name="OPTION!!"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
            </select>
          </div> */}

          <div className="form-group">
            <label htmlFor="question">Option 3</label>
            <input
              type="input"
              className="form-control"
              id="option1"
              aria-describedby="questionHelp"
              placeholder="Enter option"
              required
              name="option1"
              value={option1}
              onChange={evt => onChange(evt)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="question">Option 2</label>
            <input
              type="input"
              className="form-control"
              id="option2"
              aria-describedby="questionHelp"
              placeholder="Enter option"
              required
              name="option2"
              value={option2}
              onChange={evt => onChange(evt)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="question">Option 3</label>
            <input
              type="input"
              className="form-control"
              id="option3"
              aria-describedby="questionHelp"
              placeholder="Enter option"
              required
              name="option3"
              value={option3}
              onChange={evt => onChange(evt)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreatePoll;
