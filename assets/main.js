// default artwork buttons
var cards = ["Black Lotus", "Time Walk", "Timetwister", "Mox Sapphire", "Chaos Orb"]

// function that adds default artworks to the page on load
function renderButtons() {
  // deletes the previously displayed artwork
  $("#nameBtn").empty();
  // loops through the array of default artworks
  for (var i = 0; i < cards.length; i++) {
    // then dynamicaly generates buttons for each artwork in the array
    var art = $("<button>");
    // adds data attributes for data names and classes
    art.attr({ "data-name": cards[i], "class": "card btn waves-effect waves-light" });
    // puts text on the buttons
    art.text(cards[i]);
    // puts the buttons in the button div
    $("#nameBtn").append(art);
  }
}

renderButtons();
var cardName = " ";

// adds buttons to the page
$("#add").on("click", addAndSearchButton);

function addAndSearchButton(event) {
  event.preventDefault();
  // gets card name from user input
  cardName = $("#cardName").val().trim();
  // then dynamically generates a button for that artwork
  var art = $("<button>");
  // adds a data-attribute
  art.attr({ "data-name": cardName, "class": "card btn waves-effect waves-light" });
  // puts artwork name on the button
  art.text(cardName);
  // adds the button to the button div
  $("#nameBtn").append(art);
  getCard(cardName);
};

// display card art when Button up top is clicked:
function cardButton() {

  var cardName = $(this).attr("data-name");
  var queryURL = "https://api.scryfall.com/cards/named?fuzzy=" + cardName;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    viewArt(response)
  });
}

// function to clear buttons
$("#clear").on("click", function (event) {
  event.preventDefault();
  $("#nameBtn").empty();
});

$(document).on("click", ".card", cardButton);

// AJAX request to get a card artwork based on user input, create a button and display it to the page
function getCard(cardName) {
  var queryURL = "https://api.scryfall.com/cards/named?fuzzy=" + cardName

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    viewArt(response)
  });
}

// click function to grab a card name and art at random, and display it to the page
function getRandom(event) {
  $.ajax({
    url: "https://api.scryfall.com/cards/random",
    method: "GET"
  }).then(function (response) {
    viewArt(response)
  }).then(function (response) {
    giphyArt(response);
  })
}

// RANDOM BUTTON:
$("#random").on("click", getRandom);

// SAVE
$("#save").on("click", saveArt);
// click function to create a button at the top based on what is being displayed in the gallery
function saveArt(event) {
  event.preventDefault();
  cardName = $(".nowShowing").attr("data-name");
  // then dynamically generates buttons for each artist in the array
  var art = $("<button>");
  // added a data-attribute
  art.attr({ "data-name": cardName, "class": "card btn waves-effect waves-light" });
  // provided the initial button text
  art.text(cardName);
  // added the button to the artists button div
  $("#nameBtn").append(art);
  getCard(cardName);
};

//Function to grab artwork from the database, and add it to the page
function viewArt(artwork) {
  var cardArt = artwork.image_uris.art_crop;
  // creates an image Element to hold it, and gives it attributes
  var image = $("<img>").attr({ "src": cardArt, "alt": artwork.name, "data-name": artwork.name, "class": "nowShowing" });
  // puts the card art into the gallery
  $("#cardGallery").html(image);
  // makes a nametag for the artwork title
  var nametag = $("<h4>").text(artwork.name);
  // puts that nametag below the artwork
  $("#cardGallery").append(nametag)
  // stores artist name as a variable
  var credit = $("<h5>").text("Artist: " + artwork.artist);
  // appends the Artist credit below the artwork's name
  $("#cardGallery").append(credit)
};

//function to call giphy API
function giphyArt(argument) {
  var b = argument;
  var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + b;
  // ajax GET request to queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    //data response from ajax request
    .then(function (response) {
      // saves the image in variable 
      var imageURL = response.data.image_original_url;
      // creates an image tag 
      var artImage = $("<img>");
      //Giphy Title
      var giphyTitle = $("<p">);
      // creates attributes source and alt to the image 
      artImage.attr({ "src": imageURL, "alt": "art image" });
      // appends the giphy image to the card gallery
      $("#cardGallery").append(artImage);
      //Adds the GIPHY's name to the element
      giphyTitle.text("This is a GIPHY of " + response.title)
      //Adds the title element to the page
      $("cardGallery").append(giphyTitle)
    });
}
