import React, { useState, useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

import './CreatePoll.css';

const CreatePoll: React.FC = () => {
  const userContext = useContext(UserContext);

  const [pollData, setPollData] = useState({
    question: '',
    isGeoEnabled: false,
    optionCount: 0,
    options: {} as any
  });

  let history = useHistory();
  let { question, isGeoEnabled, optionCount, options } = pollData;

  const onQuestionChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPollData({
      ...pollData,
      question: evt.target.value
    });
  };

  const onGeoChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPollData({
      ...pollData,
      isGeoEnabled: !isGeoEnabled
    });
  };

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPollData({
      ...pollData,
      options: {
        ...pollData.options,
        [evt.target.name]: evt.target.value
      }
    });
  };

  const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setPollData({
      ...pollData,
      optionCount: parseInt(evt.target.value)
    });
  };

  const renderOptions = () => {
    if (optionCount <= 0) return;
    let renderArray = [];

    for (let i = 0; i < optionCount; i++) {
      let val: any = pollData.options[i];

      renderArray.push(
        <div className="form-group">
          <label htmlFor="question">Option {`${i}`}</label>
          <input
            type="input"
            className="form-control text-white"
            id={`${i}`}
            aria-describedby="questionHelp"
            placeholder="Enter option"
            required
            name={`${i}`}
            value={val || ''}
            onChange={evt => onChange(evt)}
          />
        </div>
      );
    }
    return renderArray;
  };

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const userToken = userContext.getToken();

    // Create options
    let optionsArray = Object.values(pollData.options);

    let postOptions = optionsArray.map(opt => {
      return { option: opt };
    });

    const postObj = {
      question,
      isGeoEnabled,
      options: postOptions
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

      const data = await res.json();

      history.push('/');
    } catch (error) {
      console.log('error registering user');
      console.error(error.message);
      throw error;
    }
  };

  let token = userContext.getToken();
  if (token === '') {
    return <Redirect from="/create-poll" exact to="/" />;
  }

  let isSubmitDisabled = false;

  if (question.length === 0) {
    isSubmitDisabled = true;
  }
  // check all options
  for (let i = 0; i < optionCount; i++) {
    if (options[i] && options[i].length === 0) {
      isSubmitDisabled = true;
    }
  }

  return (
    <div className="my-3 text-white">
      <form
        className="my-3 p-5 container col-lg-8 border-primary card bg-dark"
        onSubmit={evt => onSubmit(evt)}
      >
        <fieldset>
          <legend>Create Poll</legend>
          <div className="form-group">
            <label htmlFor="question">Question</label>
            <input
              type="input"
              className="form-control text-white"
              id="question"
              aria-describedby="questionHelp"
              placeholder="Enter question"
              required
              name="question"
              value={question}
              onChange={evt => onQuestionChange(evt)}
            />
          </div>
          <div className="form-group">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="geoSwitch"
                checked={isGeoEnabled}
                onChange={evt => onGeoChange(evt)}
              />
              <label className="custom-control-label" htmlFor="geoSwitch">
                Enable geolocation capture of voters?
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleSelect1">Number of options:</label>
            <select
              value={optionCount}
              onChange={evt => onSelectChange(evt)}
              className="form-control text-white"
              id="optionSelect"
              name="OPTION!!"
            >
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
            </select>
          </div>

          {renderOptions()}

          <button
            type="submit"
            className="btn btn-primary float-right"
            disabled={isSubmitDisabled}
          >
            Create Poll
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreatePoll;
