// https://api.tronalddump.io/random/quote


function getTrump(){
$.ajax({
    url:"https://api.tronalddump.io/random/quote",
    method: "GET"
}).then(function (response){
    console.log(response)
});
}
getTrump();