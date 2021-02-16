import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';

export const getResident = async (url) => {
  const res = await axios(url);
  return res;
};

export const ResidentInfo = ({
  name,
  img_url,
  status,
  origen,
  episodes,
  species,
}) => {
  return (
    <div className="col-12  col-sm-12 col-md-12 mt-2">
      <div className="card">
        <h3 className="card-title"> {name}</h3>
        <img className="card-img-top" src={img_url} alt={name} />
        <div className="card-body">
          <p>Status : {status}</p>
          <p>Origen : {origen}</p>
          <p>Numero de episodios: {episodes}</p>
          <p>Especie : {species}</p>
        </div>
      </div>
    </div>
  );
};

export const ResidentContainer = (url) => {
  const [residenturl, setResidenturl] = useState({});
  const [hasdata, sethasdata] = useState(false);
  useEffect(() => {
    const promise = getResident(url);
    promise.then((res) => {
      setResidenturl(res.data);
      sethasdata(true);
    });
  }, [url]);

  return (
    <div>
      {hasdata ? (
        <>
          <ResidentInfo
            name={residenturl.name}
            img_url={residenturl.image}
            status={residenturl.status}
            origen={residenturl.origin.name}
            episodes={residenturl.episode.length}
            species={residenturl.species}
          />
        </>
      ) : (
        ' '
      )}
    </div>
  );
};

export const Locationinfo = ({Name, Type, Dimension, Residentes}) => {
  return (
    <div className="card-body">
      <h3>Nombre: {Name}</h3>
      <p>Dimension: {Dimension}</p>
      <p>Tipo: {Type}</p>
      <p># Total de Residentes : {Residentes}</p>
    </div>
  );
};

export const SearchBox = ({handleSearch}) => {
  const [serchLocation, SetsearchLocation] = useState('');
  return (
    <div
      className="card "
      id="quote-box"
    >
      <div className="card-body">
        <input onChange={(e) => SetsearchLocation(e.target.value)}></input>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => handleSearch(serchLocation)}
        >
          Buscar{' '}
        </button>
      </div>
    </div>
  );
};

export const getLocation = async (URL) => {
  const res = await axios(URL);
  return res;
};
