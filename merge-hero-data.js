
var settings = require("./settings.json");
var list_heroes = require(settings['list_of_heroes_json']);

var htmlToJson = require('html-to-json');
var fs = require('fs');
var util = require('util');
var request = require('request');
var url = require("url");
var path = require("path");

var condensed_list = list_heroes.map(function(elem) {
	var new_elem = {};
	new_elem = elem;
	new_elem['details'] = require(settings['local_images_path'] + new_elem['hero'] + '.json');
	new_elem['synergies'] = require(settings['local_images_path'] + new_elem['hero'] + '-synergies.json');
    return new_elem;
}); 

function propComparator(prop) {
    return function(a, b) {
        return a[prop] - b[prop];
    }
}

function propComparatorInv(prop) {
    return function(a, b) {
        return b[prop] - a[prop];
    }
}

var top_winrate = condensed_list.reduce(function(prevVal,elem) {
	let size_of_list = 10;
	let newVal = prevVal;
	if (newVal.length < size_of_list) {
		newVal.push({'hero': elem['hero'], 'winrate': elem['synergies']['winRate']});
		if (newVal.length == size_of_list) newVal.sort(propComparator('winrate')); // order lowest to highest
	} else {
		for (var item in newVal) {
			//console.log(elem['synergies']['winRate'] + ' :: ' + newVal[item]['winrate']);
			if (elem['synergies']['winRate'] > newVal[item]['winrate']) {
				newVal[item] = {'hero': elem['hero'], 'winrate': elem['synergies']['winRate']}; // we are replacing the lowest on the list
				newVal.sort(propComparator('winrate')); // and reordering by value, still lowest to highest
				break;
			}
		}
	}
	return newVal;
}, []);

top_winrate.sort(propComparatorInv('winrate')); // invert order, show highest first
console.log(top_winrate);

var top_banrate = condensed_list.reduce(function(prevVal,elem) {
	let size_of_list = 10;
	//console.log('checking ' + elem['hero']);
	let newVal = prevVal;
	if (newVal.length < size_of_list) {
		newVal.push({'hero': elem['hero'], 'banrate': elem['synergies']['banRate']});
		if (newVal.length == size_of_list) newVal.sort(propComparator('banrate'));
	} else {
		for (var item in newVal) {
			//console.log(newVal[item]['hero'] + ' :: ' + elem['synergies']['banRate'] + ' :: ' + newVal[item]['banrate']);
			if (elem['synergies']['banRate'] > newVal[item]['banrate']) {
				newVal[item] = {'hero': elem['hero'], 'banrate': elem['synergies']['banRate']};
				newVal.sort(propComparator('banrate'));
				break;
			}
		}
	}
	return newVal;
}, []);

top_banrate.sort(propComparatorInv('banrate'));
console.log(top_banrate);

var condensed_list_2 = condensed_list.map(function(elem) {
	for (var item in top_winrate) {
		if (top_winrate[item]['hero'] == elem['hero']) {
			elem['top_winrate'] = true;
			break;
		}
	}
	for (var item2 in top_banrate) {
		if (top_banrate[item2]['hero'] == elem['hero']) {
			elem['top_banrate'] = true;
			break;
		}
	}
    return elem;
});


fs.writeFileSync(settings['merged_heroes_json'], JSON.stringify(condensed_list_2) , 'utf-8');
