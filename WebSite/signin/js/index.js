//Problem: Hints are shown even when form is valid
//Solution: Hide and show them at appropriate times
var $password = $("#password");
var $confirmPassword = $("#confirm_password");

//Hide hints
$("form span").hide();

function isPasswordValid() {
  return $password.val().length > 8;
}

function arePasswordsMatching() {
  return $password.val() === $confirmPassword.val();
}

function canSubmit() {
  // return isPasswordValid();
}

function passwordEvent() {
  //Find out if password is valid  
  if (isPasswordValid()) {
    //Hide hint if valid
    $password.next().hide();
  } else {
    //else show hint
    $password.next().show();
  }
}

function confirmPasswordEvent() {
  //Find out if password and confirmation match
  if (arePasswordsMatching()) {
    //Hide hint if match
    $confirmPassword.next().hide();
  } else {
    //else show hint 
    $confirmPassword.next().show();
  }
}

function enableSubmitEvent() {
  $("#submit").prop("disabled", !canSubmit());
}

function submitButtonAction() {

  $("form span").show();
  // Request (GET http://127.0.0.1:3000/signIn)

  jQuery.ajax({
    url: "http://127.0.0.1:3000/users/login",
    type: "POST",
    dataType: "json",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    contentType: "application/json",
    data: JSON.stringify({
      "email": "umer@iba.com",
      "password": "123123"
    })
  })
    .done(function (data, textStatus, jqXHR) {
      console.log("HTTP Request Succeeded: " + jqXHR.status);
      console.log(data);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("HTTP Request Failed");
    })
    .always(function () {
      /* ... */
    });



}

//When event happens on password input
$password.focus(passwordEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

//When event happens on confirmation input
$confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

enableSubmitEvent();