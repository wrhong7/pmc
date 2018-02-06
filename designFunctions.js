function clickPaymentMethodButton(paymentMethod) {
  console.log(paymentMethod)
  paymentMethodSelected = paymentMethod;
  highlightButtonClicked('payment'+paymentMethod);
  runEstimator(paymentMethod)
}

function highlightButtonClicked(paymentMethod) {
  paymentMethodButton = paymentMethod + "Button";

  $(".paymentMethodButton").css({
    "background-color": "white",
    "border": "solid 0.1vh rgb(42, 57, 86)",
    "color": "#2A3956"
  })

  $("#"+paymentMethodButton).css({
    "background-color": "rgb(42, 57, 86)",
    "border": "solid 0.1vh rgb(42, 57, 86)",
    "color": "white"
  })

}

function hideTestingConsoleClicked() {
  $(".test-controller-container").css({
    "height": "9vh",
    "overflow-y": "hidden",
  });

  $(".chevron-hide-button").css({
    "display": "none",
  })

  $(".chevron-expand-button").css({
    "display": "inline-block",
  })
}

function expandTestingConsoleClicked() {
  $(".chevron-expand-button").css({
    "display": "inline-display",
  })

  $(".test-controller-container").css({
    "height": "40vh",
    "overflow-y": "auto",
  });

  $(".chevron-expand-button").css({
    "display": "none",
  })

  $(".chevron-hide-button").css({
    "display": "inline-block",
  })
}

$( document ).ready(function() {
  hideTestingConsoleClicked()
});