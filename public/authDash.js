const getLoggingData = localStorage.getItem("isLoggedIn");
if (getLoggingData === "true") {
  window.location = "./dashboard.html";
}
