import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryInfo } from '../../readux/country-info';
import { OrbitProgress } from 'react-loading-indicators';
import './CountryDetailsInfo.css';

const CountryDetailsInfo = ({ countryName }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (countryName) {
      dispatch(fetchCountryInfo(countryName));
    }
  }, [countryName, dispatch]);
  
  const { data, loading, error } = useSelector((state) => state.countryInfo);

  if (loading) {
    return (
      <div className="loading-container">
        <OrbitProgress variant="spokes" dense color="#1485d5" size="large" text="Loading.." textColor="" />
      </div>
    );
  }

  if (error) {
    return <p className="error-text">Error fetching data!</p>;
  }

  return (
    <div className="country-container">
      <div className="country-header" >
        <h1>{data?.name?.common}</h1>
        <img src={data?.flags?.svg} alt={`Flag of ${data?.name?.common}`} className="country-flag" />
      </div>
      <div className='OfficialName'>
        <h4> 🔎 Official Name: </h4> 
        <h5>{data?.name?.official}</h5>
      </div>
      <div className="country-info-details">
        <div className="country-info">
          <p>🏙️ <strong>Capital: </strong>{data?.capital?.[0]}</p>
          <p>🗺️ <strong>Continent: </strong> {data?.region}</p>
          <p>🌍 <strong>Region: </strong> {data?.subregion}</p>
          <p>🗣️ <strong>Languages: </strong> {Object.values(data?.languages || {}).join(", ")}</p>
        </div >
        <div className="country-info">
          <p>👥 <strong>Population: </strong> {new Intl.NumberFormat().format(data?.population)} M</p>
          <p>📏 <strong>Area: </strong> {new Intl.NumberFormat().format(data?.area)} km²</p>
          <p>💰 <strong>Currency:  </strong> {Object.values(data?.currencies || {})[0]?.name} ({Object.values(data?.currencies || {})[0]?.symbol})</p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailsInfo;
