let name;
let temperatureType = 'f';
let fetchedType;

function changeTemp(toType) {
    temperatureType = toType;
    fetchWeatherData();
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
}

let lastFetchedData = {
    today: {
        temp: 0,
    },
    tomorrow: {
        temp: 0,
    },
    dayAfterTomorrow: {
        temp: 0,
    },
};

let fetchedWeatherTimes = 0;

setInterval(() => {
    fetchedWeatherTimes = 0;
}, 10000);

function fetchWeatherData() {
    if (fetchedWeatherTimes <= 4) {
        refetchWeatherButton.disabled = true;
        refetchWeatherButton.innerHTML = "Working...";
        setTimeout(() => {
            if (refetchWeatherButton.disabled === true) {
                refetchWeatherButton.innerHTML = "Refetch weather failed. Try again.";
                refetchWeatherButton.disabled = false;
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
                fetch(url)
                    .then(response => response.json())
                    .then(data2 => {
                        fetchedType = (data2.properties.periods[0].temperatureUnit).toLowerCase();
                        console.log("Fetched Type:", fetchedType);
                        console.log("Today's data");
                        //today
                        const todayData = data2.properties.periods[0].temperature;
                        console.log(todayData);
                        lastFetchedData.today.temp = Math.round(todayData);
                        //tomorrow
                        const tomorrowData = data2.properties.periods[1].temperature;
                        console.log(tomorrowData);
                        lastFetchedData.tomorrow.temp = Math.round(tomorrowData);
                        //day after
                        const dayAfterData = data2.properties.periods[3].temperature;
                        console.log(dayAfterData);
                        lastFetchedData.dayAfterTomorrow.temp = Math.round(dayAfterData);
                        refetchWeatherButton.innerHTML = "Refetch weather";
                        refetchWeatherButton.disabled = false;
                        outputData();
                        fetchedWeatherTimes++;
                    });
                // const name = data.properties.forecast;
                // console.log("Extracted Name:", name);
            });
    }
    else{
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
}

getLocation();
