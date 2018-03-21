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
			
			// add divs for the heroes to the dom
			var heroes_div = document.getElementById('heroes');
			for (var key in list) {
				
				var image_src = settings['local_images_path'] + list[key]['img'].substring(list[key]['img'].lastIndexOf('/')+1);
				console.log(image_src);

				//TODO: assign click / tap behavior to them
				var this_hero = document.createElement('div');
				this_hero.setAttribute('id', list[key]['hero'].toLowerCase());
				//this_hero.setAttribute('class', 'hidden');
				this_hero.addEventListener("mousedown", function() {
					// do stuff
				});
				this_hero.addEventListener('touchend', function(e){
					e.preventDefault();
					// do stuff
				});
				var this_hero_img = document.createElement('img');
				this_hero_img.setAttribute('id', list[key]['hero'].toLowerCase() + '_img' );
				this_hero_img.setAttribute('src', image_src );
				this_hero.appendChild(this_hero_img);
				heroes.appendChild(this_hero);
			}
			
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