import axios from "axios"

const API_BASE_URL = "http://localhost:3000";

async function getSunData(inputInfo){
    const response = await fetch(`http://localhost:3000/api/v1/sun-time?location=${inputInfo.location}&date_start=${inputInfo.dateStart}&date_end=${inputInfo.dateEnd}`);
    const json = await response.json();
    return json;
}

export default getSunData;