function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path + "?preventCache=" + new Date(), true);
    xhr.send();
}

var state = 0;

function stages(hero_overlay, img_dom, next_text) {
	var found = heroes_list.findIndex(function(element) {
		return element['action'] == (state-1);
	});
	if (found != -1) {
		console.log(heroes_list[found]);
		var dom = document.getElementById(heroes_list[found]['hero'].toLowerCase()+'_img_overlay');
		if (dom) {
			dom.src = 'images/'+hero_overlay;
		}
		document.getElementById(img_dom).src = settings['local_images_path'] + heroes_list[found]['img'].substring(heroes_list[found]['img'].lastIndexOf('/')+1);
	}
	document.getElementById('selection-text').innerHTML = next_text;
}

function clearData() {
	for (var key in heroes_list) {
		var dom = document.getElementById(heroes_list[key]['hero'].toLowerCase() + '_text_overlay' );
		if (dom) {
			dom.innerHTML = '';
		}
	}
};

var bottom_html = '';

function showBanRates() {
	
	bottom_html = '';
	
	for (var key in heroes_list) {
		var dom = document.getElementById(heroes_list[key]['hero'].toLowerCase() + '_text_overlay' );
		if (dom) {
			// if already picked, ignore
			if ('action' in heroes_list[key]) continue;
			
			var br = '';
			//if ('top_winrate' in list[key]) wr = '🍏';
			if ('top_banrate' in heroes_list[key]) br = '🚫';
			dom.innerHTML = '<span class="emoji">'+ br +'</span><br> WR: ' + heroes_list[key]['synergies']['winRate'] + '%<br>BR: ' + heroes_list[key]['synergies']['banRate'] + '%';
		}
	}
	
	var sorted_ban_list = heroes_list;
	
	sorted_ban_list.sort(function(a,b){
		return b['synergies']['banRate'] - a['synergies']['banRate'];
	});
	
	bottom_html += '<div class="chart_caption">Most banned heroes:</div>';
	
	for (var key in sorted_ban_list) {
		var image_src = settings['local_images_path'] + sorted_ban_list[key]['img'].substring(sorted_ban_list[key]['img'].lastIndexOf('/')+1);

		bottom_html += '<div class="chart_div"><div class="chart_image"><img src="' + image_src + '" /></div><div class="chart_bar_div"><div class="chart_bar" style="height:'+heroes_list[key]['synergies']['banRate']+'%">'+heroes_list[key]['synergies']['banRate']+'</div></div></div>';
	}
	
	document.getElementById("info_footer").innerHTML = bottom_html;
	
};

function showWinRates() {
	for (var key in heroes_list) {
		var dom = document.getElementById(heroes_list[key]['hero'].toLowerCase() + '_text_overlay' );
		if (dom) {
			// if already picked, ignore
			if ('action' in heroes_list[key]) continue;
			
			var wr = '';
			if ('top_winrate' in heroes_list[key]) wr = '🍏';
			//if ('top_banrate' in heroes_list[key]) br = '🚫';
			dom.innerHTML = '<span class="emoji">'+ wr +'</span><br> WR: ' + heroes_list[key]['synergies']['winRate'] + '%<br>BR: ' + heroes_list[key]['synergies']['banRate'] + '%';
		}
	}
};

function showCounters(pick_order) {
	let h = '';
	for (var k in heroes_list) {
		if (heroes_list[k]['action'] == pick_order) h = heroes_list[k]['hero'];
	}
	
	var counters = heroes_list.map(function(elem) {
		for (var s in elem['synergies']['playingAgainst']) {
			if (elem['synergies']['playingAgainst'][s]['key'] == h) {
				let temp = elem['synergies']['playingAgainst'][s];
				temp['hero'] = elem['hero'];
				return temp;
			}
		}
		//heroes_list[elem]['synergies']['playingAgainst']
		return {};
	});
	
	console.log('showing counters to ' + h);
	//console.log(counters);
	
	for (var key in heroes_list) {
		if ('action' in heroes_list[key]) continue;
		
		var dom = document.getElementById(heroes_list[key]['hero'].toLowerCase() + '_text_overlay' );
		if (dom) {
			let wr = pr = '';
			// check counter winrate
			for (var s in counters) {
				if (counters[s]['hero'] == heroes_list[key]['hero']) {
					wr = counters[s]['winRate'];
					pr = counters[s]['pickRate'];
				}
			}
			dom.innerHTML = 'WR: ' + wr + '%<br>PR: ' + pr + '%';
		}
	}
	
	//TODO: add emoji to highest winrate
};


function showSynergies(pick_order) {
	let h = '';
	for (var k in heroes_list) {
		if (heroes_list[k]['action'] == pick_order) h = heroes_list[k]['hero'];
	}
	
	console.log('showing synergies with ' + h);
	
	for (var key in heroes_list) {
		if ('action' in heroes_list[key]) continue;
		
		var dom = document.getElementById(heroes_list[key]['hero'].toLowerCase() + '_text_overlay' );
		if (dom) {
			let wr = pr = '';
			// check counter winrate
			for (var s in heroes_list[key]['synergies']['playingWith']) {
				if (heroes_list[key]['synergies']['playingWith'][s]['key'] == h) {
					wr = heroes_list[key]['synergies']['playingWith'][s]['winRate'];
					pr = heroes_list[key]['synergies']['playingWith'][s]['pickRate'];
				}
			}
			dom.innerHTML = 'WR: ' + wr + '%<br>PR: ' + pr + '%';
		}
	}
	
	//TODO: add emoji to highest winrate
};

function stepState() {
	state++;
	//console.log('this state: ' + state);
	clearData();
	
	switch(mode) {
		case 'ranked': 
		{
			switch(state) {
				case 1: 
					document.getElementById('selection-text').innerHTML = 'player 1 selecting 1st ban';
					showBanRates();
				break;
				case 2:
					stages('ban_small_blue.png', 'left-ban1-img', 'player 2 selecting 2nd ban');
					showBanRates();
				break;
				case 3: 
					stages('ban_small_red.png', 'right-ban2-img', 'player 2 selecting 3rd ban');
					showBanRates();
				break;
				case 4: 
					stages('ban_small_red.png', 'right-ban1-img', 'player 1 selecting 4th ban');
					showBanRates();
				break;
				case 5: 
					stages('ban_small_blue.png', 'left-ban2-img', 'player 1 selecting hero');
					showWinRates();
				break;
				case 6: 
					stages('blue.png', 'player_1_pick_img', 'player 2 selecting hero');
					showCounters(5);
				break;
				case 7: 
					stages('red.png', 'player_2_pick_img', 'player 3 selecting hero');
					showSynergies(6);
				break;
				case 8: 
					stages('red.png', 'player_3_pick_img', 'player 4 selecting hero');
					showCounters(7);
				break;
				case 9:
					stages('blue.png', 'player_4_pick_img', 'player 5 selecting hero');
					showSynergies(8);					
				break;
				case 10: 
					stages('blue.png', 'player_5_pick_img', 'player 6 selecting hero');	
					showCounters(9);					
				break;
				case 11: 
					stages('red.png', 'player_6_pick_img', 'player 7 selecting hero');
					showSynergies(10);					
				break;
				case 12: 
					stages('red.png', 'player_7_pick_img', 'player 8 selecting hero');
					showCounters(11);
				break;
				case 13: 
					stages('blue.png', 'player_8_pick_img', 'player 9 selecting hero');
					showSynergies(12);
				break;
				case 14: 
					stages('blue.png', 'player_9_pick_img', 'player 10 selecting hero');
					showCounters(13);					
				break;
				case 15: 
					stages('red.png', 'player_10_pick_img', 'Swap heroes ...');		
				break;
			}
		}
		break;
		case 'competitive': 
		{
			switch(state) {
				case 1: 
					document.getElementById('selection-text').innerHTML = 'blue team banning';
					showBanRates();
				break;
				case 2:
					stages('ban_small_blue.png', 'left-ban1-img', 'red team banning');
					showBanRates();
				break;
				case 3: 
					stages('ban_small_red.png', 'right-ban3-img', 'blue team selecting hero');	
					showWinRates();
				break;
				case 4: 
					stages('blue.png', 'player_1_pick_img', 'red team selecting hero');
					showCounters(3);
				break;
				case 5:
					stages('red.png', 'player_2_pick_img', 'red team selecting hero');
					showSynergies(4);
				break;
				case 6: 
					stages('red.png', 'player_3_pick_img', 'blue team selecting hero');	
					showCounters(5);
				break;
				case 7: 
					stages('blue.png', 'player_4_pick_img', 'red team banning');
					showBanRates();
				break;
				case 8:
					stages('ban_small_blue.png', 'right-ban2-img', 'blue team banning');
					showBanRates();
				break;
				case 9: 
					stages('ban_small_red.png', 'left-ban2-img', 'red team selecting hero');
					showCounters(6);
				break;
				case 10:
					stages('red.png', 'player_6_pick_img', 'blue team selecting hero');
					showCounters(9);
				break;
				case 11: 
					stages('blue.png', 'player_5_pick_img', 'blue team selecting hero');
					showSynergies(10);
				break;
				case 12: 
					stages('blue.png', 'player_8_pick_img', 'red team selecting hero');
					showCounters(11);
				break;
				case 13: 
					stages('red.png', 'player_7_pick_img', 'blue team banning');
					showBanRates();
				break;
				case 14: 
					stages('ban_small_blue.png', 'left-ban3-img', 'red team banning');
					showBanRates();
				break;
				case 15: 
					stages('ban_small_red.png', 'right-ban1-img', 'blue team selecting hero');
					showCounters(12);
				break;
				case 16: 
					stages('blue.png', 'player_9_pick_img', 'red team selecting hero');
					showCounters(15);
				break;
				case 17: 
					stages('red.png', 'player_10_pick_img', 'swap heroes ...');
				break;
			}
		}
		break;
	}
}

let heroes_list = [];

function loadHeroes() {
	loadJSON( settings['merged_heroes_json'],
		function(data){
			//console.log(data);
			//console.log('latest hero is: ' + settings['latest_hero']);
			
			// push latest hero to top of new list
			var list = [];
			var found = data.find(function(element) {
			  return element['hero'].toLowerCase() == settings['latest_hero'];
			});
			if (found != undefined) {
				list.push(found);
			}
			
			// add everything else
			for (var key in data) {
				if (data[key]['hero'].toLowerCase() != settings['latest_hero']) list.push(data[key]);
//				console.log(key, obj[key]);
			}
			console.log(list);
			heroes_list = list;
			
			// add divs for the heroes to the dom
			var heroes_div = document.getElementById('heroes');
			for (var key in list) {
				
				var image_src = settings['local_images_path'] + list[key]['img'].substring(list[key]['img'].lastIndexOf('/')+1);
				//console.log(image_src);

				var this_hero = document.createElement('div');
				this_hero.setAttribute('id', list[key]['hero'].toLowerCase());
				//this_hero.setAttribute('class', 'hidden');
				this_hero.addEventListener("mousedown", function() {
					//console.log('banana' + this.id);
					// do stuff
					var hero_name = this.id;
					
					var found = heroes_list.findIndex(function(element) {
						return element['hero'].toLowerCase() == hero_name;
					});
					//console.log(found);
					if (found != -1) {
						if (heroes_list[found]['action'] == undefined) {
							heroes_list[found]['action'] = state;
							stepState();
						}
					}
					//console.log(heroes_list);
				});
				this_hero.addEventListener("mouseover", function() {
					document.getElementById("info_footer").innerHTML = "hoovering on " + this.id;
					//TODO: list this hero top synergies and counters
				});				
				this_hero.addEventListener("mouseout", function() {
					document.getElementById("info_footer").innerHTML = bottom_html;
				});

				var this_hero_img = document.createElement('img');
				this_hero_img.setAttribute('id', list[key]['hero'].toLowerCase() + '_img' );
				this_hero_img.setAttribute('src', image_src );
				this_hero.appendChild(this_hero_img);
				var this_hero_img_overlay = document.createElement('img');
				this_hero_img_overlay.setAttribute('id', list[key]['hero'].toLowerCase() + '_img_overlay' );
				this_hero_img_overlay.setAttribute('src', 'images/blank.png' );
				this_hero_img_overlay.setAttribute('class', 'hero_img_overlay' );
				this_hero.appendChild(this_hero_img_overlay);
				heroes.appendChild(this_hero);
				var this_hero_text_overlay = document.createElement('div');
				this_hero_text_overlay.setAttribute('id', list[key]['hero'].toLowerCase() + '_text_overlay' );
				this_hero_text_overlay.setAttribute('class', 'hero_text_overlay' );
				
				/*var wr = br = '';
				if ('top_winrate' in list[key]) wr = '🍏';
				if ('top_banrate' in list[key]) br = '🚫';
				this_hero_text_overlay.innerHTML = 'WR: ' + list[key]['synergies']['winRate'] + '%' + wr + '<br>BR: ' + list[key]['synergies']['banRate'] + '%' + br;*/
				this_hero.appendChild(this_hero_text_overlay);
				heroes.appendChild(this_hero);
			}
			
			stepState();
			
		},
		function(err){ console.log(err); });
}

var settings;
var mode = 'ranked'; // default mode when there is no query argument on url

window.onload = function() {
	// get mode
	mode = getParameterByName('mode')?getParameterByName('mode'):mode;
	
	if (mode == 'ranked') {
		// hide unused ban slots
		document.getElementById('left-ban3').style.display = 'none';
		document.getElementById('right-ban3').style.display = 'none';
	} else {
		// hide player number order that only makes sense in ranked and not competitive
		for (var i=1; i<=10; i++) {
			document.getElementById('player_'+i+'_number').style.display = 'none';
		}
	}
	
	// load settings
	loadJSON("settings.json",
		function(data){ 
			settings = data;
			// we have our settings now, lets load the heroes
			loadHeroes();
		},
		function(err){ console.log(err); });
}

function ranked_5v5_button() {
	window.location.href = window.location.href = window.location.pathname + '?mode=ranked';
}

function competitive_5v5_button() {
	window.location.href = window.location.href = window.location.pathname + '?mode=competitive';
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}