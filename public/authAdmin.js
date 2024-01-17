const getLoggingData = localStorage.getItem("isLoggedIn");
if (getLoggingData !== "true") {
  window.location = "./admin-page.html";
}
