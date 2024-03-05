import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import '../assets/css/cropinfo.css'
import { State, City } from 'country-state-city';

function CropInfo() {
  const [data, setData] = useState(null);
  const { stateName } = useParams();
  const [cityData, setCityData] = useState();
  const [city, setCity] = useState('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (stateName) {
  //       const apiKey = '579b464db66ec23bdd0000010d1f7b00c91e424e7924cf7159fd5e61';
  //       const format = 'json';

  //       try {
  //         const response = await fetch(`https://api.data.gov.in/resource/35be999b-0208-4354-b557-f6ca9a5355de?api-key=${apiKey}&format=${format}&filters[state_name]=${stateName}`);
  //         const responseData = await response.json();
  //         setData(responseData);
  //         console.log(responseData.records);
  //       } catch (error) {
  //         console.error('Error:', error);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [stateName]);

  const handleCitySelect = async () => {
    if (city) {
      const apiKey = '579b464db66ec23bdd0000010d1f7b00c91e424e7924cf7159fd5e61';
      const format = 'json';
      const cityName = encodeURIComponent(city.name.toUpperCase());
      console.log(cityName)

      try {
        const response = await fetch(`https://api.data.gov.in/resource/35be999b-0208-4354-b557-f6ca9a5355de?api-key=${apiKey}&format=${format}&filters[state_name]=${stateName}&filters[district_name]=${cityName}`);
        const responseData = await response.json();
        setData(responseData);
        console.log(responseData.records);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    const selectedState = State.getStatesOfCountry('IN').find(state => state.name === stateName);
    if (selectedState) {
      setCityData(City.getCitiesOfState('IN', selectedState.isoCode));
    }
  }, [stateName]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData])

  const cropNames = [
    "wheat",
    "rice",
    "corn",
    "barley",
    "Oil palm",
    "potato",
    "tomato",
    "Sugar beet",
    "Void Seeds",
    "Maize"
  ];

  return (
    <div>
      <Navbar />
      <section className="light">
        <div className=" py-2">
          <div className="h1 text-center text-dark" id="pageHeaderTitle">{stateName}</div>

          <select id="city-dropdown" value={city?.name} onChange={(e) => setCity(cityData.find(s => s.name === e.target.value))}>
            {cityData?.map(city => (
              <option key={city.isoCode} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          <button onClick={handleCitySelect}>Find</button>

          {data && data.records.map((record, index) => (
            <article className={`postcard light ${index % 4 === 0 ? 'blue' : index % 4 === 1 ? 'green' : index % 4 === 2 ? 'red' : 'yellow'}`} key={index}
              style={{ margin: 'auto', marginBottom: '2rem' }}
            >
              <a className="postcard__img_link" href="/">
                <img className="postcard__img" src={`https://source.unsplash.com/random/900×700/?${cropNames[index % cropNames.length]}`} alt="Image Title" style={{ maxHeight: '280px' }} />
              </a>
              <div className="postcard__text t-dark">
                <h1 className={`postcard__title ${index % 4 === 0 ? 'blue' : index % 4 === 1 ? 'green' : index % 4 === 2 ? 'red' : 'yellow'}`}>
                  <a href="#">{record.district_name}</a>
                </h1>
                <div className="postcard__subtitle small">
                  <p>Crop Year: {record.crop_year}</p>
                  <p>Season: {record.season}</p>
                  <p>Crop: {record.crop}</p>
                  <p>Area: {record.area_}</p>
                  <p>Production: {record.production_}</p>
                </div>
                <div className="postcard__bar"></div>
                {/* <ul className="postcard__tagbox">
                  <li className="tag__item"><i className="fas fa-tag mr-2"></i>Podcast</li>
                  <li className="tag__item"><i className="fas fa-clock mr-2"></i>55 mins.</li>
                  <li className={`tag__item play ${index % 4 === 0 ? 'blue' : index % 4 === 1 ? 'green' : index % 4 === 2 ? 'red' : 'yellow'}`}>
                    <a href="#"><i className="fas fa-play mr-2"></i>Play Episode</a>
                  </li>
                </ul> */}
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}

export default CropInfo;
