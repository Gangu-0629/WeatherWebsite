import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Apikeys from '../Services/Apikeys';
import Dayreport from './Dayreport';
import { useLocation, useNavigate } from 'react-router';
import background from '../Assets/city1.jpg';
import load from '../Assets/WeatherIcons.gif';
import search from '../Assets/Search.png';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export default function Forecast() {
    const navigate = useNavigate();
    const location = useLocation();
    const [weather, setWeather] = useState({});
    const [city, setCity] = useState(location.state.city);
    const latitude = location.state.latitude;
    const longitude = location.state.longitude;
    const geo = location.state.usingeo;
    const [daystemp, setDaystemp] = useState(new Map());
    const [dateTime, setDateTime] = useState("");
    const [today, setToday] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const day = new Date();
        setToday((p) => p = day.getDate());
        if (geo == false) {
            collect();
        }
        else {
            collectthroughgeo();
        }
    }, []);

    const dateBuilder = (d) => {
        let months = [
            "Jan",
            "Feb",
            "Mar",
            "April",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        let days = [
            "Sun",
            "Mon",
            "Tues",
            "Wed",
            "Thur",
            "Fri",
            "Sat",
        ];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${day}, ${date} ${month} ${year}`;
    };
    const collectthroughgeo = async () => {
        setLoading(false);
        const data = await axios.get(`${Apikeys.base}forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=${Apikeys.key}`).then((res) => {
            setWeather(res.data);
            { handle(res.data) }

        }).then((res) => {
            setLoading(true);
        })
            .catch((error) => {
                toast.warning("Please enter the valid CityName");
                navigate("/");
            })
        setCity("");
    }
    const collect = async () => {
        setLoading(false);
        const data = await axios.get(`${Apikeys.base}forecast?q=${city}&units=metric&APPID=${Apikeys.key}`).then((res) => {
            setWeather(res.data);
            { handle(res.data) }

        }).then((res) => {
            setLoading(true);
        })
            .catch((error) => {
                console.log("error", error);
                toast.warning("Please enter the valid CityName");
                navigate("/");
            })
        setCity("");
    }
    function handle(weat) {
        setDaystemp(new Map(daystemp.clear()));
        weat.list.map(item => {
            const day = item.dt_txt.substring(8, 10);
            if (!daystemp.has(day)) {
                setDaystemp(new Map(daystemp.set(day, item)));
            }

        });
        setDateTime(dateBuilder(new Date()));
    }
    return (

        <>
            {

                loading != false ?

                    <div className="insidecon">
                        <div className="todaytemp">

                            <div className="maintemp">
                                <div className="CityName">
                                    <h1>{weather.city.name}</h1>
                                </div>
                                <div className="Citydetails">

                                    <h2>{dateTime}</h2>
                                    <h1>{daystemp.get(`${today}`).main.temp}<sup>o</sup> C</h1>
                                </div>

                            </div>
                            <div className="detailstemp">
                                <img src={`https://openweathermap.org/img/wn/${daystemp.get(`${today}`).weather[0].icon}@2x.png`} alt="" />
                                <h1 style={{ fontSize: "3em" }}>{daystemp.get(`${today}`).weather[0].main}</h1>
                                <div className="inputbox">
                                    <input onChange={(e) => setCity(e.target.value)} value={city} placeholder="Enter the city" type="text" />
                                    <img onClick={() => collect()} src={search} alt="" />
                                </div>
                                <h1>Temparature &nbsp; &nbsp;{JSON.stringify(daystemp.get(`${today}`).main.temp)} <sup>o</sup> C</h1>
                                <h1>Humidity &nbsp; &nbsp;{JSON.stringify(daystemp.get(`${today}`).main.humidity)}%</h1>
                                <h1>Visibility &nbsp; &nbsp;{JSON.stringify(daystemp.get(`${today}`).visibility)} mi</h1>
                                <h1>Wind Speed &nbsp; &nbsp;{JSON.stringify(daystemp.get(`${today}`).wind.speed)} Km/h</h1>

                            </div>
                        </div>
                        <div className="forecasttemp">
                            <Dayreport data={daystemp} today={today} />
                        </div>
                    </div> :
                    <>
                        <div className="loadingcont">

                            <img src={load} alt="" />
                            <h1 style={{ color: "white" }}>Loading. . .</h1>
                        </div>
                    </>
            }
        </>
    )
}
