import React, { useState,useEffect } from 'react'

import './Weather.css';
const Weather = () => {
const [city,setCity]=useState(null);//changes in search bar
const [search,setSearch]=useState('');//store changes after enter is pressed
const [country,setcountry]=useState('');
const [background,setBackground]=useState(1);//1-clouds 2- rain /thunderstrom
const [weather,setWeather]=useState(null);

//const
useEffect(() => {
   const fetchApi=(async()=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=2b0d9a03a75c2f4da5fbbed3e957232b`;
    const response=await fetch(url);
    const resJson= await response.json();
    
    setCity(resJson.main);
    setcountry(resJson.sys);
   if(resJson.main){
    resJson.weather.map((item, i) => (
        //console.log(item.main)
    
        setWeather(item.main)
       
    )
    )   
   }
   if(weather==='Clouds' || weather==='Clear'){
   setBackground(1);
   }
   else if(weather==='Rain' || weather==='Thunderstrom' ||weather==='Mist')
   setBackground(2);
   })
fetchApi();
// eslint-disable-next-line
}, [search,weather])

    return (
        <div className='container'>
            <div className='title'>
            <h1>Weather App </h1>
            </div>
            <div className={background===1?'box1':'box2' }>
            <br/>
            
                <div className='searchbar'>
                <h3> <center>Enter the City name: </center></h3>
                <input type="search" className="form-control" placeholder="Enter the city name" aria-label="Username" aria-describedby="basic-addon1" 

      
onChange={(event) => {

    setSearch(event.target.value)
}} />
                </div>
                <br />
              
                {(city &&country)?(
                    <>

                <div className='weather-info'>
                    <h2 className='location'>
                        <i className="fa fa-street-view fa-3x"></i>  {search}, {country.country}
                    </h2>
                    <h1 className='temp'>
                        <center>
                    {(parseInt(city.temp,10)-271.152).toFixed(2)}&#8451; ({weather})
                    </center>
                    </h1>
                    <h3 className='temp_minmax'>
                    Min: {(parseInt(city.temp_min,10)-271.152).toFixed(2)}&#8451; &nbsp;| &nbsp; Max: {(parseInt(city.temp_max,10)-271.152).toFixed(2)}&#8451; 
                    </h3>
                   
                </div>
                <div className='wave -one'></div>
                <div className='wave -two'></div>
                <div className='wave -three'></div>
                </>
                ):
           (<h3 className='no'>No data found</h3> )

                
            
            }
             
            </div>
            

        </div>

    )
}

export default Weather
