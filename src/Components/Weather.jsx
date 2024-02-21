import "./Style.css";
import { Button } from "semantic-ui-react";
import moment from "moment";
import SpeechSynthesisComponent from "./SpeechSynthesis";

export function Weather({ weatherData }) {
  const refresh = () => {
    window.location.reload();
  };

  return (
    <div className="root">
      <div className="main" 
      style={{backgroundImage:`url(${"https://remeng.rosselcdn.net/sites/default/files/dpistyles_v2/rem_16_9_1124w/2023/02/26/node_459922/13050551/public/2023/02/26/B9733585574Z.1_20230226162236_000%2BGGUMA1787.1-0.jpg?itok=BgnN-F-m1677426044"})`}}>
        <div className="top">
          <p className="header">{weatherData?.name}</p>
          <Button
            className="button"
            inverted
            color="blue"
            circular
            icon="refresh"
            onClick={refresh}
          />
        </div>
        <div className="flex">
          <p className="day">
            {moment().format("dddd")}, <span>{moment().format("LL")}</span>
          </p>
          <p className="description">{weatherData?.weather[0].main}</p>
        </div>

        <div className="flex">
          <p className="temp" >Temprature: {weatherData?.main?.temp} &deg;C</p>
          <p className="temp" style={{color : "black",fontWeight:"bold"}}>Humidity: {weatherData?.main?.humidity} %</p>
        </div>

        <div className="flex">
          <p className="sunrise-sunset" >
            Sunrise:{" "}
            {new Date(weatherData?.sys?.sunrise * 1000).toLocaleTimeString(
              "en-IN"
            )}
          </p>
          <p className="sunrise-sunset" style={{color : "black",fontWeight:"bold"}}>
            Sunset:{" "}
            {new Date(weatherData?.sys?.sunset * 1000).toLocaleTimeString(
              "en-IN"
            )}
          </p>
        </div>
        <SpeechSynthesisComponent
          textToSpeak={`The weather data is as follows: Date is ${new Date(
            weatherData?.sys?.sunset * 1000
          ).toLocaleTimeString('en-IN')}, Temperature is ${weatherData?.main?.temp}, Humidity is ${weatherData?.main?.humidity}`}
        />

      </div>  
    </div>
  );
}
