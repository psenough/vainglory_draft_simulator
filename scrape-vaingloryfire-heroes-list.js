
// scrape https://www.vaingloryfire.com/vainglory/wiki/heroes for list of heroes and individual stats
// scrape https://www.vaingloryfire.com/vainglory/wiki/heroes/adagio/abilities for description

var settings = require("./settings.json");

var htmlToJson = require('html-to-json');
var fs = require('fs');
var util = require('util');

var linkParser = htmlToJson.createParser(['.card-wrap', {
	'parent': function ($doc, $) {
		return $doc.parent().attr('class');
	},
	'card': function ($doc, $) {
		var s = $doc.text();
		return s.trim();
	},
	'url': function ($doc, $) {
		return $doc.find('a[href]').attr('href');
	},
	'img': function ($doc, $) {
		return $doc.find('a[href]').find('img').attr('src');
	}
}]);

linkParser.request(settings['main_url'] + settings['path_heroes']).done(function (links) {
  //console.log(links);
  var filtered = links.filter( 
	function(elem, index, array){
		//console.log(elem);
	  return elem['parent'] == 'grid';
	});
  //console.log(filtered);
  var list_of_heroes = filtered.map(
	function(elem) {
		delete elem.parent;
		elem.hero = elem.card;
		delete elem.card;
		return elem; 
	});
	console.log(list_of_heroes);
	
	// save to .json
	fs.writeFileSync(settings['list_of_heroes_json'], JSON.stringify(list_of_heroes) , 'utf-8');
});