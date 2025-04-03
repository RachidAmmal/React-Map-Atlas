import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBorderCountries } from '../../readux/bordering-countries';
import "./BordersCountries.css"
import { OrbitProgress } from 'react-loading-indicators';
import { fetchCountryInfo } from '../../readux/country-info';
import { fetchTheCenter } from '../../readux/centering-theMap-slice';

const BordersCountries = () => {
    const { data } = useSelector(state => state.countryInfo);

    const [countryBorder, setcountryBorder] = useState("");
    
    const loading2 = useSelector((state) => state.countryInfo.loading);

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(fetchBorderCountries(data?.borders));
    }, [data?.borders, dispatch]);

    const { countries, loading } = useSelector((state) => state.border);

    useEffect(() => {
      dispatch(fetchCountryInfo(countryBorder));
      dispatch(fetchTheCenter(countryBorder));
    }, [countryBorder, dispatch]);

  return (
    <div className="borders-container">
            <h2 className="title">Bordering Countries</h2>
            {loading && <OrbitProgress className="loading" variant="spokes" dense color="#1485d5" size="large" text="Loading.." textColor="" />}
            {/* {error && <p className="error">Error: {error}</p>} */}
            <div className="countriesGrid">
                {countries.map((country, index) => (
                    <div onClick={()=> setcountryBorder(country.name)} key={index} className={loading2 ? "country-card borderCountriesEnd" : "country-card"}>
                        <img 
                            src={country.flag} 
                            alt={country.name} 
                            className="countryFlag" 
                        />
                        <p className="country-name">{country.name}</p>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default BordersCountries