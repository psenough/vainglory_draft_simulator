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

function stepState() {
	state++;
	switch(state) {
		case 1: 
			document.getElementById('selection-text').innerHTML = 'player 1 selecting 1st ban';
		break;
		case 2:
			{
				var found = heroes_list.findIndex(function(element) {
					return element['action'] == (state-1);
				});
				if (found != -1) {
					console.log(heroes_list[found]);
					var dom = document.getElementById(heroes_list[found]['hero'].toLowerCase()+'_img_overlay');
					if (dom) {
						dom.src = 'images/ban_small.png';
					}
					document.getElementById('left-ban1-img').src = settings['local_images_path'] + heroes_list[found]['img'].substring(heroes_list[found]['img'].lastIndexOf('/')+1);
				}
				document.getElementById('selection-text').innerHTML = 'player 2 selecting 2nd ban';
			}
		break;
		case 3: 
			{
				var found = heroes_list.findIndex(function(element) {
					return element['action'] == (state-1);
				});
				if (found != -1) {
					console.log(heroes_list[found]);
					var dom = document.getElementById(heroes_list[found]['hero'].toLowerCase()+'_img_overlay');
					if (dom) {
						dom.src = 'images/ban_small.png';
					}
					document.getElementById('right-ban2-img').src = settings['local_images_path'] + heroes_list[found]['img'].substring(heroes_list[found]['img'].lastIndexOf('/')+1);
				}
				document.getElementById('selection-text').innerHTML = 'player 2 selecting 3rd ban';
			}
		break;
		case 4: 
			{
				var found = heroes_list.findIndex(function(element) {
					return element['action'] == (state-1);
				});
				if (found != -1) {
					console.log(heroes_list[found]);
					var dom = document.getElementById(heroes_list[found]['hero'].toLowerCase()+'_img_overlay');
					if (dom) {
						dom.src = 'images/ban_small.png';
					}
					document.getElementById('right-ban1-img').src = settings['local_images_path'] + heroes_list[found]['img'].substring(heroes_list[found]['img'].lastIndexOf('/')+1);
				}
				document.getElementById('selection-text').innerHTML = 'player 1 selecting 4th ban';
			}
		break;
		case 5: 
			{
				var found = heroes_list.findIndex(function(element) {
					return element['action'] == (state-1);
				});
				if (found != -1) {
					console.log(heroes_list[found]);
					var dom = document.getElementById(heroes_list[found]['hero'].toLowerCase()+'_img_overlay');
					if (dom) {
						dom.src = 'images/ban_small.png';
					}
					document.getElementById('left-ban2-img').src = settings['local_images_path'] + heroes_list[found]['img'].substring(heroes_list[found]['img'].lastIndexOf('/')+1);
				}
				document.getElementById('selection-text').innerHTML = 'player 1 selecting hero';
			}
		break;
		case 6: 
			{
				var found = heroes_list.findIndex(function(element) {
					return element['action'] == (state-1);
				});
				if (found != -1) {
					console.log(heroes_list[found]);
					var dom = document.getElementById(heroes_list[found]['hero'].toLowerCase());
					if (dom) {
						//todo: put unavailable icon overlay
					}
				}
				document.getElementById('selection-text').innerHTML = 'player 2 selecting hero';
			}
		break;
		case 7: 
			{
				var found = heroes_list.findIndex(function(element) {
					return element['action'] == (state-1);
				});
				if (found != -1) {
					console.log(heroes_list[found]);
					var dom = document.getElementById(heroes_list[found]['hero'].toLowerCase());
					if (dom) {
						//todo: put unavailable icon overlay
					}
				}
				document.getElementById('selection-text').innerHTML = 'player 3 selecting hero';
			}
		break;
		case 8: 
			{
				var found = heroes_list.findIndex(function(element) {
					return element['action'] == (state-1);
				});
				if (found != -1) {
					console.log(heroes_list[found]);
					var dom = document.getElementById(heroes_list[found]['hero'].toLowerCase());
					if (dom) {
						//todo: put unavailable icon overlay
					}
				}
				document.getElementById('selection-text').innerHTML = 'player 4 selecting hero';
			}
		break;
		case 9: 
			{
				var found = heroes_list.findIndex(function(element) {
					return element['action'] == (state-1);
				});
				if (found != -1) {
					console.log(heroes_list[found]);
					var dom = document.getElementById(heroes_list[found]['hero'].toLowerCase());
					if (dom) {
						//todo: put unavailable icon overlay
					}
				}
				document.getElementById('selection-text').innerHTML = 'player 5 selecting hero';
			}
		break;
		case 10: 
			{
				var found = heroes_list.findIndex(function(element) {
					return element['action'] == (state-1);
				});
				if (found != -1) {
					console.log(heroes_list[found]);
					var dom = document.getElementById(heroes_list[found]['hero'].toLowerCase());
					if (dom) {
						//todo: put unavailable icon overlay
					}
				}
				document.getElementById('selection-text').innerHTML = 'player 6 selecting hero';
			}
		break;
		case 11: 
			{
				var found = heroes_list.findIndex(function(element) {
					return element['action'] == (state-1);
				});
				if (found != -1) {
					console.log(heroes_list[found]);
					var dom = document.getElementById(heroes_list[found]['hero'].toLowerCase());
					if (dom) {
						//todo: put unavailable icon overlay
					}
				}
				document.getElementById('selection-text').innerHTML = 'player 7 selecting hero';
			}
		break;
		case 12: 
			{
				var found = heroes_list.findIndex(function(element) {
					return element['action'] == (state-1);
				});
				if (found != -1) {
					console.log(heroes_list[found]);
					var dom = document.getElementById(heroes_list[found]['hero'].toLowerCase());
					if (dom) {
						//todo: put unavailable icon overlay
					}
				}
				document.getElementById('selection-text').innerHTML = 'player 8 selecting hero';
			}
		break;
		case 13: 
			{
				var found = heroes_list.findIndex(function(element) {
					return element['action'] == (state-1);
				});
				if (found != -1) {
					console.log(heroes_list[found]);
					var dom = document.getElementById(heroes_list[found]['hero'].toLowerCase());
					if (dom) {
						//todo: put unavailable icon overlay
					}
				}
				document.getElementById('selection-text').innerHTML = 'player 9 selecting hero';
			}
		break;
		case 14: 
			{
				var found = heroes_list.findIndex(function(element) {
					return element['action'] == (state-1);
				});
				if (found != -1) {
					console.log(heroes_list[found]);
					var dom = document.getElementById(heroes_list[found]['hero'].toLowerCase());
					if (dom) {
						//todo: put unavailable icon overlay
					}
				}
				document.getElementById('selection-text').innerHTML = 'player 10 selecting hero';
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
					console.log(found);
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

window.onload = function() {
	loadJSON("settings.json",
		function(data){ 
			settings = data;
			loadHeroes();
		},
		function(err){ console.log(err); });
}