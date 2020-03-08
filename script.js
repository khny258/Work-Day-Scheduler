$(document).ready(function() {
    $("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

    
    for (var i = 0; i <= 8; i++) {
        var storedItem = localStorage.getItem("hour-" + i);
        $("#hour-" + i + "-text").val(storedItem);
    }

    
    var currentHour = moment()
        .format("LT")
        .split(":")
        .shift();

    var ampm = moment()
        .format("LT")
        .split(" ")
        .pop();

    var isAM = (ampm == "AM") ? true : false;

    if (isAM) {
        for (var i = 3; i <= 8; i++) {
            var hourRow = $(".hour[data-index=" + i + "]");
            hourRow.next().addClass("future");
        }

        for (var i = 0; i <= 2; i++) {
            var hourRow = $(".hour[data-index=" + i + "]");
            if (hourRow.attr("data-hour") == currentHour) {
                hourRow.next().addClass("present");
            } else if (
                
                parseInt(hourRow.attr("data-hour")) > parseInt(currentHour)
            ) {
                hourRow.next().addClass("future");
            } else if (
                parseInt(hourRow.attr("data-hour")) < parseInt(currentHour)
            ) {
                hourRow.next().addClass("past");
            }
        }
    } else {
        for (var i = 0; i <= 2; i++) {
            var hourRow = $(".hour[data-index=" + i + "]");
            hourRow.next().addClass("past");
        }

        if (currentHour == 12) {
            $(".hour[data-hour=12]")
                .next()
                .addClass("present");
            $(".hour[data-hour=1]")
                .next()
                .addClass("future");
            $(".hour[data-hour=2]")
                .next()
                .addClass("future");
            $(".hour[data-hour=3]")
                .next()
                .addClass("future");
            $(".hour[data-hour=4]")
                .next()
                .addClass("future");
            $(".hour[data-hour=5]")
                .next()
                .addClass("future");
        } else {
            $(".hour[data-hour=12]")
                .next()
                .addClass("past");

            for (var i = 4; i <= 8; i++) {
                var hourRow = $(".hour[data-index=" + i + "]");

                if (hourRow.attr("data-hour") == currentHour) {
                    hourRow.next().addClass("present");
                } else if (
                    parseInt(hourRow.attr("data-hour")) > parseInt(currentHour)
                ) {
                    hourRow.next().addClass("future");
                } else if (
                    parseInt(hourRow.attr("data-hour")) < parseInt(currentHour)
                ) {
                    hourRow.next().addClass("past");
                }
            }
        }
    }

    
    function saveText(event) {
        var target = event.target;
        var keyName;
        var textareaValue;
        var rowElement;

        if (target.tagName == "DIV") {
            textareaValue = target.previousElementSibling.children[0].value;
            rowElement = target.parentElement.getAttribute("data-index");
            keyName = "hour-" + rowElement;
        } else {
            textareaValue =
                target.parentElement.previousElementSibling.children[0].value;
            rowElement = target.parentElement.parentElement.getAttribute(
                "data-index"
            );
            keyName = "hour-" + rowElement;
        }

        if (textareaValue !== "") {
            localStorage.setItem(keyName, textareaValue);
        } else {
            localStorage.removeItem(keyName);
        }
    }

    $(".saveBtn").on("click", saveText);
});