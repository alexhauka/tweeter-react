"use strict";

const { dateMaker, timeMaker } = require('./date-maker');
const date = dateMaker();
const time = timeMaker();
const dateTime = date + ' - ' + time;

// Require fs to write to initial-tweets.json
const fs = require("fs");
// Requiring a JSON file automatically parses it and returns the data.
let tweetsJSON = require('../data-files/initial-tweets.json');

// Write recent dates to initial-tweets.json
// Specifically sync to not interfere with student functions
module.exports = () => {
  // One day in milliseconds is 86400000ms or...
  // oneDayMs = 1000 milliseconds * 60 seconds * 60 minutes * 24 hours.
  const oneDayMs = 1000 * 60 * 60 * 24
  // Subtract one day in milliseconds (oneDayMs) times the tweets length minus the current index.
  // This keeps the newest tweets at the bottom, and allows for further tweets to be added.
  tweetsJSON = tweetsJSON.map((tweet, index) => {
    tweet.created_at = dateTime;
    return tweet;
  });
  // Re-write the tweets with the new date values.
  fs.writeFileSync('server/data-files/initial-tweets.json', JSON.stringify(tweetsJSON, null, 2), { encoding: "utf8" });
};


// original formula for delayed tweets (in case needed ever again)

// Date.now() - (oneDayMs * (tweetsJSON.length - index))