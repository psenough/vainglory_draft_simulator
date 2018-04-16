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

function stepState() {
	state++;
	//console.log('this state: ' + state);
	switch(mode) {
		case 'ranked': 
		{
			switch(state) {
				case 1: 
					document.getElementById('selection-text').innerHTML = 'player 1 selecting 1st ban';
				break;
				case 2:
					stages('ban_small_blue.png', 'left-ban1-img', 'player 2 selecting 2nd ban');
				break;
				case 3: 
					stages('ban_small_red.png', 'right-ban2-img', 'player 2 selecting 3rd ban');
				break;
				case 4: 
					stages('ban_small_red.png', 'right-ban1-img', 'player 1 selecting 4th ban');
				break;
				case 5: 
					stages('ban_small_blue.png', 'left-ban2-img', 'player 1 selecting hero');
				break;
				case 6: 
					stages('blue.png', 'player_1_pick_img', 'player 2 selecting hero');
				break;
				case 7: 
					stages('red.png', 'player_2_pick_img', 'player 3 selecting hero');
				break;
				case 8: 
					stages('red.png', 'player_3_pick_img', 'player 4 selecting hero');
				break;
				case 9:
					stages('blue.png', 'player_4_pick_img', 'player 5 selecting hero');				
				break;
				case 10: 
					stages('blue.png', 'player_5_pick_img', 'player 6 selecting hero');				
				break;
				case 11: 
					stages('red.png', 'player_6_pick_img', 'player 7 selecting hero');				
				break;
				case 12: 
					stages('red.png', 'player_7_pick_img', 'player 8 selecting hero');
				break;
				case 13: 
					stages('blue.png', 'player_8_pick_img', 'player 9 selecting hero');				
				break;
				case 14: 
					stages('blue.png', 'player_9_pick_img', 'player 10 selecting hero');				
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
				break;
				case 2:
					stages('ban_small_blue.png', 'left-ban1-img', 'red team banning');				
				break;
				case 3: 
					stages('ban_small_red.png', 'right-ban3-img', 'blue team selecting hero');	
				break;
				case 4: 
					stages('blue.png', 'player_1_pick_img', 'red team selecting hero');	
				break;
				case 5:
					stages('red.png', 'player_2_pick_img', 'red team selecting hero');	
				break;
				case 6: 
					stages('red.png', 'player_3_pick_img', 'blue team selecting hero');	
				break;
				case 7: 
					stages('blue.png', 'player_4_pick_img', 'red team banning');
				break;
				case 8:
					stages('ban_small_blue.png', 'right-ban2-img', 'blue team banning');
				break;
				case 9: 
					stages('ban_small_red.png', 'left-ban2-img', 'red team selecting hero');
				break;
				case 10:
					stages('red.png', 'player_6_pick_img', 'blue team selecting hero');
				break;
				case 11: 
					stages('blue.png', 'player_5_pick_img', 'blue team selecting hero');
				break;
				case 12: 
					stages('blue.png', 'player_8_pick_img', 'red team selecting hero');
				break;
				case 13: 
					stages('red.png', 'player_7_pick_img', 'blue team banning');
				break;
				case 14: 
					stages('ban_small_blue.png', 'left-ban3-img', 'red team banning');
				break;
				case 15: 
					stages('ban_small_red.png', 'right-ban1-img', 'blue team selecting hero');
				break;
				case 16: 
					stages('blue.png', 'player_9_pick_img', 'red team selecting hero');
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
	loadJSON( settings['list_of_heroes_json'],
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
				//this_hero.addEventListener('touchend', function(e){
				//	e.preventDefault();
					// do stuff
				//});
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