//DEPENDENCIES

var currentDateHTML = $("#current-date");
var savedEntries = "Try Here";
var container = $(".container");
var schedulerTimeTags = $(".input-group-text");

//DATA with momentjs below

var today = moment();
var currentDate = today.format("MMM Do, YYYY");

//FUNCTIONS

function colorCodeEntries() {
  var time = $(this)[0].innerText.toLowerCase();
  time = moment(time, "HERE");
  todaysTime = moment(today.format("HERE"), "HERE");
  var colorClass = $(this).parent().siblings()[0].className;

  if (time.isBefore(today.format("HERE"))) {
    $(this).parent().siblings()[0].className = colorClass + " past";
  } else if (time.isAfter(todaysTime)) {
    $(this).parent().siblings()[0].className = colorClass + " future";
  } else {
    $(this).parent().siblings()[0].className = colorClass + " present";
  }
}

function loadSavedEntries() {
  savedEntries = JSON.parse(localStorage.getItem("savedEntries"));

  if (savedEntries) {
    for (var i = 0; i < savedEntries.length; i++) {
      var currEntry = savedEntries[i];

      if (currEntry.date == currentDate) {
        console.log(`.${currEntry.time}`.toLowerCase());
        $(`#${currEntry.time}`.toLowerCase())
          .parent()
          .siblings()
          .text(currEntry.entry);
      }
    }
  } else {
    savedEntries = [];
  }

  return savedEntries;
}

function saveEntry(event) {
  event.preventDefault();

  var entry = $(this).parent().parent()[0][0].value;
  var entryTime = $(this)
    .parent()
    .siblings()
    .children()
    .children()[0] //get to the right place. start @ 0
    .innerText.toUpperCase();

  var savedEntry = {
    date: currentDate,
    time: entryTime,
    entry: entry,
  };

  savedEntries.push(savedEntry);
}

//INITIALIZATION

currentDateHTML.text(currentDate);
schedulerTimeTags.each(colorCodeEntries);
savedEntries = loadSavedEntries();

container.on("click", ".saveBtn", saveEntry);
