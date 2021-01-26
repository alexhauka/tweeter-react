$(document).ready(function() {
  
  // updates remaining character count for new tweets as they are typed out
  const count = $(".counter").val();
  $('#tweet-text').keyup(() => {
    let string = $("#tweet-text").val();
    $('.counter').val(count - string.length)
    let num = count - string.length;
    if (num < 0) {
      $('.counter').css('color', 'red');
    } else if (num >= 0 && num < 20) {
      $('.counter').css('color', '#fba607');
    } else if (num >= 20) {
      $('.counter').css('color', '#6495ED');
    }
  })
   
  


  
});









