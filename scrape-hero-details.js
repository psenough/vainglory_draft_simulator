
var settings = require("./settings.json");
var list_heroes = require(settings['list_of_heroes_json']);

var htmlToJson = require('html-to-json');
var fs = require('fs');
var util = require('util');
var request = require('request');
var url = require("url");
var path = require("path");
var async = require("async");

var use_vaingloryfire = true;

if (process.argv.length > 2) {
	process.argv.forEach(function (val, index, array) {
	  //console.log(index + ': ' + val);
	  if (index >= 2) {
		getDetails(val, function(){ console.log(val + ' yata!'); });
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
	//console.log(list);
	
	if (list.length == 1) {

		if (use_vaingloryfire) {
			var hero_url = settings['main_url'] + list[0]['url'] + '/abilities';
			console.log(hero_url);
			
			var promise = htmlToJson.request(hero_url, {
			  'attack_type': ['#chapter > div > table ', function ($section) {
				var kaboom = $section.text().split('\n');
				kaboom = kaboom.filter(function(a){return a !== ''});
				kaboom = kaboom.filter(function(a){return a !== '\r'});
				kaboom = kaboom.filter(function(a){return a !== '\t'});
				kaboom = kaboom.filter(function(a){return a !== '\t\r'});
				kaboom = kaboom[1].split(' ');
				return kaboom[2];
			  }],
			  'position': ['#chapter > div > table ', function ($section) {
				var kaboom = $section.text().split('\n');
				kaboom = kaboom.filter(function(a){return a !== ''});
				kaboom = kaboom.filter(function(a){return a !== '\r'});
				kaboom = kaboom.filter(function(a){return a !== '\t'});
				kaboom = kaboom.filter(function(a){return a !== '\t\r'});
				kaboom = kaboom[2].split(' ');
				return kaboom[1];
			  }],
			  'role': ['#chapter > div > table ', function ($section) {
				var kaboom = $section.text().split('\n');
				kaboom = kaboom.filter(function(a){return a !== ''});
				kaboom = kaboom.filter(function(a){return a !== '\r'});
				kaboom = kaboom.filter(function(a){return a !== '\t'});
				kaboom = kaboom.filter(function(a){return a !== '\t\r'});
				kaboom = kaboom[3].split(' ');
				return kaboom[1];
			  }],
			  'hp': ['#chapter > div > table ', function ($section) {
				var kaboom = $section.text().split('\n');
				kaboom = kaboom.filter(function(a){return a !== ''});
				kaboom = kaboom.filter(function(a){return a !== '\r'});
				kaboom = kaboom.filter(function(a){return a !== '\t'});
				kaboom = kaboom.filter(function(a){return a !== '\t\r'});
				//console.log(kaboom);
				return kaboom[5];
			  }],
			  'hp_regen': ['#chapter > div > table ', function ($section) {
				var kaboom = $section.text().split('\n');
				kaboom = kaboom.filter(function(a){return a !== ''});
				kaboom = kaboom.filter(function(a){return a !== '\r'});
				kaboom = kaboom.filter(function(a){return a !== '\t'});
				kaboom = kaboom.filter(function(a){return a !== '\t\r'});
				//console.log(kaboom);
				return kaboom[7];
			  }],
			  'ep': ['#chapter > div > table ', function ($section) {
				var kaboom = $section.text().split('\n');
				kaboom = kaboom.filter(function(a){return a !== ''});
				kaboom = kaboom.filter(function(a){return a !== '\r'});
				kaboom = kaboom.filter(function(a){return a !== '\t'});
				kaboom = kaboom.filter(function(a){return a !== '\t\r'});
				//console.log(kaboom);
				return kaboom[9];
			  }],
			  'ep_regen': ['#chapter > div > table ', function ($section) {
				var kaboom = $section.text().split('\n');
				kaboom = kaboom.filter(function(a){return a !== ''});
				kaboom = kaboom.filter(function(a){return a !== '\r'});
				kaboom = kaboom.filter(function(a){return a !== '\t'});
				kaboom = kaboom.filter(function(a){return a !== '\t\r'});
				//console.log(kaboom);
				return kaboom[11];
			  }],
			  'wp_dmg': ['#chapter > div > table ', function ($section) {
				var kaboom = $section.text().split('\n');
				kaboom = kaboom.filter(function(a){return a !== ''});
				kaboom = kaboom.filter(function(a){return a !== '\r'});
				kaboom = kaboom.filter(function(a){return a !== '\t'});
				kaboom = kaboom.filter(function(a){return a !== '\t\r'});
				//console.log(kaboom);
				return kaboom[13];
			  }],
			  'atk_speed': ['#chapter > div > table ', function ($section) {
				var kaboom = $section.text().split('\n');
				kaboom = kaboom.filter(function(a){return a !== ''});
				kaboom = kaboom.filter(function(a){return a !== '\r'});
				kaboom = kaboom.filter(function(a){return a !== '\t'});
				kaboom = kaboom.filter(function(a){return a !== '\t\r'});
				//console.log(kaboom);
				return kaboom[15];
			  }],
			  'armor': ['#chapter > div > table ', function ($section) {
				var kaboom = $section.text().split('\n');
				kaboom = kaboom.filter(function(a){return a !== ''});
				kaboom = kaboom.filter(function(a){return a !== '\r'});
				kaboom = kaboom.filter(function(a){return a !== '\t'});
				kaboom = kaboom.filter(function(a){return a !== '\t\r'});
				//console.log(kaboom);
				return kaboom[17];
			  }],
			  'shield': ['#chapter > div > table ', function ($section) {
				var kaboom = $section.text().split('\n');
				kaboom = kaboom.filter(function(a){return a !== ''});
				kaboom = kaboom.filter(function(a){return a !== '\r'});
				kaboom = kaboom.filter(function(a){return a !== '\t'});
				kaboom = kaboom.filter(function(a){return a !== '\t\r'});
				//console.log(kaboom);
				return kaboom[19];
			  }],
			  'atk_range': ['#chapter > div > table ', function ($section) {
				var kaboom = $section.text().split('\n');
				kaboom = kaboom.filter(function(a){return a !== ''});
				kaboom = kaboom.filter(function(a){return a !== '\r'});
				kaboom = kaboom.filter(function(a){return a !== '\t'});
				kaboom = kaboom.filter(function(a){return a !== '\t\r'});
				//console.log(kaboom);
				return kaboom[21];
			  }],
			  'move_speed': ['#chapter > div > table ', function ($section) {
				var kaboom = $section.text().split('\n');
				kaboom = kaboom.filter(function(a){return a !== ''});
				kaboom = kaboom.filter(function(a){return a !== '\r'});
				kaboom = kaboom.filter(function(a){return a !== '\t'});
				kaboom = kaboom.filter(function(a){return a !== '\t\r'});
				//console.log(kaboom);
				return kaboom[23];
			  }]/*, //TODO: get ability info from vaingloryfire
			  'ability_image': ['#chapter 2', function ($section) {
				  return $section.find('img').attr('src');
			  }],
			  'ability_title': ['.ability > div > div > h5', function ($section) {
				return $section.text().trim();
			  }],
			  'ability_desc': ['.ability > div > .mb0', function ($section) {
				return $section.text().trim();
			  }]*/
			}, function (err, result) {
			  console.log(result);
			  //console.log(err);
			  fs.writeFileSync(settings['local_images_path'] + list[0]['hero'].toLowerCase() + '.json', JSON.stringify(result) , 'utf-8');
			  cb();
			});
		} else {
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
			  cb();
			});
		}
		
	}

}