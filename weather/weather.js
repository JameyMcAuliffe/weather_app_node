const request = require('request');

let getWeather = (lat, lng, callback) => {
	request({
		url: `https://api.darksky.net/forecast/b7dac8ad2981fc1403570b74a2bca3e3/${lat},${lng}`,
		json: true
	}, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			callback(undefined, {
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature});
		} else {
			callback('Unable to fetch weather');
		};
	});	
};

module.exports = {getWeather};
