
var settings = require("./settings.json");
var list_heroes = require(settings['list_of_heroes_json']);

var htmlToJson = require('html-to-json');
var fs = require('fs');
var util = require('util');
var request = require('request');
var url = require("url");
var path = require("path");

//console.log(process.argv.length);

if (process.argv.length > 2) {
	process.argv.forEach(function (val, index, array) {
	  //console.log(index + ': ' + val);
	  if (index >= 2) {
		getDetails(val);
	  }
	});
} else {
	//TODO: transform this hammering into a waterfall scheme with breathing time for server to send responses
	list_heroes.forEach(function (val, index, array) {
		getDetails(val['hero']);
	});
}

function getDetails(hero_name) {
	var list = list_heroes.filter( 
		function(elem, index, array){
			//console.log(elem);
		  return elem['hero'].toLowerCase() == hero_name.toLowerCase();
	});
	//console.log(list);
	
	if (list.length == 1) {
		//var hero_url = settings['main_url'] + list[0]['url']; //vaingloryfire wiki
		var hero_url = settings['heroes_url'] + list[0]['hero'].toLowerCase();
		console.log(hero_url);
		
		var promise = htmlToJson.request(hero_url, {
		  'hp': ['.stat-hp > div > div > h4', function ($section) {
			  //console.log($section);
			return $section.text().trim();
		  }],
		  'ep': ['.stat-ep > div > div > h4', function ($section) {
			return $section.text().trim();
		  }],
		  'atk': ['.stat-attack > div > div > h4', function ($section) {
			return $section.text().trim();
		  }],
		  'def': ['.stat-armor > div > div > h4', function ($section) {
			return $section.text().trim();
		  }],
		  'damage': ['.stat-damage > div > div > h4', function ($section) {
			return $section.text().trim();
		  }],
		  'ability_image': ['.ability > div > div > img', function ($section) {
			return $section.attr('src');
		  }],
		  'ability_title': ['.ability > div > div > h5', function ($section) {
			return $section.text().trim();
		  }],
		  'ability_desc': ['.ability > div > .mb0', function ($section) {
			return $section.text().trim();
		  }]
		}, function (err, result) {
		  console.log(result);
		  //console.log(err);
		  fs.writeFileSync(settings['local_images_path'] + list[0]['hero'].toLowerCase() + '.json', JSON.stringify(result) , 'utf-8');
		});
		
	}

}