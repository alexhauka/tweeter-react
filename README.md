# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This repository is the starter code for the project: Students will fork and clone this repository, then build upon it to practice their HTML, CSS, JS, jQuery and AJAX front-end skills, and their Node, Express and MongoDB back-end skills.


## Unique Features

- The 'Compose Tweet' entry box is hidden by default (stylistic choice)! Toggle it open with the button in nav bar
- There is a custom date/time stamp function (/server/lib/date-maker.js) which formats the time of tweet-creation without frills; this is set to a local time of PDT. The function can be tweaked if a different timezone is desired.
- The character counter changes colours in *stages* when composing a tweet; these stages are less than 20 char's remaining (orange) and less than 0 (red).


## Screenshots

!["Tweeter Mobile"](https://github.com/alexhauka/tweeter/blob/master/docs/tweeter-mobile-top.png?raw=true)

!["Mobile Scrolling"](https://github.com/alexhauka/tweeter/blob/master/docs/tweeter-mobile-scroll.png?raw=true)

!["Tweeter Desktop"](https://github.com/alexhauka/tweeter/blob/master/docs/tweeter-warning-colour.png?raw=true)



### Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

#### Dependencies

- Express
- Node 5.10.x or above
- body-parser
- chance
- express
- md5
