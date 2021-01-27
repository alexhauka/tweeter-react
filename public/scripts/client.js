
$(document).ready(function() {
  
  
  // loops through the /tweets database and renders them to the main page
  const renderTweets = function(tweets) {

    for (const tweet of tweets) {
      // takes tweets and appends them to the tweets container on main page
      $('.tweet-feed').prepend(createTweetElement(tweet));
    }
  };
  // sets markup and dynamically populates tweets
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
  
  // jquery/ajax post request handler when using tweet button
  $("#post-tweet").on('submit', function(event) {
    event.preventDefault();
    const text = $(this.children[0]).val();
    const queryString = $(this).serialize();
    console.log(text);
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
      .then(renderTweets(data))
      // .then((data) => {
      //   $('.container').load(url, (renderTweets(data)))
      // })
      // .then(($queryString) => {
      //   const newTweets = renderTweets($queryString)
      //   $('.container').load('/tweets', newTweets, loadTweets)
      // })
    };
  });
  
  // pulls from /tweets then plugs the data into renderTweets
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      renderTweets(tweets);
    });
  };

  loadTweets();

});