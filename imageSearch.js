var https = require("https");

var getImage = function(query, callback) {

	var options = {
		"host": "ajax.googleapis.com",
		"path": "/ajax/services/search/images?v=1.0&q=" + query,
		"method": "GET",
		"headers": {
			"user-agent": "node.js"
		}
	}

	var request = https.request(options, function(response) {
		var body = "";

		response.on("data", function(chunk) {
			body += chunk.toString("utf8");
		});

		response.on("end", function() {
			var json = JSON.parse(body);

			var image = json.responseData.results[0];

			callback(image);
		});

	});
	request.end();

}

module.exports.getImage = getImage;

