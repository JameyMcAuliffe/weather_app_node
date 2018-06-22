const request = require('request');

let geocodeAddress = (address, callback) => {

	let encodedAddress = encodeURIComponent(address);
	//1st arg is options object for configuration
	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAgiCgzbfrwYUIBdTh4gnE8Lrie5tFuT8E`,
		//converts json data to object for us
		json: true
	}, (error, response, body) => {
			if(error) {
				callback('Unable to connect to google servers');
			} else if (body.status === "ZERO_RESULTS"){
				callback('No addresses found');
			} else if (body.status === "OK") {
				//undefined as 1st arg to specify no errorMessage
				callback(undefined, {
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng
				});
			}
	});
};

module.exports = {geocodeAddress};

// b7dac8ad2981fc1403570b74a2bca3e3
