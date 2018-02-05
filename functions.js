// testDate = new Date("1/6/2015 7:55:10");

paymentADeliveryWindowArray = {
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
}

paymentBDeliveryWindowArray = {
  //Sunday to Wednesday
  weekday: 1.9686,
  //Thursday to Saturday
  weekend: 4.825,
}

holiday2015 = {
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
};

holiday2016 = {
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
}

holiday2017 = {
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
}

holiday2018 = {
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
}

function transactionTimestampGenerator(year) {
  start = "01/01/"+year;
  end = "12/31/"+year;

  startDateTimestamp = new Date(start);
  endDateTimestamp = new Date(end);

  randomDate = date = new Date(+startDateTimestamp + Math.random() * (endDateTimestamp - startDateTimestamp));
  timeStampConverter(randomDate);

  return randomDate;

}

function timeStampConverter(timeStamp) {
  weekdayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  weekday = timeStamp.getDay();

  console.log(weekdayArray[weekday])
  return weekdayArray[weekday];
}

function timeStampGetMonth(monthBinary) {
  monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return monthArray[monthBinary];
}

function holidayChecker(timeStamp, timeStampYear) {

  if (timeStampYear == "2015") {

    if (timeStamp > new Date(holiday2015.newYearBeginning) && timeStamp < new Date (holiday2015.newYearEnding)) {
      return ("newYear");
    }

    if (timeStamp > new Date(holiday2015.easterBeginning) && timeStamp < new Date (holiday2015.easterEnding)) {
      return ("easter");
    }

    if (timeStamp > new Date(holiday2015.laborDayBeginning) && timeStamp < new Date (holiday2015.laborDayEnding)) {
      return ("laborDay");
    }

    if (timeStamp > new Date(holiday2015.ascensionDayBeginning) && timeStamp < new Date (holiday2015.ascensionDayEnding)) {
      return ("ascensionDay");
    }

    if (timeStamp > new Date(holiday2015.christmasBeginning) && timeStamp < new Date (holiday2015.christmasEnding)) {
      return ("christmas");
    }

    else {
      return ("NotAHoliday")
    }

  }

  if (timeStampYear == "2016") {

  }

  if (timeStampYear == "2017") {

  }

  if (timeStampYear == "2018") {

  }

}

function partOfDay(hour) {
  if (hour >= 0 && hour <= 12){
    return "noon"
  } else if (hour >= 12 && hour <= 1959) {
    return "8PM"
  } else if (hour >= 2000 && hour <= 2359) {
    return "midnight"
  }
}

function calculateDeliveryEstimate (paymentTimeStamp, deliveryEstimate) {
  // console.log(paymentTimeStamp, deliveryEstimate);
  expectedDeliveryTimestamp = new Date(paymentTimeStamp.getTime() + deliveryEstimate*24*60*60*1000);

  console.log(deliveryEstimate);

  //this should update the jquery main window.


  weekday = timeStampConverter(expectedDeliveryTimestamp);
  date = expectedDeliveryTimestamp.getDate();
  month = timeStampGetMonth(expectedDeliveryTimestamp.getMonth());
  hour = expectedDeliveryTimestamp.getHours();
  partOfDayResult = partOfDay(hour);

  $(".show-delivery-window").append(
    "Will be transferred by " + weekday +" (" + date + " " + month + ") " + partOfDayResult +"."
  );

  console.log(weekday);

  if (deliveryEstimate >= 0.5) {
    $(".show-delivery-window").append("Delivery is too slow?");
  }

}

function weekdayOrWeekend(paymentTimestamp) {

  var day = paymentTimestamp.getDay();
  if (day >= 0 && day <= 3) {
    weekdayOrWeekendResult = "weekday"
  } else if (day >= 4 && day <= 6) {
    weekdayOrWeekendResult = "weekend"
  }
  return weekdayOrWeekendResult
}

function nonHolidayEstimator(paymentTimestamp, paymentType) {
  if(paymentType == "A") {
    weekday = timeStampConverter(paymentTimestamp);
    deliveryWindow = paymentADeliveryWindowArray[weekday];
  } else if (paymentType = "C") {
    weekdayOrWeekendResult = weekdayOrWeekend(paymentTimestamp);
    deliveryWindow = paymentBDeliveryWindowArray[weekdayOrWeekendResult];
  }
  // calculateDeliveryEstimate(paymentTimestamp, deliveryWindow);

  calculateDeliveryEstimate(paymentTimestamp, deliveryWindow);

}

function holidayEstimator(paymentTimestamp,timeStampYear, holidayCheck) {

  console.log(paymentTimestamp,timeStampYear, holidayCheck);

  if (timeStampYear == 2015) {
    deliveryWindow = paymentADeliveryWindowArray[holidayCheck];
    calculateDeliveryEstimate(paymentTimestamp, deliveryWindow);
  }

}

function paymentAEstimator (paymentTimestamp) {
  //identify transfer year first
  timeStampYear = paymentTimestamp.getFullYear();

  //holidyCheck checks if the date belongs to a holiday/long weekend.
  holidayCheck = holidayChecker(paymentTimestamp, timeStampYear);

  //if holiday -> run holiday estimator;
  //if non-holiday -> run nonHolidayEstimator;
  if (holidayCheck == "NotAHoliday") {
    nonHolidayEstimator(paymentTimestamp, "A");
  } else if (holidayCheck != "NotAHoliday") {
    console.log("rendered")
    holidayEstimator(paymentTimestamp,timeStampYear, holidayCheck);
  }

}

function paymentBEstimator (paymentTimestamp) {
  //payment B's delivery speed is consistent across the weekday, weekend, and holiday weekend.
  deliveryWindow = 0.28;
  calculateDeliveryEstimate (paymentTimestamp, deliveryWindow);
}

function paymentCEstimator (paymentTimestamp) {
  nonHolidayEstimator(paymentTimestamp, "C");
}

function paymentEstimatorMain(paymentTimestamp, paymentMethod) {

  //if payment A
  if (paymentMethod = "A") {
    paymentAEstimator (paymentTimestamp)
  } else if (paymentMethod = "B") {
    paymentBEstimator (paymentTimestamp)
  } else if (paymentMethod = "C") {
    paymentCEstimator (paymentTimestamp)
  }

}

function testRun() {
  $(".show-delivery-window").empty();
  testDate = transactionTimestampGenerator(2015);
  $(".show-delivery-window").append("sent on " + testDate + "<br>")
  paymentEstimatorMain(testDate, "A");
}
