
$(document).ready(function() {
  
  
  // loops through the /tweets database and renders them on initial page load
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('.tweet-feed').prepend(createTweetElement(tweet));
    }
  };

  // renders the most recent tweet from ajax page update
  const renderRecentTweet = function(tweet) {
    $(".tweet-feed").prepend(createTweetElement(tweet));

  }

  // loads the most recent tweet via ajax
  const loadRecentTweet = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
    .done((data) => {
      renderRecentTweet(data[data.length -1]);
    })
    .fail(error => console.log(error));
  }
  
  // sets markup and dynamically populates tweets (for both initial page load and rendering new tweet)
  const createTweetElement = function(tweet) {
    let $tweet = `
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
    `;
    return $tweet;
  };
  
  // jquery/ajax post request handler; checks for character length and empty content
  $("#post-tweet").on('submit', function(event) {
    event.preventDefault();
    const text = $(this.children[0]).val();
    const queryString = $(this).serialize();
    if (text.length > 140) {
      alert('Exceeded maximum character count!')
    } else if (text === "" || text === null) {
      alert('You may not submit an empty tweet.')
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: queryString
      })
      .done(() => {
        // resests form and character count, then renders new tweet on page
        $(this.children[0]).val("");
        $(".counter").val(140);
        loadRecentTweet();
      })
      .fail(error => console.log(error));  
    };
  });
  
  // renders tweets from database on initial page load
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      renderTweets(tweets);
    });
  };

  loadTweets();

});