import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';

import {
  SearchBox,
  getLocation,
  Locationinfo,
  ResidentContainer,
} from './Container.js';

function randomLocation() {
  let res = Math.floor(Math.random() * 108);
  return res;
}

function App() {
  const [query, setQuery] = useState(randomLocation);
  const [residents, setResidents] = useState([]);
  const [dimension, setDimension] = useState('');
  const [nameLocation, setNameLocation] = useState('');
  const [type, setType] = useState('');
  const [hasdata, sethastdata] = useState(false);
  // Llamar a locattion RickandMortyapi
  useEffect(() => {
    if (query) {
      const URL_locations = `https://rickandmortyapi.com/api/location/${query}`;
      const promise = getLocation(URL_locations);
      promise.then((res) => {
        setResidents(res.data.residents);
        setDimension(res.data.dimension);
        setNameLocation(res.data.name);
        setType(res.data.type);
        sethastdata(true);
      });
    }
  }, [query]);

  let residentsArray = [];
  if (hasdata) {
    if (residents.length > 10) {
      setResidents(residents.slice(0, 10));
    }
    residentsArray = residents.map((value) => (
      <ResidentContainer url={value} />
    ));
  }

  const handleSearchResidents = (value) => {
    setQuery(value);
  };

  return (
    <div className="App">
      <h1 className= "text-center text-justify">
        Rick y morty API 
      </h1>
      <SearchBox handleSearch={handleSearchResidents} />
      <div className="card mb-3 col-12 col-sm-12" id="quote-box">
      <Locationinfo
        Name={nameLocation}
        Type={type}
        Dimension={dimension}
        Residentes={residents.length}
      />
      </div>
      <div className= "row">
      {hasdata ? <>{residentsArray}</> : <div></div>}  

      </div>
    </div>
  );
}

export default App;
