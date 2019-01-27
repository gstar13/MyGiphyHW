$(document).ready(function () {
  $("#topicBox").hide();
  $("#start").on("click", function () {
    var topics = ["Soccer", "slayer metal", "Trolls", "Tom Brady", "dog", "sloth", "whaleshark", "wine", "keto", "Raiders"];
    //remove start button
    $("#start").remove();
    $("#topicBox").show();
    console.log("start clicked");

    addButtons();

    //turnin the form
    console.log(topics);
    $("#addStuff").on("click", function (event) {
      event.preventDefault();
      newTopic = $("#addTopic").val().trim();
      topics.push(newTopic);
      $("#adds").append("<button class='brady'>" + newTopic + "</button>");
      $(".brady").on("click", clickHandler);
      console.log(topics);
    })


    function addButtons() {
      //create buttons from topics array to html
      for (var i = 0; i < topics.length; i++) {
        $("#subwrapper").append("<button class='brady'>" + topics[i] + "</button>");


      }
    }
    //get query to get from giphy on button click
    function clickHandler() {
      //store the value of the button in the query variable-

      var query = $(this).text();
      console.log(query);

      //create the query url from the button pushing info
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=K5IsUjZXe8HM1IY1bmZnyDthebkXKLig&limit=10&offset=0&rating=G&lang=en";

      console.log(queryURL);
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);


        // loop so it shows entire object of gifs
        for (var i = 0; i < response.data.length; i++) {
          var $img = $("<img>");
          $img.addClass("gifs");
          var still = response.data[i].images.fixed_height_still.url;
          $img.attr("src", still);
          var animated = response.data[i].images.downsized.url;
          $img.attr("data-still", still);
          $img.attr("data-animated", animated);
          $img.attr("data-state", "still");

          $("#pics").append($img);
          //add jquery to display rating under each pic
          $("#pics").append("Rating: " + response.data[i].rating);
          ////define the still and animate as attributes on the image--->$img.attr("src", response.data[i].images.downsized.url); 



        }

        //.then fxn ends here      
      })
      //onclick for search ends here
    }


    $(".brady").on("click", clickHandler);
  })
  $(document).on('click', '.gifs', function () {
    console.log("why");
    var state = $(this).attr('data-state');
    console.log($(this));
    if (state == 'still') {
      $(this).attr('src', $(this).data('animated'));
      $(this).attr('data-state', 'animated');
    } else {
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
    }

  })
  //start fxn ends here
})
