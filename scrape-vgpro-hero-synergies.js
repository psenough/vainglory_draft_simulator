
var settings = require("./settings.json");
var list_heroes = require(settings['list_of_heroes_json']);

var htmlToJson = require('html-to-json');
var fs = require('fs');
var util = require('util');
var request = require('request');
var url = require("url");
var path = require("path");
var async = require("async");

let list = [];
if (process.argv.length > 2) {
	process.argv.forEach(function (val, index, array) {
	  //console.log(index + ': ' + val);
	  if (index >= 2) {
		list = getDetails(val, function(){ console.log(val + ' yata!'); });
	  }
	});
} else {
	async.eachSeries(list_heroes, function iteratee(val, callback) {
		getDetails(val['hero'], function(){ console.log(val['hero'] + ' yata!'); callback(); });
	});
}

function getDetails(hero_name, cb) {
	var list = list_heroes.filter( 
		function(elem, index, array){
			//console.log(elem);
		  return elem['hero'].toLowerCase() == hero_name.toLowerCase();
	});
	console.log(list);
	
	if (list.length == 1) {
		//var hero_url = settings['main_url'] + list[0]['url']; //vaingloryfire wiki
		var hero_url = settings['vgpro_api_url'] + list[0]['hero'];
		console.log(hero_url);

		var url = hero_url;
		var filename = settings['local_images_path'] + list[0]['hero'].toLowerCase() + '-synergies.json';
		//var cb = function(){ console.log(list[0]['hero'] + ' yata!');}
		
		var options = {
		  url: url,
		  headers: {
			'User-Agent': 'request'
		  }
		};
		
		function callback(error, response, body) {
		  if (!error && response.statusCode == 200) {
			fs.writeFileSync(filename, body, 'utf-8');
			cb();
		  }
		}
		
		request(options, callback);	
	}
}