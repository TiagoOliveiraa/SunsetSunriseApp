import React from "react";
import { CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, Scatter } from 'recharts';

function SoloChart(props){

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
    console.log(props.sunInfo);
    
    const sunrise = convertTimeToDecimal(props.sunInfo[0].sunrise_time);
    const sunset = convertTimeToDecimal(props.sunInfo[0].sunset_time);
    const goldenHour = convertTimeToDecimal(props.sunInfo[0].golden_hour);
    const noon = (sunrise + sunset) / 2;

    const data = []
    for (let hour = Math.floor(sunrise); hour <= Math.ceil(sunset); hour += 0.5) {
        const intensity = Math.max(0, 100 - Math.abs(hour - noon) * (200 / (sunset - sunrise)));
        data.push({ hour, intensity });
    }

    const markers = [
        { hour: sunrise, label: "Sunrise", color: "#FFA500" },
        { hour: sunset, label: "Sunset", color: "#FF4500" },
        { hour: goldenHour, label: "Golden Hour", color: "#FFD700" },
    ]
    return (
        <div className="data-container">
        <h2>Chart for {props.sunInfo[0].location}</h2>
        <AreaChart width={600} height={300} data={data} className="data-chart">
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis
                dataKey="hour"
                domain={[0, 24]}
                type="number"
                tickFormatter={convertDecimalToTime}
            />
            <YAxis domain={[0, 100]} tickCount={6} label={{ value: "Solar Intensity (%)", angle: -90, position: "insideLeft" }} />
            <Tooltip formatter={(value) => `${value.toFixed(1)}%`} labelFormatter={convertDecimalToTime} />
            <Area type="monotone" dataKey="intensity" stroke="#FFD700" fill="#FFFF99" fillOpacity={0.5} name="Solar Intensity" />
        </AreaChart>
    </div>
    );
}

export default SoloChart