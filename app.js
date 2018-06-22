const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.options({
		a: {
			demand: false,
			alias: 'address',
			describe: 'Address to fetch weather for',
			//tells yargs to always parse address as a string
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;


let defaultLocation = 'Nashville';
//if no arg supplied, defaultLocation gets passed
let encodedAddress = encodeURIComponent(argv.address || defaultLocation);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAgiCgzbfrwYUIBdTh4gnE8Lrie5tFuT8E`;

//axios knows how to automatically parse json
//get returns a promise
axios.get(geocodeUrl)
	.then((response) => {
		if (response.data.status === 'ZERO_RESULTS') {
			throw new Error('Unable to find address');
		}
		let lat = response.data.results[0].geometry.location.lat;
		let lng = response.data.results[0].geometry.location.lng;
		let weatherUrl = `https://api.darksky.net/forecast/b7dac8ad2981fc1403570b74a2bca3e3/${lat},${lng}`;
		console.log(response.data.results[0].formatted_address);
		return axios.get(weatherUrl);
	})
	.then((response) => {
		let temperature = response.data.currently.temperature;
		let apparentTemperature = response.data.currently.apparentTemperature;
		let precipProbability = response.data.daily.data[0].precipProbability
		console.log(`Currently ${temperature}, but it feels like ${apparentTemperature}`);
		if (precipProbability === 0) {
			console.log("Don't you fret the rain's somewhere else today");
		} else if (precipProbability <= .3) {
			console.log("It may rain, it may not rain, I am a weather man");
		} else if (precipProbability <= .6) {
			console.log("Likely getting that precipitation, a chance to test Mother Nature, if you feel so bold");
		} else {
			console.log('It_Gon_Rain.gif');
		}
	})
	.catch((errorObj) => {
		if (errorObj.code === 'ENOTFOUND') {
			console.log('Unable to connect to API servers');
		} else {
			console.log(errorObj.message);
		}
	});


