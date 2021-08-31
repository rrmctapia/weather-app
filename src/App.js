import React, {useState} from 'react'
import Maxmin from './components/max_min'
const api = {
  key: "ADD YOUR OWN KEY",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather,setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json() ) // we a get a json  promise
      .then(result => {
        console.log(result);
        setWeather(result);
        setQuery('') //resets the Query to nothing
      }); // we set the promise as a result
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year} `
  }
  
  return (//Line below is an if statement
    <div className={(typeof weather.main != "undefined")
     ? ( (weather.main.temp > 16)
      ? 'app warm' 
      : 'app') 
      : 'app'}> 
      <main>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)} //getting the value of the input typed in
          value={query} //binds this value eqaul to query
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? ( //if the result is notreal!
          <div>
            <div className="location-box">
              <div className="location"> {weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date() )}</div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)} °C
                </div>
                <div className="feels_like">
                  <h1> Feels Like </h1>
                  <div className="temp">
                  {Math.round(weather.main.feels_like)} °C
                  </div>
                </div>
                <Maxmin max={Math.round(weather.main.temp_max)} min={Math.round(weather.main.temp_min)}  />
                <div className="weather"> {weather.weather[0].description} </div>
              </div>
            </div>             
          </div>
        ): ('')}
      </main>

    </div>
  );
}

export default App;
