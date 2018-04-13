# vainglory_draft_simulator

`node scrape-vaingloryfire.js` to get heros info out of [vaingloryfire](https://www.vaingloryfire.com/) and save it in json file

`node scrape-vaingloryfire-hero-thumbnails.js` to get thumbnails froms all heroes info out of [vaingloryfire](https://www.vaingloryfire.com/) and save it in a specified directory

you can use arguments to specify heroes, `node scrape-vaingloryfire-hero-thumbnails.js ardan celeste vox` only gets thumbnails of the ardan family for example

`node scrape-vaingloryfire-hero-details.js` to get thumbnails froms all heroes info out of [vainglorygame](https://www.vainglorygame.com/) and save it in a specified directory

you can use arguments to specify heroes, `node scrape-vaingloryfire-hero-details.js ardan celeste vox` only gets details for the ardan family for example

use `http-server` to start the localhost server and load the page at http://localhost:8080/

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

Coded by ps with some help by physiX.