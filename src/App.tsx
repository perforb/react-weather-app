import React, {useState} from "react";
import './App.css';
import {Title} from "./components/Title";
import {Results} from "./components/Results";
import {Loading} from "./components/Loading";
import {Form} from "./components/Form";

export type ResultsStateType = {
  country: string
  cityName: string
  temperature: string
  conditionText: string
  icon: string
}

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [results, setResults] = useState<ResultsStateType>({
    country: "",
    cityName: "",
    temperature: "",
    conditionText: "",
    icon: "",
  });
  const getWeather = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}&aqi=no`)
      .then(res => res.json())
      .then(data => {
        setResults({
          country: data.location.country,
          cityName: data.location.name,
          temperature: data.current.temp_c,
          conditionText: data.current.condition.text,
          icon: data.current.condition.icon,
        });
        setCity("");
        setLoading(false);
      })
      .catch(err => alert(`An error occurred. Please retry. ${err}`));
  };
  return (
    <div className="wrapper">
      <div className="container">
        <Title/>
        <Form setCity={setCity} getWeather={getWeather} city={city}/>
        {loading ? <Loading/> : <Results results={results}/>}
      </div>
    </div>
  );
}

export {App};
