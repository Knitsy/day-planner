$(function () {
  var timeBlocks = [
    { hour: 9, description: "" },
    { hour: 10, description: "" },
    { hour: 11, description: "" },
    { hour: 12, description: "" },
    { hour: 13, description: "" },
    { hour: 14, description: "" },
    { hour: 15, description: "" },
    { hour: 16, description: "" },
    { hour: 17, description: "" },
  ];

  var currentDay = dayjs().format("MMMM D, YYYY");
  $("#currentDay").text(currentDay);

  // Generate time blocks dynamically
  var container = $(".container-lg");
  for (var i = 0; i < timeBlocks.length; i++) {
    var timeBlock = timeBlocks[i];

    var rowEl = $("<div>").addClass("row time-block");
    if (timeBlock.hour < dayjs().hour()) {
      rowEl.addClass("past");
    } else if (timeBlock.hour === dayjs().hour()) {
      rowEl.addClass("present");
    } else {
      rowEl.addClass("future");
    }

    var hourEl = $("<div>")
      .addClass("col-2 col-md-1 hour text-center py-3")
      .text(dayjs().hour(timeBlock.hour).format("hA"));

    var descriptionEl = $("<textarea>")
      .addClass("col-8 col-md-10 description")
      .attr("rows", "3")
      .val(timeBlock.description);

    var saveBtnEl = $("<button>")
      .addClass("btn saveBtn col-2 col-md-1")
      .attr("aria-label", "save")
      .html('<i class="fas fa-save" aria-hidden="true"></i>');

    rowEl.append(hourEl, descriptionEl, saveBtnEl);
    container.append(rowEl);
  }

  // Event listener for save buttons
  $(".saveBtn").on("click", function () {
    var timeBlockEl = $(this).parent();
    var hour = timeBlockEl.attr("id").replace("hour-", "");
    var description = timeBlockEl.find("textarea").val();
    timeBlocks[hour - 9].description = description;
    localStorage.setItem("timeBlocks", JSON.stringify(timeBlocks));
  });

  // Load saved events from local storage
  var savedTimeBlocks = JSON.parse(localStorage.getItem("timeBlocks"));
  if (savedTimeBlocks) {
    timeBlocks = savedTimeBlocks;
    for (var i = 0; i < timeBlocks.length; i++) {
      var timeBlock = timeBlocks[i];
      $("#hour-" + timeBlock.hour)
        .find("textarea")
        .val(timeBlock.description);
    }
  }
});
