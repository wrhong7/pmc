var paymentADelivery = {
  Sunday: 2.323,
  Monday: 2.304500734,
  Tuesday: 2.483766471,
  Wednesday: 2.549234737,
  Thursday: 3.950079317,
  Friday: 4.184714355,
  Saturday: 4.218531351,
  newYear: 4.34,
  easter: 4.55,
  laborDay: 3.90,
  ascensionDay: 4.47,
  christmas: 4.78,
};

var paymentBDelivery = 0.28;

var paymentCDelivery = {
  //Sunday to Wednesday
  weekday: 1.9686,
  //Thursday to Saturday
  weekend: 4.825,
};

var holidays = {
  2015: {
    newYearBeginning: "1/1/2015 00:00:00",
    newYearEnding: "1/2/2015 23:59:59",
    easterBeginning: "4/3/2015 00:00:00",
    easterEnding: "4/4/2015 23:59:59",
    laborDayBeginning: "4/30/2015 00:00:00",
    laborDayEnding: "5/2/2015 23:59:59",
    ascensionDayBeginning: "5/13/2015 00:00:00",
    ascensionDayEnding: "5/15/2015 23:59:59",
    christmasBeginning: "12/23/2015 00:00:00",
    christmasEnding: "12/25/2015 23:59:59",
  },
  2016: {
    newYearBeginning: "12/30/2015 00:00:00",
    newYearEnding: "1/2/2016 23:59:59",
    easterBeginning: "3/23/2016 00:00:00",
    easterEnding: "3/27/2016 23:59:59",
    laborDayBeginning: "4/30/2016 00:00:00",
    laborDayEnding: "5/1/2016 23:59:59",
    ascensionDayBeginning: "5/3/2016 00:00:00",
    ascensionDayEnding: "5/4/2016 23:59:59",
    christmasBeginning: "12/23/2016 00:00:00",
    christmasEnding: "12/25/2016 23:59:59",
  },
  2017: {
    //adjusted for normal weekend
    newYearBeginning: "12/30/2016 00:00:00",
    newYearEnding: "12/31/2016 23:59:59",
    easterBeginning: "4/12/2017 00:00:00",
    easterEnding: "4/16/2017 23:59:59",
    laborDayBeginning: "4/29/2017 00:00:00",
    laborDayEnding: "4/30/2017 23:59:59",
    ascensionDayBeginning: "5/23/2017 00:00:00",
    ascensionDayEnding: "5/24/2017 23:59:59",
    christmasBeginning: "12/23/2017 00:00:00",
    christmasEnding: "12/25/2017 23:59:59",
  },
  2018: {
    newYearBeginning: "12/28/2017 00:00:00",
    newYearEnding: "1/2/2018 23:59:59",
    easterBeginning: "3/29/2018 00:00:00",
    easterEnding: "4/1/2018 23:59:59",
    laborDayBeginning: "4/29/2018 00:00:00",
    laborDayEnding: "5/1/2018 23:59:59",
    ascensionDayBeginning: "5/8/2018 00:00:00",
    ascensionDayEnding: "5/9/2018 23:59:59",
    christmasBeginning: "12/23/2018 00:00:00",
    christmasEnding: "12/25/2018 23:59:59",
  },
};

var year = 2015;

function transactionTimestampGenerator() {
  var startDateTimestamp, endDateTimestamp, randomDate;

  // year = [2015, 2016, 2017, 2018][Math.floor(Math.random() * 4)];
  startDateTimestamp = new Date("01/01/" + year);
  endDateTimestamp = new Date("12/31/" + year);
  randomDate = new Date(+startDateTimestamp + Math.random() * (endDateTimestamp - startDateTimestamp));

  $(".random-timestamp-box").empty();
  $(".random-timestamp-box").append("Current Time<br>"+randomDate);

  return randomDate;
}

function getDayName(timeStamp) {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][timeStamp.getDay()];
}

function getMonthName(monthIndex) {
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][monthIndex];
}

function getHolidayType(timeStamp, timeStampYear) {
  if (timeStamp > new Date(holidays[timeStampYear].newYearBeginning) && timeStamp < new Date(holidays[timeStampYear].newYearEnding)) {
    return ("newYear");
  }

  if (timeStamp > new Date(holidays[timeStampYear].easterBeginning) && timeStamp < new Date(holidays[timeStampYear].easterEnding)) {
    return ("easter");
  }

  if (timeStamp > new Date(holidays[timeStampYear].laborDayBeginning) && timeStamp < new Date(holidays[timeStampYear].laborDayEnding)) {
    return ("laborDay");
  }

  if (timeStamp > new Date(holidays[timeStampYear].ascensionDayBeginning) && timeStamp < new Date(holidays[timeStampYear].ascensionDayEnding)) {
    return ("ascensionDay");
  }

  if (timeStamp > new Date(holidays[timeStampYear].christmasBeginning) && timeStamp < new Date(holidays[timeStampYear].christmasEnding)) {
    return ("christmas");
  }

  else {
    return ("NotAHoliday")
  }

}

function getArrivesBy(hour) {
  if (hour >= 0 && hour <= 12) {
    return "noon"
  } else if (hour >= 12 && hour <= 1959) {
    return "afternoon"
  } else if (hour >= 2000 && hour <= 2359) {
    return "midnight"
  }
}

function renderDeliveryEstimate(paymentTimeStamp, deliveryEstimate) {

  var hour, day, date, month, arrivesBy, expectedDeliveryTimestamp;

  expectedDeliveryTimestamp = new Date(paymentTimeStamp.getTime() + deliveryEstimate * 24 * 60 * 60 * 1000);

  day = getDayName(expectedDeliveryTimestamp);
  date = expectedDeliveryTimestamp.getDate();
  month = getMonthName(expectedDeliveryTimestamp.getMonth());
  hour = expectedDeliveryTimestamp.getHours();
  arrivesBy = getArrivesBy(hour);

  $(".random-timestamp-box").append("<br>Estimated Time of Delivery<br>"+expectedDeliveryTimestamp);

  $(".show-delivery-window").append(
    day + " (" + date + " " + month + ") " + arrivesBy + "."
  );

  if (deliveryEstimate >= 0.5) {
    $(".show-delivery-window").append(
      "<div class='delivery-recommendation-container'>" +
      "<span class='faster-option-prompt'>Do you need it sooner?</span>" +
      "<span class='calculation-method-prompt'>How is this calculated?</span>" +
      "</div>"
    );
  }

  if (deliveryEstimate < 0.5) {
    $(".show-delivery-window").append(
      "<div class='delivery-recommendation-container'>" +
      "<span class='calculation-method-prompt'>How is this calculated?</span>" +
      "</div>"
    );
  }

}

function getPartOfWeek(paymentTimestamp) {
  var day, part;

  day = paymentTimestamp.getDay();

  if (day >= 0 && day <= 3) {
    part = "weekday";
  } else if (day >= 4 && day <= 6) {
    part = "weekend";
  }

  return part;
}

function nonHolidayEstimator(paymentTimestamp, paymentType) {
  var deliveryWindow;

  if (paymentType === "A") {
    deliveryWindow = paymentADelivery[getDayName(paymentTimestamp)];
  } else if (paymentType === "C") {
    deliveryWindow = paymentCDelivery[getPartOfWeek(paymentTimestamp)];
  }

  renderDeliveryEstimate(paymentTimestamp, deliveryWindow);
}

function holidayEstimator(paymentTimestamp, timeStampYear, holidayCheck) {
  renderDeliveryEstimate(paymentTimestamp, paymentADelivery[holidayCheck]);
}

function paymentAEstimator(paymentTimestamp) {

  var timeStampYear, holidayType;

  timeStampYear = paymentTimestamp.getFullYear();
  holidayType = getHolidayType(paymentTimestamp, timeStampYear);

  holidayType === "NotAHoliday" ?
    nonHolidayEstimator(paymentTimestamp, "A") :
    holidayEstimator(paymentTimestamp, timeStampYear, holidayType);
}

function paymentBEstimator(paymentTimestamp) {
  renderDeliveryEstimate(paymentTimestamp, paymentBDelivery);
}

function paymentCEstimator(paymentTimestamp) {
  nonHolidayEstimator(paymentTimestamp, "C");
}

function paymentEstimatorMain(paymentTimestamp, paymentMethod) {
  if (paymentMethod === "A") {
    paymentAEstimator(paymentTimestamp)
  } else if (paymentMethod === "B") {
    paymentBEstimator(paymentTimestamp)
  } else if (paymentMethod === "C") {
    paymentCEstimator(paymentTimestamp)
  }
}

function runEstimator(paymentMethod) {
  $(".show-delivery-window").empty();
  testDate = transactionTimestampGenerator();
  paymentEstimatorMain(testDate, paymentMethod);
}

function yearForRandomGenerator(yearClicked) {
  year = yearClicked;

  $(".random-year-box").css({
    "background-color": "white",
    "border": "solid 0.1vh rgb(42, 57, 86)",
    "color": "#2A3956"
  })

  $("#"+year+"-box").css({
    "background-color": "rgb(42, 57, 86)",
    "border": "solid 0.1vh rgb(42, 57, 86)",
    "color": "white"
  })
}
