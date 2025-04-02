import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBorderCountries } from '../../readux/bordering-countries';
import "./BordersCountries.css"
import { OrbitProgress } from 'react-loading-indicators';

const BordersCountries = () => {
    const { data } = useSelector(state => state.countryInfo);
    const dispatch = useDispatch()

    console.log(data?.borders);

    useEffect(() => {
      dispatch(fetchBorderCountries(data?.borders));
    }, [data?.borders]);

    const { countries, loading, error } = useSelector((state) => state.border);

  return (
    <div className="borders-container">
            <h2 className="title">Bordering Countries</h2>
            {loading && <OrbitProgress className="loading" variant="spokes" dense color="#1485d5" size="large" text="Loading.." textColor="" />}
            {/* {error && <p className="error">Error: {error}</p>} */}
            <div className="countriesGrid">
                {countries.map((country, index) => (
                    <div key={index} className="country-card">
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