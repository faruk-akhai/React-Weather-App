import { useState } from "react";
import "./App.css";
import { TbTemperatureCelsius } from "react-icons/tb";
import { TbTemperatureFahrenheit } from "react-icons/tb";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
export default function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState("");
  const handleSearch = () => {
    if (city == "") {
      alert("please Enter City/Country Name");
      return;
    }
    setCity("");
    fetch(
      "https://api.weatherapi.com/v1/current.json?key=133673ad932a4d2094a101525242501&q=" +
        city,
    )
      .then((d) => {
        d.json()
          .then((res) => {
            res?.error?.message === "No matching location found."
              ? (setData(""),
                alert(
                  "you have entered wrong city name please enter valid city name to see the weather information",
                ))
              : setData(res);
          })
          .catch((e) => {
            console.log("Inside the another catch", e);
          });
      })
      .catch((e) => {
        console.log("Inside the Catch", e);
      });
  };
  return (
    <>
      <div id="mainContainer">
        <h1 style={{ color: "white" }}>Weather Finder</h1>
        <div id="container">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyUp={(e) => (e.key == "Enter" ? handleSearch() : null)}
            placeholder="Enter city/country "
          ></input>
          <IoSearch className="io" onClick={handleSearch} />
        </div>
        {data && (
          <div id="dataContainer">
            <div id="first">
              <img src={data.current.condition.icon} />
            </div>
            <div id="second">
              {data.location.name},{" "}
              {data.location.country.substring(0, 2).toUpperCase()}
            </div>
            <div className="icon third">
              {data.current.temp_c}
              <TbTemperatureCelsius />
            </div>
            <div className="icon third">
              {data.current.temp_f}
              <TbTemperatureFahrenheit />
            </div>
            <div id="text">({data.current.condition.text})</div>
            <div className="icon">
              <FaWind />{" "}
              <span id="wind"> Wind: {data.current.wind_kph} km/h </span>
            </div>
            <div className="c1">
              <div className="icon">
                <WiHumidity fontSize="25px" /> Humidity: {data.current.humidity}
                %
              </div>
            </div>
            <div className="c2">
              <div className="icon">
                <FaTemperatureThreeQuarters fontSize="18px" />{" "}
                <span className="temp">
                  {" "}
                  FeelsLike: {data.current.feelslike_c}
                </span>
                <TbTemperatureCelsius />
              </div>
              <div className="icon">
                <FaTemperatureThreeQuarters fontSize="18px" />{" "}
                <span className="temp">
                  FeelsLike: {data.current.feelslike_f}
                </span>
                <TbTemperatureFahrenheit />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
