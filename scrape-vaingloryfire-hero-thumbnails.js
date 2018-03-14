
var settings = require("./settings.json");
var list_heroes = require(settings['list_of_heroes_json']);

var htmlToJson = require('html-to-json');
var fs = require('fs');
var util = require('util');
var request = require('request');
var url = require("url");
var path = require("path");

var download = function(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var sendReq = request.get(url);

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
};

//console.log(process.argv.length);

if (process.argv.length > 2) {
	process.argv.forEach(function (val, index, array) {
	  //console.log(index + ': ' + val);
	  if (index >= 2) {
		getThumb(val);
	  }
	});
} else {
	list_heroes.forEach(function (val, index, array) {
		getThumb(val['hero']);
	});
}

function getThumb(hero_name) {
	var list = list_heroes.filter( 
		function(elem, index, array){
			//console.log(elem);
		  return elem['hero'].toLowerCase() == hero_name.toLowerCase();
	});
	//console.log(list);
	
	if (list.length == 1) {
		console.log(settings['main_url'] + list[0]['img']);
		
		var parsed = url.parse(settings['main_url'] + list[0]['img']);
		var filename = path.basename(parsed.pathname);
		//console.log(filename);
		
		download( settings['main_url'] + list[0]['img'], settings['local_images_path'] + filename, function(){ console.log(filename + ' yata!'); });
	}
}