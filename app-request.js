const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			//tells yargs to always parse address as a string
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

//callback function will only return one of errorMessage/results
geocode.geocodeAddress(argv.a, (errorMessage, results) => {
	if (errorMessage) {
		console.log(errorMessage);
	} else {
		console.log(results.address);
		weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
			if (errorMessage) {
				console.log(errorMessage);
			} else {
				console.log(`Currently ${weatherResults.temperature} degrees, but it feels like ${weatherResults.apparentTemperature}`);
			}
	  });
	}
});





