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

beware that vgpro-hero-synergies is capitalization sensitive about the hero names.

`node merge-hero-data.js` merges all scrapped data into a single .js file that is used by the draft page (loads faster)

to see the draft page use `http-server` to start the localhost server and load the page at http://localhost:8080/

if you don't have http-sever you can install by calling `npm install http-server -g`

## TODO

* improve readability of hero winrate

* figure out way to edit/display counters, combos and comfort picks preferences

* get app accurate hero thumbnails from a screenshot of a device (to be easier to reognize the heroes)

* prettify look and feel (need designer help)

* highlight who is the active person picking

* clock countdown as seen on draft

* display position and WP/CP on sides (click to alter, helps you see things more clearly)

* split team views with central server to allow real drafting usage scenario

* toggle on/off auto picker (pick best meta heroes automatically)

* toggle on/off winrate display helpers

## Credits

Coded by ps with some help by physiX and 4ever.