import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function Chart(props){

    console.log(props.sunInfo)

    function convertTimeToDecimal(timeString) {
        const [hours, minutes, seconds] = timeString.split(":").map(Number);
        return hours + minutes / 60 + seconds / 3600;
    }

    function convertDecimalToTime(decimal) {
        const hours = Math.floor(decimal);
        const minutes = Math.floor((decimal - hours) * 60);
        const seconds = Math.round(((decimal - hours) * 60 - minutes) * 60);
        
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    const rawData = []
    props.sunInfo.map(item => {
        rawData.push({ date: item.date, sunrise: item.sunrise_time, sunset: item.sunset_time, goldenHour: item.golden_hour })});

    const data = rawData.map(item => ({
        date: item.date,
        sunrise: item.sunrise && convertTimeToDecimal(item.sunrise),
        sunset: item.sunset && convertTimeToDecimal(item.sunset),
        goldenHour: item.goldenHour && convertTimeToDecimal(item.goldenHour),
    }));

        return (
        <div className="data-container">
        <h2>Chart for {props.sunInfo[0].location}</h2>
        <LineChart width={600} height={300} data={data} className="data-chart">
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis/>
            <Tooltip formatter={(value, name) => [convertDecimalToTime(value), name]}/>
            <Line type="monotone" dataKey="sunrise" stroke="#FFA500" name="Sunrise" />
            <Line type="monotone" dataKey="sunset" stroke="#FF4500" name="Sunset" />
            <Line type="monotone" dataKey="goldenHour" stroke="#FFD700" name="Golden Hour" />
        </LineChart>
        </div>
        );
}

export default Chart