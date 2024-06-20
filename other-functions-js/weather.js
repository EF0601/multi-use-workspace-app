let name;
let temperatureType = 'celsius';
let fetchedType;
let timezone;

let dailyData;
let hourlyData;

function showAlert(message) {
    document.getElementById("alertBox").style.display = "block";
    document.getElementById("alertBoxText").textContent = message;
}

function changeTemp(toType) {
    temperatureType = toType;
    outputData();
}

function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}

function convertToISOFormat(input) {
    input = String(input).slice(4, 24);
    let array = input.split(' ');
    let month;
    let date = array[1];
    let year = array[2];
    switch (array[0]) {
        case 'Jan':
            month = '01';
            break;
        case 'Feb':
            month = '02';
            break;
        case 'Mar':
            month = '03';
            break;
        case 'Apr':
            month = '04';
            break;
        case 'May':
            month = '05';
            break;
        case 'Jun':
            month = '06';
            break;
        case 'Jul':
            month = '07';
            break;
        case 'Aug':
            month = '08';
            break;
        case 'Sep':
            month = '09';
            break;
        case 'Oct':
            month = '10';
            break;
        case 'Nov':
            month = '11';
            break;
        case 'Dec':
            month = '12';
            break;
        default:
            break;
    }
    let array2 = array[3].split(':');
    array2.pop();

    return `${year}-${month}-${date}T${array2.join(':')}`;
}
function getStartAndEndDate(){
    let date = new Date();
    date.setMinutes(0, 0, 0); // Round minutes, seconds, and milliseconds to 0
    let startDate = convertToISOFormat(convertTZ(date, timezone));
    console.log(`Start Date: ${startDate}`);
    let date2 = new Date();
    date2.setMinutes(0, 0, 0); // Round minutes, seconds, and milliseconds to 0
    date2.setHours(date.getHours() + 72);
    let endDate = convertToISOFormat(convertTZ(date2, timezone));
    console.log(`End Date: ${endDate}`);
    return [startDate, endDate];
}

function getLocation() {
    if (navigator.onLine) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(currentPosition);
        }
    }
}
let lat;
let lon;
function currentPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(`Location found successfully: latitude: ${lat}, longitude: ${lon}`);
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    getStartAndEndDate();
    fetchData('daily');
    fetchData('hourly');
}
function changeWeatherUnit(){
    if (temperatureType === 'celsius') {
        temperatureType = 'fahrenheit';
        document.getElementById('weatherUnit').textContent = 'fahrenheit';
    }
    else{
        temperatureType = 'celsius';
        document.getElementById('weatherUnit').textContent = 'celsius';
    }
    fetchData('hourly');
    fetchData('daily');
}
function fetchData(type) {
    if (fetchTimes > 3) {
        showAlert('Please wait a few seconds before fetching data again.');
    }
    else{
        fetchTimes++;
        if (type === 'hourly') {
            console.log(`Fetching hourly data from URL: "https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,,precipitation_probability,weather_code,uv_index&timezone=${timezone}&start_hour=${getStartAndEndDate()[0]}&end_hour=${getStartAndEndDate()[1]}&temperature_unit=${temperatureType}"`);
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,,precipitation_probability,weather_code,uv_index&timezone=${timezone}&start_hour=${getStartAndEndDate()[0]}&end_hour=${getStartAndEndDate()[1]}&temperature_unit=${temperatureType}`)
                .then(response => response.json())
                .then(data => {
                    let dataArray = [];

                    /*
                    *Data is stored as: time, temperature, weather code, UV index, precipitation probability
                    *WMO codes: https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
                    */

                    for (let i = 0; i < data.hourly.time.length; i++) {
                        dataArray.push([data.hourly.time[i], data.hourly.temperature_2m[i], convertWeatherCode(data.hourly.weather_code[i]), data.hourly.uv_index[i], data.hourly.precipitation_probability[i]]);
                    }
                    console.log(dataArray);
                    hourlyData = dataArray;
                    outputData();
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
        }
        else if (type === 'daily') {
            console.log(`Fetching daily data from URL: "https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=${timezone}&temperature_unit=${temperatureType}`);
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=${timezone}&temperature_unit=${temperatureType}`)
                .then(response => response.json())
                .then(data => {
                    let dataArray = [];

                    /*
                    *Data is stored as: day, max temperature, min temperature, weather code, precipitation sum, precipitation probability max
                    *WMO codes: https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
                    */

                    for (let i = 0; i < data.daily.time.length; i++) {

                        dataArray.push([data.daily.time[i], data.daily.temperature_2m_max[i], data.daily.temperature_2m_min[i], convertWeatherCode(data.daily.weather_code[i]), data.daily.precipitation_sum[i], data.daily.precipitation_probability_max[i]]);
                    }
                    console.log(dataArray);
                    dailyData = dataArray;
                    outputData();
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
        }
    }
}

function convertWeatherCode(input) {
    let weatherCondition;
    switch (input) {
        case 0:
            weatherCondition = 'Clear sky';
            break;
        case 1:
            weatherCondition = 'Scattered clouds';
            break;
        case 2:
            weatherCondition = 'Similar sky';
            break;
        case 3:
            weatherCondition = 'Forming clouds';
            break;
        case 4:
        case 5:
            weatherCondition = 'Reduced visibility';
            break;
        case 6:
        case 7:
        case 8:
            weatherCondition = 'Airborne dust';
            break;
        case 9:
            weatherCondition = 'Sandstorm';
            break;
        case 10:
            weatherCondition = 'Mist';
            break;
        case 11:
        case 12:
            weatherCondition = 'Shallow fog';
            break;
        case 13:
            weatherCondition = 'Lighting with no thunder';
            break;
        case 14:
        case 15:
        case 16:
            weatherCondition = 'Precipitation sighted';
            break;
        case 17:
            weatherCondition = 'Thunderstorm but no precipitation.';
            break;
        case 18:
        case 19:
            weatherCondition = 'Squalls';
            break;
        case 20:
        case 21:
            weatherCondition = 'Drizzle/rain';
            break;
        case 22:
        case 23:
            weatherCondition = 'Snow/rain';
            break;
        case 24:
            weatherCondition = 'Freezing rain';
            break;
        case 25:
            weatherCondition = 'Rain showers';
            break;
        case 26:
            weatherCondition = 'Snow showers';
            break;
        case 27:
            weatherCondition = 'Hail';
            break;
        case 28:
            weatherCondition = 'Fog';
            break;
        case 29:
            weatherCondition = 'Thunderstorm';
            break;
        case 30:
        case 31:
        case 32:
            weatherCondition = 'Slight Dust/sand storm';
            break;
        case 33:
        case 34:
        case 35:
            weatherCondition = 'Severe Dust/sand storm';
            break;
        case 36:
        case 37:
        case 38:
        case 39:
            weatherCondition = 'Drifting snow';
            break;
        case 40:
            weatherCondition = 'Fog at a distance';
            break;
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
            weatherCondition = 'Patchy fog';
            break;
        case 48:
        case 49:
            weatherCondition = 'Fog with rime';
            break;
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
            weatherCondition = 'Drizzle';
            break;
        case 56:
        case 57:
            weatherCondition = 'Freezing drizzle';
            break;
        case 58:
        case 59:
            weatherCondition = 'Rain & Drizzle';
            break;
        case 60:
        case 61:
        case 62:
        case 63:
        case 64:
        case 65:
            weatherCondition = 'Rain';
            break;
        case 66:
        case 67:
            weatherCondition = 'Freezing rain';
            break;
        case 68:
        case 69:
            weatherCondition = 'Rain & Drizzle';
            break;
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
            weatherCondition = 'Snow';
            break;
        case 80:
            weatherCondition = 'Slight rain showers';
            break;
        case 81:
            weatherCondition = 'Rain showers';
            break;
        case 82:
            weatherCondition = 'Heavy rain showers';
            break;
        case 83:
        case 84:
            weatherCondition = 'Rain & snow showers';
            break;
        case 85:
            weatherCondition = 'Slight snow showers';
            break;
        case 86:
            weatherCondition = 'Snow showers';
            break;
        case 87:
        case 88:
        case 89:
        case 90:
            weatherCondition = 'Hail';
            break;
        case 91:
            weatherCondition = 'Slight rain';
            break;
        case 92:
            weatherCondition = 'Rain';
            break;
        case 93:
            weatherCondition = 'Slight snow';
            break;
        case 94:
            weatherCondition = 'Snow';
            break;
        case 95:
            weatherCondition = 'Slight thunderstorms';
            break;
        case 96:
            weatherCondition = 'Thunderstorms';
            break;
        case 97:
            weatherCondition = 'Heavy thunderstorms';
            break;
        case 98:
            weatherCondition = 'Thunderstorms & dust storms';
            break;
        case 99:
            weatherCondition = 'Thunderstorms & hail';
            break;
        default:
            showAlert('Unknown weather code');
            break;
    }
    return weatherCondition;
}

let outputLocations = {
    todayWeatherText: document.getElementById('todayWeatherText'),
    todayLow: document.getElementById('todayLow'),
    todayHigh: document.getElementById('todayHigh'),
    todayTotalRain: document.getElementById('todayTotalRain'),
    todayMaxPrecipitationRate: document.getElementById('todayMaxPrecipitationRate'),
};

function outputData() {
    reverseGeocode(lat, lon);
    outputLocations.todayWeatherText.textContent = dailyData[0][3];
    outputLocations.todayLow.textContent = dailyData[0][2];
    outputLocations.todayHigh.textContent = dailyData[0][1];
    outputLocations.todayTotalRain.textContent = dailyData[0][4];
    outputLocations.todayMaxPrecipitationRate.textContent = dailyData[0][5];

    let table = document.getElementById('hourlyWeatherDisplay');
    // Clear previous results except the first row
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    hourlyData.slice(0, 24).forEach(data => {
        let row = table.insertRow();
        let timeCell = row.insertCell();
        let temperatureCell = row.insertCell();
        let weatherCell = row.insertCell();
        let uvCell = row.insertCell();
        let precipitationCell = row.insertCell();

        timeCell.textContent = new Date(data[0]).toLocaleTimeString();
        temperatureCell.textContent = data[1];
        weatherCell.textContent = data[2];
        uvCell.textContent = data[3];
        precipitationCell.textContent = data[4] + "%";
    });
    table = document.getElementById('dailyWeatherDisplay');
    // Clear previous results except the first row
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    dailyData.forEach(data => {
        let row = table.insertRow();
        let timeCell = row.insertCell();
        let temperatureCell = row.insertCell();
        let maxTemperatureCell = row.insertCell();
        let weatherCell = row.insertCell();
        let precipitationTotal = row.insertCell();
        let precipitationCell = row.insertCell();

        timeCell.textContent = data[0];
        temperatureCell.textContent = data[2];
        maxTemperatureCell.textContent = data[1];
        weatherCell.textContent = data[3];
        precipitationTotal.textContent = data[4] + 'mm';
        precipitationCell.textContent = data[5] + "%";
    });
}

//geocoding service

function inputGeocode(query){
    if (geocodeTimes > 3) {
        showAlert('Please wait a few seconds before using Geocode again.');
    }
    else{
        geocodeTimes++;
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=100&language=en&format=json`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let table = document.getElementById("geocodeResult");
                // Clear previous results except the first row
                while (table.rows.length > 1) {
                    table.deleteRow(1);
                }

                data.results.forEach(result => {
                    let row = table.insertRow();
                    let countryCell = row.insertCell();
                    let stateCell = row.insertCell();
                    let nameCell = row.insertCell();
                    let longCell = row.insertCell();
                    let latCell = row.insertCell();

                    countryCell.textContent = result.country;
                    nameCell.textContent = result.name;
                    stateCell.textContent = result.admin1;
                    longCell.textContent = result.longitude;
                    latCell.textContent = result.latitude;

                    row.onclick = () => {
                        lat = result.latitude;
                        lon = result.longitude;
                        timezone = result.timezone;
                        getStartAndEndDate();
                        fetchData('daily');
                        fetchData('hourly');
                    };
                });
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            });
    }
}

//reverse geocoding service by geoapify
function reverseGeocode(latIn, lonIn){
    let location;
    console.log(`Reverse geocoding. URL: "https://api.geoapify.com/v1/geocode/reverse?lat=${latIn}&lon=${lonIn}&apiKey=b40743d4c3074f02af86d14034780457"`);
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latIn}&lon=${lonIn}&apiKey=b40743d4c3074f02af86d14034780457`)
    .then(response => response.json())
    .then(data => {
        console.log(`Reverse geocoding result: ${data.features[0].properties.city + ", " + data.features[0].properties.country}`);
        location = data.features[0].properties.city + ", " + data.features[0].properties.country;
        document.getElementById('weatherLocation').textContent = location;
    });
}

//cool down
let fetchTimes = 0;
let geocodeTimes = 0;
setInterval(() => {
    fetchTimes = 0;
    geocodeTimes = 0;
}, 10000);
