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

* grey out on the stats list heros already picked

* hidable stats list section with a button

* figure out way to edit/display counters, combos and comfort picks preferences

* get app accurate hero thumbnails from a screenshot of a device (to be easier to recognize the heroes)

* prettify look and feel (need designer help)

* display clock countdown as seen on real draft

* split team views with central server to allow real draft use for esports

* toggle on/off auto picker (pick best meta heroes automatically)

* toggle on/off winrate display helpers

* hover on hero to show extra hero info (base stats, perks, suggested builds)

* test on mobile

Suggestions by shutterfly:
 * Remove the red/blue/strikethrough from the hero icons because it's redundant and tint them instead
 * Given the team's and the enemy team's roster, calculate the advantage gained/lost for all of the heroes left, tint suggested picks green and bad picks red.
 * Add hovers to the hero icons that have a tooltip. Inside the tooltip, provide the reason for the suggestion as a list with statistics. For example, with Marlene on Team A, Adagio on Team B, hovering Baron for B pick "Baron counters Adagio (positive), Baron synergizes with Adagio (positive)"
 * Remove the graphs on the bottom

 The challenge of a draft proposer is to find the best ally for a team A of N heroes and a team B of M heroes, having only tuples of synergy and counter data(edited)
Team A's heroes: A
Team B's heroes: B
Left over heroes: H
((hero1, hero2), win rate) for synergies are in S
((hero1, hero2), win rate) for counters are in C

Team A's chance of winning (pseudo code):
chanceOfWinning(A, B) := (
  + sum of ( map a1 in A, a2 in A to S[(a1, a2)] ) / ( (length of A) ^ 2 )  # + synergies in A
  + sum of ( map a1 in A, b1 in B to C[(a1, b1)] ) / ( (length of A) * (length of B) )  # + counters A to B
  - sum of ( map b1 in B, b2 in B to S[(b1, b2)] ) / ( (length of B) ^ 2 )  # - synergies in B
  - sum of ( map b1 in B, a1 in A to C[(b1, a1)] ) / ( (length of A) * (length of B) )  # + counters B to A
) / 2

Team B's chance of winning would be the inverse.
For an open pick h in H the advantage / disadvantage of the pick for the team is chanceOfWinning(A, B) - chanceOfWinning(A + [h], B) for the A side or chanceOfWinning(A, B) - chanceOfWinning(A, B + [h]) on B side.
scnr - this problem has kept me awake during many evenings and I never had the time / chance to write the code for it :(
 
 You can use win rate * pick rate and if you have ban rates too win rate * (ban rate + pick rate)
I called it "relevancy"

## Credits

Coded by ps with some feedback by physiX, 4ever, Tsumibit0, Smash and shutterfly.