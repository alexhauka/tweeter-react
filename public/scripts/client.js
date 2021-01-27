/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Fake data taken from initial-tweets.json => REMOVE AFTER IMPLEMENTING AJAX GET REQUEST
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
$(document).ready(function() {
  
  // UPDATE

  const renderTweets = function(tweets) {
    // const data = tweets

    // loops through tweets
    for (const tweet of data) {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      $('.container').append(createTweetElement(tweet));
    }
  }
  
  const createTweetElement = function(tweet) {
    let $tweet = `
    <section class="tweet-feed">
      <article>

        <header>
          <div class="user-info">
            <img id="user-avatar" src=${tweet.user.avatars}>
            <label>${tweet.user.name}</label>
          </div>
          <div class="handle">
            <label>${tweet.user.handle}</label>
          </div>
        </header>

        <section>
          <p>${tweet.content.text}</p>
        </section>

        <footer>
          <label>${Date(tweet.created_at)}</label>
          <label>buttons</label>
        </footer>

      </article>
    </section>
    `;
    return $tweet;
  }

  renderTweets(data);

  $(function() {
    $( "#post-tweet" ).submit(function( event ) {
      event.preventDefault();
      const queryString = $( this ).serialize()
      $.ajax('/tweets', queryString, { method: 'POST' })
    });
  });

  
});