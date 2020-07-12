// Default Artist Buttons
var cards = ["Black Lotus", "Time Walk", "Timetwister", "Mox Sapphire", "Chaos Orb"]

//Function that adds default artists to the page on load
function renderButtons() {

  // Deletes the artists prior to adding new movies
  $("#nameBtn").empty();
  // Loops through the array of artists
  for (var i = 0; i < cards.length; i++) {
    // Then dynamicaly generates buttons for each artist in the array
    var a = $("<button>");
    // Adds a class of artist to our button
    a.addClass("card");
    // Added a data-attribute
    a.attr("data-name", cards[i]);
    // Provided the initial button text
    a.text(cards[i]);
    // Added the button to the artists button div
    $("#nameBtn").append(a);
  }
}

renderButtons();
var cardName = " ";

// Adds buttons to the page
$("#add").on("click", addAndSearchButton);

function addAndSearchButton(event) {
  event.preventDefault();
  cardName = $("#cardName").val().trim();
  // Then dynamicaly generates buttons for each artist in the array
  var a = $("<button>");
  // Adds a class of artist to our button
  a.addClass("card");
  // Added a data-attribute
  a.attr("data-name", cardName);
  // Provided the initial button text
  a.text(cardName);
  // Added the button to the artists button div
  $("#nameBtn").append(a);
  getCard(cardName);
};

// Function to clear buttons
$("#clear").on("click", function (event) {
  event.preventDefault();
  $("#nameBtn").empty();
});

// AJAX request to get a card artwork based on user input 
function getCard(cardName) {
  var queryURL = "https://api.scryfall.com/cards/named?fuzzy=" + cardName

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // Defines the cardart response as a variable
    var cardArt = response.image_uris.art_crop;
    // defines card name as a variable
    var named = response.name
    // Creates an image Element
    var image = $("<img>").attr("src", cardArt);
    // Puts the card art in that element
    $("#cardGallery").html(image);
    // displays the name of the card below the image:
    var nametag = $("<p>").text(response.name);
    // Appends the title of the card below the artwork
    $("#cardGallery").append(nametag)
    //Stores artist name as a variable
    var credit = $("<p>").text("Artist: " + response.artist);
    //Appends the Artist credit next to the artwork's name
    $("#cardGallery").append(credit)
    // console.log(response);
  });

  // Function to display card art and name to the gallery div when the button up top is clicked

  // click Function to grab a card name and art at random, and display it to the page
  // This is in the docs api.scryfall.com

  //click function to create a button at the top based on what is being displayed in the gallery

}