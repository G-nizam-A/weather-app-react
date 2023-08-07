import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { API_KEY, URL } from '../api';

const WeatherForm = ({ getWeather }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); 

  // to fetch suggestions based on user input
  const getSuggestions = async (value) => {
    const response = await fetch(
      `${URL}data/2.5/find?q=${value}&type=like&appid=${API_KEY}`
    );
    const data = await response.json();
    if (data && data.list) {
      return data.list.map((item) => item.name);
    }
    return [];
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const suggestions = await getSuggestions(value); // Fetch suggestions and update state
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]); //clear input
  };

  const onChange = (_, { newValue }) => {
    setValue(newValue);  // Update input value
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  const inputProps = {
    placeholder: 'Enter city name',
    value,
    onChange,
  };

  // to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim() === '') {
      setErrorMessage('Please enter a city name');
    } else {
      getWeather(value);  //to fetch weather data
      setValue('');
      setErrorMessage(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />

      <button type="submit">Get Weather</button>
      <div className="error-message">{errorMessage}</div>
    </form>
  );
};

export default WeatherForm;
