document.addEventListener("DOMContentLoaded", () => {
  let popupContainer = document.querySelector(".popup-container");

  popupContainer.addEventListener("click", function (event) {
    if (event.target === this) {
      window.location.href = "#";
    }
  });

  const searchResult = document.getElementById("searchResult");
  const allResults = document.querySelector("tbody");
  const display = document.querySelectorAll("span");
  // Function to fetch and display result
  searchResult.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("usn").value;
    const semester = document.getElementById("semester").value;
    try {

      const response = await fetch(`/result?id=${id}&sem=${semester}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
  
      if (!data || Object.keys(data).length === 0) {
        throw new Error("Invalid USN or SEM");
      }
  
      window.location.href = "#popup1";

      allResults.innerHTML = "";

      data.forEach((result) => {
        const tbody = document.createElement("tr");
        tbody.innerHTML += `<tr><td>${result.subject_code}</td><td>${result.subject_name}</td><td>${result.marks_obtained}</td></tr>`;
        display[0].textContent = result.sname;
        display[1].textContent = id;
        display[2].textContent = semester;
        allResults.appendChild(tbody);
      });

      const totalMarks = data.length * 100;
      const obtainedMarks = data.reduce((sum, subject) => sum + subject.marks_obtained,0);
      
      const percentage = (obtainedMarks / totalMarks) * 100;

      display[3].textContent = obtainedMarks + "/" + totalMarks;

      if (percentage >= 35) {
        display[4].style.color = "green";
      } else {
        display[4].style.color = "red";
      }

      // Determine class status
      if (percentage >= 75) {
        display[4].textContent = "Distinction";
      } else if (percentage >= 60) {
        display[4].textContent = "First Class with Distinction";
      } else if (percentage >= 50) {
        display[4].textContent = "First Class";
      } else if (percentage >= 35) {
        display[4].textContent = "Second Class";
      } else {
        display[4].textContent = "Fail";
      }
    } catch (error) {
      alert(error)
      console.error("Error:", error);
    }
  });
});
