$(document).ready(function() {
  
  // uses initial 140 value and reduces based off tweet-text entry
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
      $('.counter').css('color', '#545149');
    }
  })
   
  


  
});









