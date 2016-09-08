$(function () {
  
  // cache DOM
  $author = $('#author');
  $content = $('#content');
  $tweet = $('#tweet');
  $body = $('body');
  $quote = $('#quote');

  // setup the function to tweet the quote
  function tweet() {    
    var content1 = $content.text();
    var author1 = $author.text();
    window.open('https://twitter.com/intent/tweet?text=' +content1 + ' - ' +author1);    
  }
  
  // api call for quotes
  function newQuote() {      
      $.ajax( {
        url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',      
        success: function (data) {          
          var post = data.shift();
          $author.text(post.title);
          $content.html(post.content);      
        },
        error:function() {
          console.log('Error connecting to API');
        },
        cache: false      
      }); //ajax
  
      //Generate Random background color on click
      var safeColors = ['00','33','66','99','cc','ff'];
      var rand = function() {
        return Math.floor(Math.random()*6);
      };
      
      var randomColor = function() {
        var r = safeColors[rand()];
        var g = safeColors[rand()];
        var b = safeColors[rand()];
        return "#"+r+g+b;
      };
    
      $body.each(function() {
        $(this).css('background',randomColor());
      });  
    
  } //close .click
  
   
  //run new quote on page load
  newQuote();
  // Get new quote on button click
  $quote.on('click', newQuote);
  // Open tweet in new window
  $tweet.on('click', tweet);
  
}); //close .ready