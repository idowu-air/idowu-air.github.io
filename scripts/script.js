
const VOLUME = 0.2;

$(document).ready(function(){
  $(".play-button").click(function(){
   let audio = new Audio("/sounds/mouse-click.mp3");
   audio.volume = 0.3;
   audio.play();
   setTimeout(function () {
     window.location.href = "level1.html";
   }, 1000);
  });
});

$(document).ready(function(){
  $(".nav-button").click(function(){
   let audio = new Audio("/sounds/nav-click.mp3");
   audio.volume = VOLUME;
   audio.play();
   setTimeout(function () {
     window.location.href = "index.html";
   }, 2000);
  });
});


$(document).ready(function(){
  $(".nav-button2").click(function(){
   let audio = new Audio("/sounds/nav-click.mp3");
   audio.volume = VOLUME;
   audio.play();
   setTimeout(function () {
     window.location.href = "level1.html";
   }, 2000);
  });
});

$(document).ready(function(){
  $(".nav-button3").click(function(){
   let audio = new Audio("/sounds/nav-click.mp3");
   audio.volume = VOLUME;
   audio.play();
   setTimeout(function () {
     window.location.href = "level2.html";
   }, 2000);
  });
});

$(document).ready(function(){
  $(".nav-button4").click(function(){
   let audio = new Audio("/sounds/nav-click.mp3");
   audio.volume = VOLUME;
   audio.play();
   setTimeout(function () {
     window.location.href = "level3.html";
   }, 2000);
  });
});

$(document).ready(function () {
  // Prevents cards from accidentally being dragged
  $(document).on("dragstart", function () {
    return false;
  });
});

const debugging = {
  showCardCount: function() {
    // Debugging Tool for keeping track of card duplicates
    const hashMap = new Map();
    $("img").each(function () {
      if (!hashMap.has($(this).attr("src"))) {
        hashMap.set($(this).attr("src"), 1);
      } else {
        hashMap.set($(this).attr("src"), hashMap.get($(this).attr("src")) + 1);
      }
    });
    hashMap.forEach(function (value, key, map) {
      if(key != "images/cover3.jpg") {
        console.log(`${key} --> ${value} copies`);
      }
    });
  },
  showABCGroups: function() {
    // Debugging tool to ensure each card type has -a,-b,-c copies.
    const hashMap = new Map();
    $(".card").each(function () {
      let letter = $(this).attr("id");
      if (letter == undefined) {
        return;
      }
      if (letter.includes("-")) {
        letter = letter.split("-")[1];
      }
      if (!hashMap.has(letter)) {
        hashMap.set(letter, 1);
      } else {
        hashMap.set(letter, hashMap.get(letter) + 1);
      }
    });
    hashMap.forEach(function (value, key, map) {
      console.log(`${key} --> ${value} copies`);
    });
  }
};
