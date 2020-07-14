// Default Artist Buttons
var cards = ["Black Lotus", "Time Walk", "Timetwister", "Mox Sapphire", "Chaos Orb"]

// ADD CLASS TO BUTTONS
// class=“btn waves-effect waves-light”

//Function that adds default artists to the page on load
function renderButtons() {

  // Deletes the card name prior to adding
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
  // Then dynamically generates buttons for each artist in the array
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

//Display Card Art when Button up top is clicked:
function cardButton() {

  var cardName = $(this).attr("data-name");
  var queryURL = "https://api.scryfall.com/cards/named?fuzzy=" + cardName;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
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
}

// Function to clear buttons
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

// click Function to grab a card name and art at random, and display it to the page
}
function getRandom(event) {
  $.ajax({
  url: "https://api.scryfall.com/cards/random",
  method: "GET"
}).then(function (response) {
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
});

}

// RANDOM BUTTON:
$("#random").on("click", getRandom);

// SAVE BUTTON:
//click function to create a button at the top based on what is being displayed in the gallery
//Needs a data-name? or what?