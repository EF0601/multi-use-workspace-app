let name;
let temperatureType = 'f';
let fetchedType;

function changeTemp(toType) {
    temperatureType = toType;
    outputData();
}

function convert(data) {
    if (temperatureType === 'f') {
        if (fetchedType === 'f') {
            return data;
        } else {
            return (data * 9 / 5) + 32;
        }
    } else {
        if (fetchedType === 'c') {
            return data;
        } else {
            return (data - 32) * 5 / 9;
        }
    }

}

const refetchLocationButton = document.getElementById('refetchLocationButton');
const refetchWeatherButton = document.getElementById('refetchWeatherButton');

function getLocation() {
    refetchLocationButton.disabled = true;
    refetchLocationButton.innerHTML = "Working...";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentPosition);
    }
}
let lat;
let lon;
function currentPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat, lon);
    refetchLocationButton.innerHTML = "Refetch location";
    refetchLocationButton.disabled = false;
    if (document.getElementById('todayCondition').textContent === "Loading...") {
        fetchWeatherData();
    }
}

let lastFetchedData = {
    today: {
        temp: 0,
        condition: "",
        wind: "",
        precipitation: 0,
    },
    tomorrow: {
        temp: 0,
        condition: "",
        wind: "",
        precipitation: 0,
    },
    dayAfterTomorrow: {
        temp: 0,
        condition: "",
        wind: "",
        precipitation: 0,
    },
};

let weatherLocation;

let fetchedWeatherTimes = 0;

setInterval(() => {
    fetchedWeatherTimes = 0;
}, 10000);

// function validateDateOfWeek(input) {
//     if (input > 6) {
//         return input - 7;
//     }
// }

function fetchWeatherData() {
    if (fetchedWeatherTimes <= 4) {
        refetchWeatherButton.disabled = true;
        refetchWeatherButton.innerHTML = "Working...";
        setTimeout(() => {
            if (refetchWeatherButton.disabled === true) {
                refetchWeatherButton.innerHTML = "Refetch weather failed. Try again.";
                refetchWeatherButton.disabled = false;
                outputData();
                setTimeout(() => {
                    refetchWeatherButton.innerHTML = "Refetch weather";
                }, 1000);
                console.warn("Weather fetch timed out. Retry again.");
            }
        }, 20000);
        if (lat === undefined || lon === undefined) {
            getLocation();
        }
        fetch("https://api.weather.gov/points/" + lat + "," + lon)
            .then(response => response.json())
            .then(data => {
                const url = data.properties.forecast;
                weatherLocation = data.properties.relativeLocation.properties.city + ", " + data.properties.relativeLocation.properties.state;
                document.getElementById('locationDisplay').textContent = weatherLocation;
                document.getElementById('smallLocation').textContent = weatherLocation;
                fetch(url)
                    .then(response => response.json())
                    .then(data2 => {
                        fetchedType = (data2.properties.periods[0].temperatureUnit).toLowerCase();
                        //find the day
                        const date = new Date();
                        const day = date.getDay();
                        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        document.getElementById('today').textContent = weekdays[day];
                        //today/now
                        const todayData = data2.properties.periods[0].temperature;
                        lastFetchedData.today.temp = Math.round(todayData);
                        lastFetchedData.today.condition = data2.properties.periods[0].shortForecast;
                        lastFetchedData.today.wind = data2.properties.periods[0].windSpeed;
                        lastFetchedData.today.precipitation = Number(data2.properties.periods[0].probabilityOfPrecipitation.value);

                        //find where the other data is
                        let dataLocation = [];
                        for (let i = 0; i < data2.properties.periods.length; i++) {
                            if (data2.properties.periods[i].name === weekdays[day+1]) {
                                dataLocation.push(i);
                            }
                            if (data2.properties.periods[i].name === weekdays[day+2]) {
                                dataLocation.push(i);
                            }
                        }
                        console.log(dataLocation);
                        //tomorrow
                        document.getElementById('tomorrow').textContent = weekdays[day + 1];
                        const tomorrowData = data2.properties.periods[dataLocation[0]].temperature;
                        lastFetchedData.tomorrow.temp = Math.round(tomorrowData);
                        lastFetchedData.tomorrow.condition = data2.properties.periods[dataLocation[0]].shortForecast;
                        lastFetchedData.tomorrow.wind = data2.properties.periods[dataLocation[0]].windSpeed;
                        lastFetchedData.tomorrow.precipitation = Number(data2.properties.periods[dataLocation[0]].probabilityOfPrecipitation.value);
                        //day after
                        document.getElementById('dayAfter').textContent = weekdays[day + 2];
                        console.log(dataLocation[1]);
                        const dayAfterData = data2.properties.periods[dataLocation[1]].temperature;
                        lastFetchedData.dayAfterTomorrow.temp = Math.round(dayAfterData);
                        lastFetchedData.dayAfterTomorrow.condition = data2.properties.periods[dataLocation[1]].shortForecast;
                        lastFetchedData.dayAfterTomorrow.wind = data2.properties.periods[dataLocation[1]].windSpeed;
                        lastFetchedData.dayAfterTomorrow.precipitation = Number(data2.properties.periods[dataLocation[1]].probabilityOfPrecipitation.value);
                        //reset button
                        refetchWeatherButton.innerHTML = "Refetch weather";
                        refetchWeatherButton.disabled = false;
                        outputData();
                        fetchedWeatherTimes++;
                    })
                    .catch((error) => {
                        console.error(`Could not process forecast [layer 2]: ${error}`);
                    });

                // const name = data.properties.forecast;
                // console.log("Extracted Name:", name);
            })
            .catch((error) => {
                console.error(`Could not process forecast [layer 1]: ${error}`);
            });

    }
    else {
        console.warn("Too many requests in 10 seconds.");
        refetchWeatherButton.innerHTML = "Too many requests. Try again in 10 seconds.";
        setTimeout(() => {
            refetchWeatherButton.innerHTML = "Refetch weather";
        }, 1500);
    }
}

function outputData() {
    document.getElementById('TodayTemp').textContent = Math.round(convert(lastFetchedData.today.temp)) + " " + temperatureType.toUpperCase();
    document.getElementById('TomorrowTemp').textContent = Math.round(convert(lastFetchedData.tomorrow.temp)) + " " + temperatureType.toUpperCase();
    document.getElementById('DayAfterTemp').textContent = Math.round(convert(lastFetchedData.dayAfterTomorrow.temp)) + " " + temperatureType.toUpperCase();
    document.getElementById('smallTemp').textContent = Math.round(convert(lastFetchedData.today.temp)) + " " + temperatureType.toUpperCase();

    document.getElementById('todayCondition').textContent = lastFetchedData.today.condition;
    document.getElementById('tomorrowCondition').textContent = lastFetchedData.tomorrow.condition;
    document.getElementById('dayAfterCondition').textContent = lastFetchedData.dayAfterTomorrow.condition;
    document.getElementById('smallForecast').textContent = lastFetchedData.today.condition;

    document.getElementById('todayWind').textContent = lastFetchedData.today.wind;
    document.getElementById('tomorrowWind').textContent = lastFetchedData.tomorrow.wind;
    document.getElementById('dayAfterWind').textContent = lastFetchedData.dayAfterTomorrow.wind;

    document.getElementById('todayPrecipitation').textContent = lastFetchedData.today.precipitation + "%";
    document.getElementById('tomorrowPrecipitation').textContent = lastFetchedData.tomorrow.precipitation + "%";
    document.getElementById('dayAfterPrecipitation').textContent = lastFetchedData.dayAfterTomorrow.precipitation + "%";
}

getLocation();
