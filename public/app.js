let popupContainers = document.querySelectorAll(".popup-container");

popupContainers.forEach((popupContainer) => {
  popupContainer.addEventListener("click", function (event) {
    if (event.target === this) {
      window.location.href = "#";
    }
  });
});


function validateLogin() {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let errorMessage = document.getElementById("errorMessage");

  if (username !== "admin") {
    errorMessage.innerText = "Invalid username. Please try again.";
  } else if (password !== "admin@123") {
    errorMessage.innerText = "Invalid password. Please try again.";
  } else {
    localStorage.setItem("isLoggedIn", "true");
    window.location = "./dashboard.html";
  }
}

function logOut() {
  localStorage.removeItem("isLoggedIn");
  window.location = "./admin-page.html";
}
