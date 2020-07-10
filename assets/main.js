// Default Artist Buttons
var artists = ["Leonardo DaVinci", "Michaelangelo", "Pablo Picasso", "Monet"]

//Function that adds default artists to the page on load
function renderButtons() {

    // Deletes the artists prior to adding new movies
    $("#nameBtn").empty();
    // Loops through the array of artists
    for (var i = 0; i < artists.length; i++) {

      // Then dynamicaly generates buttons for each artist in the array
      var a = $("<button>");
      // Adds a class of artist to our button
      a.addClass("artist");
      // Added a data-attribute
      a.attr("data-name", artists[i]);
      // Provided the initial button text
      a.text(artists[i]);
      // Added the button to the artists button div
      $("#nameBtn").append(a);
    }
  }  

  renderButtons();

