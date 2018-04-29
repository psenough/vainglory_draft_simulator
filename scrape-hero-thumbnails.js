
var settings = require("./settings.json");
var list_heroes = require(settings['list_of_heroes_json']);

var htmlToJson = require('html-to-json');
var fs = require('fs');
var util = require('util');
var request = require('request');
var url = require("url");
var path = require("path");
var async = require("async");

if (process.argv.length > 2) {
	process.argv.forEach(function (val, index, array) {
	  //console.log(index + ': ' + val);
	  if (index >= 2) {
		getThumb(val);
	  }
	});
} else {
	async.eachSeries(list_heroes, function iteratee(val, callback) {
		getThumb(val['hero'], function(){ console.log(val['hero'] + ' yata!'); callback(); });
	});
}

function getThumb(hero_name, cb) {
	var list = list_heroes.filter( 
		function(elem, index, array){
			//console.log(elem);
		  return elem['hero'].toLowerCase() == hero_name.toLowerCase();
	});
	//console.log(list);
	
	if (list.length == 1) {
		console.log(settings['main_url'] + list[0]['img']);

		var parsed = url.parse(settings['main_url'] + list[0]['img']);
		
		var myurl = settings['main_url'] + list[0]['img'];
		var dest = settings['local_images_path'] + path.basename(parsed.pathname);
		
		var file = fs.createWriteStream(dest);
		var sendReq = request.get(myurl);

		// verify response code
		sendReq.on('response', function(response) {
			if (response.statusCode !== 200) {
				return cb('Response status was ' + response.statusCode);
			}
		});

		// check for request errors
		sendReq.on('error', function (err) {
			fs.unlink(dest);
			return cb(err.message);
		});

		sendReq.pipe(file);

		file.on('finish', function() {
			file.close(cb);  // close() is async, call cb after close completes.
		});

		file.on('error', function(err) { // Handle errors
			fs.unlink(dest); // Delete the file async. (But we don't check the result)
			return cb(err.message);
		});
	}
}