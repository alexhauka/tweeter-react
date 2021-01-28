
$(document).ready(function() {
  
  // defaults the new tweet-box as hidden until 'Write new Tweet' clicked
  $('.tweet-box').hide();

  // loops through the /tweets database and renders them on initial page load
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('.tweet-feed').prepend(createTweetElement(tweet));
    }
  };

  // renders the most recent tweet from ajax page update
  const renderRecentTweet = function(tweet) {
    $('.tweet-feed').prepend(createTweetElement(tweet));

  };

  // loads the most recent tweet via ajax
  const loadRecentTweet = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
    .done((data) => {
      renderRecentTweet(data[data.length - 1]);
    })
    .fail(error => console.log(error));
  };

  // escapes unsafe characters entered by the user in createTweetElement
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  // sets markup and dynamically populates tweets (for both initial page load and rendering new tweet)
  const createTweetElement = function(tweet) {
    let $tweet = `
      <article>

        <header>
          <div class='user-info'>
            <img id='user-avatar' src=${tweet.user.avatars}>
            <label>${tweet.user.name}</label>
          </div>
          <div class='handle'>
            <label>${tweet.user.handle}</label>
          </div>
        </header>

        <section>
          <p>${escape(tweet.content.text)}</p>
        </section>

        <footer>
          <label>${(tweet.created_at)}</label>
          <div id='footer-buttons'><i class='far fa-flag'></i><i class='fas fa-retweet'></i><i class='far fa-heart'></i></div>
        </footer>

      </article>
    `;
    return $tweet;
  };

  

  
  
  // jquery/ajax post request handler; checks for character length and empty content
  $("#post-tweet").on('submit', function(event) {
    event.preventDefault();
    const text = $(this.children[0]).val().trim();
    const queryString = $(this).serialize();
    // ensures the errors hide again before checking
    $('.error-count').slideUp('fast', 'linear');
    $('.error-empty').slideUp('fast', 'linear');
    if (text.length > 140) {
      // error classes are set to display: none in their css
      $('.error-count').slideDown('fast', 'linear');
    } else if (text === '' || text === null) {
      $('.error-empty').slideDown('fast', 'linear');
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: queryString
      })
      .done(() => {
        // resets textarea and character count, then renders new tweet on page
        $(this.children[0]).val('');
        $('.counter').val(140);
        $('.counter').css('color', '#6495ED')
        loadRecentTweet();
      })
      .fail(error => console.log(error));
    }
  });
  
  // renders tweets from database on initial page load
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function(tweets) {
      renderTweets(tweets);
    });
  };


  // 'Write a new Tweet' button in the nav, toggles new tweet and focuses
  $('.write-button').on('click', function(event) {
    $('.tweet-box').slideToggle(event);
    $('#tweet-text').focus();
  });

  // scroll button appears when scrolled down (requires enough tweets to populate a scrollbar)
  $(function() {
    $('#scroll-button').hide();
    $(window).scroll(function() {
      let scroll = $(window).scrollTop();
      if (scroll >= 100) {
        $('#scroll-button').show();
      } else {
        $('#scroll-button').hide();
      }
    });
  });

  // smooth scroll to top on click, opens tweet box (if not already open) and focuses
  $('#scroll-button').on('click', function() {
    $('html, body').animate({
      scrollTop: 0}, 1100);
      $('.tweet-box').slideDown();
      $('#tweet-text').focus();
  });

  // loads tweets on inital page GET
  loadTweets();

});