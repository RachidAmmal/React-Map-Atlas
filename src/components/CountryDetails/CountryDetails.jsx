import React from 'react'
import Information from './Information'
import { useSelector } from 'react-redux';
import CountryDetailsInfo from './CountryDetailsInfo';

const CountryDetails = ({ countryName }) => {
  const { loc } = useSelector((state)=> state.map)

  const lat = loc.lat
  const lng = loc.lng

  return <div>
      {lat !== 45 && lng !== 15 ? <CountryDetailsInfo countryName = {countryName}/> : <Information />}
    </div>;
};

export default CountryDetails