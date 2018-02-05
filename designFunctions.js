function clickPaymentMethodButton(paymentMethod) {
  console.log(paymentMethod)
  paymentMethodSelected = paymentMethod;
  highlightButtonClicked(paymentMethod)
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