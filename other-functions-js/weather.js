let name;
let temperatureType = 'f';
let fetchedType;

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
let date = new Date();
date.setMinutes(0, 0, 0); // Round minutes, seconds, and milliseconds to 0
let startDate = convertToISOFormat(date);
console.log(`Start Date: ${startDate}`);
let date2 = new Date();
date2.setMinutes(0, 0, 0); // Round minutes, seconds, and milliseconds to 0
date2.setHours(date.getHours() + 72);
let endDate = convertToISOFormat(date2);
console.log(`End Date: ${endDate}`);

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
}
function fetchData(type) {
    if (type === 'hourly') {
        console.log(`Fetching hourly data from URL: "https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,,precipitation_probability,weather_code,uv_index&timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}&start_hour=${startDate}&end_hour=${endDate}"`);
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,,precipitation_probability,weather_code,uv_index&timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}&start_hour=${startDate}&end_hour=${endDate}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let dataArray = [];

                /*
                *Data is stored as: time, temperature, weather code, UV index, precipitation probability
                *WMO codes: https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
                */

                for (let i = 0; i < data.hourly.time.length; i++) {
                    console.log(`Time: ${data.hourly.time[i]}, Temperature: ${data.hourly.temperature_2m[i]}, Weather Code: ${data.hourly.weather_code[i]}, UV Index: ${data.hourly.uv_index[i]}, Precipitation Probability: ${data.hourly.precipitation_probability[i]}`);

                    dataArray.push([data.hourly.time[i], data.hourly.temperature_2m[i], data.hourly.weather_code[i], data.hourly.uv_index[i], data.hourly.precipitation_probability[i]]);
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
        console.log(`Fetching daily data from URL: "https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`);
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let dataArray = [];

                /*
                *Data is stored as: day, max temperature, min temperature, weather code, precipitation sum, precipitation probability max
                *WMO codes: https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
                */

                for (let i = 0; i < data.daily.time.length; i++) {
                    console.log(`Time: ${data.daily.time[i]}, Max Temperature: ${data.daily.temperature_2m_max[i]}, Min Temperature: ${data.daily.temperature_2m_min[i]}, Weather Code: ${data.daily.weather_code[i]}, Precipitation Sum: ${data.daily.precipitation_sum[i]}, Precipitation Probability: ${data.daily.precipitation_probability_max[i]}`);

                    dataArray.push([data.daily.time[i], data.daily.temperature_2m_max[i], data.daily.temperature_2m_min[i], data.daily.weather_code[i], data.daily.precipitation_sum[i], data.daily.precipitation_probability_max[i]]);
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

getLocation();

let outputLocations = {
    todayWeatherText: document.getElementById('todayWeatherText'),
    todayLow: document.getElementById('todayLow'),
    todayHigh: document.getElementById('todayHigh'),
    todayTotalRain: document.getElementById('todayTotalRain'),
    todayMaxPrecipitationRate: document.getElementById('todayMaxPrecipitationRate'),
};

function outputData() {
    outputLocations.todayWeatherText.textContent = dailyData[0][3];
    outputLocations.todayLow.textContent = dailyData[0][2];
    outputLocations.todayHigh.textContent = dailyData[0][1];
    outputLocations.todayTotalRain.textContent = dailyData[0][4];
    outputLocations.todayMaxPrecipitationRate.textContent = dailyData[0][5];
}

setTimeout(() => {
    if (lon === undefined || lat === undefined) {
        showAlert(`Please enable location services to view weather data. When you're ready, hit the "Refetch data" button`);
    }
    else {
        fetchData('daily');
        fetchData('hourly');
    }
}, 6000);

//geocoding service

function inputGeocode(query){
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=100&language=en&format=json`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let table = document.getElementById("geocodeResult");
            table.innerHTML = ""; // Clear previous results

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
                    fetchData('daily');
                    fetchData('hourly');
                };
            });
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });
}
