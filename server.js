var fs = require("fs");
var express = require("express");
var imageSearch = require('./imageSearch');

var app = express();

app.get("/", function(request, response) {
	response.setHeader("Content-type", "text/plain");
	response.status(200).send("VIEW THE FIRST RESULT ON GOOGLE IMAGES!\nADD /:query to URL");
});

app.get("/:query", function(request, response) {
	var query = request.params.query.replace(/\s/g, '+');


	imageSearch.getImage(query, function(image) {
		var name = image.titleNoFormatting;
		var url = image.unescapedUrl

		var content = fs.readFileSync("template.html");

		content = content.toString("utf8").replace("{{PAGE_TITLE}}", name).replace("{{IMAGE_URL}}", url);

		response.setHeader("Content-type", "text/html");
		response.status(200).send(content);
	});
});

app.listen(1337, "127.0.0.1", function() {
	console.log("Server is listening! \nGo to localhost:1337/{{query}} to search google images!");
});

