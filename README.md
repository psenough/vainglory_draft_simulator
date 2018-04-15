# vainglory_draft_simulator

this uses nodejs, so make sure you install it first.

then you can launch a command line and call:

`node scrape-vaingloryfire-heroes-list.js` to get heros info out of [vaingloryfire](https://www.vaingloryfire.com/), saves it to a json file

`node scrape-hero-thumbnails.js` to get thumbnails froms all heroes info out of [vaingloryfire](https://www.vaingloryfire.com/) and save it in a specified directory

you can use arguments to specify which heroes (i.e. `node scrape-hero-thumbnails.js ardan celeste vox` only gets thumbnails of the ardan family)

`node scrape-hero-details.js` to get thumbnails froms all heroes info out of [vainglorygame](https://www.vainglorygame.com/) and save it in a specified directory

you can use arguments to specify heroes (i.e. `node scrape-hero-details.js ardan celeste vox` only gets details for the ardan family)

`node scrape-vgpro-hero-synergies.js` to get meta hero synergy info from [vgpro](https://vgpro.gg/) and save it in a specified directory

you can use arguments to specify heroes (i.e. `node scrape-vgpro-hero-synergies.js Ardan Celeste Vox` only gets details for the ardan family)

beware that vgpro-hero-startegies is capitalization sensitive.

to see the draft page use `http-server` to start the localhost server and load the page at http://localhost:8080/

if you don't have http-sever you can install by calling `npm install http-server -g`

## TODO

* figure out a way to use API to get json with winrates of heroes maybe using `https://github.com/zeroclutch/vainglory-counter-data` ? or vgpro

* display total winrate of heroes on screen

* display winrate of heroes against already specific banned heroes

* display winrate of heroes given certain combos and counters

* figure out way to edit counters, combos and comfort picks

* display custom counter, combos and comfort picks

* get new hero images from a screenshot of a device running the draft

* prettify the background to look similar to real draft

* highlight active person picking

* clock countdown as seen on draft

* display position and WP/CP on sides (click to alter)

* split team views with central server to allow real drafting

## Credits

Coded by ps with some help by physiX and 4ever.