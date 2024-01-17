
document.addEventListener("DOMContentLoaded", () => {
    getPreviousData();
    const addMarks = document.getElementById("addMarks");
    const allMarks = document.querySelector("tbody");
    const updateForm = document.getElementById("updateForm");

    // Function to fetch and display all marks
    const fetchAllMarks = async () => {
        try {
          let scount = 1;
          const response = await fetch("/marks");
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          allMarks.innerHTML = "";
      
          data.forEach((mark) => {
            const tbody = document.createElement("tr");
            tbody.innerHTML += `<tr><td>${scount}</td><td style="display:none">${mark.mark_id}</td><td>${mark.usn}</td><td>${mark.subject_code}</td><td>${mark.semester}</td><td>${mark.marks_obtained}</td>
            <td class="deleteS"><i class="fa-solid fa-trash"></i></td><td><a href="#popup2"><i class="fa-solid fa-pen-to-square"></i></a></td></tr>`;
      
            scount++;
            allMarks.appendChild(tbody);
          });
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchAllMarks();
      
    // Add a new post
    addMarks.addEventListener("submit", async (e) => {
      e.preventDefault();
      const usn = document.getElementById("usn").value;
      const subject_code = document.getElementById("subject_code").value;
      const semester = document.getElementById("semester").value;
      const marks_obtained = document.getElementById("marks_obtained").value;
  
      try {
        const response = await fetch("/marks/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usn, subject_code, semester, marks_obtained }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Add response:", data);
        resetForm();
        fetchAllMarks();
        window.location.href = "#";
      } catch (error) {
        console.error("Error:", error);
        alert("Error adding mark. Please try again.");
      }
    });
  
  // delete mark id
    document.addEventListener("click", async (e) => {
      if (e.target.classList.contains("fa-trash")) {
        const deleteId = e.target.parentElement.parentElement.querySelector("td:nth-child(2)").textContent;
        const confirmation = confirm(`Are you sure you want to delete mark with ID ${deleteId}?`);
    
        if (confirmation) {
          try {
            const response = await fetch(`/marks/delete/${deleteId}`, {
              method: "DELETE",
            });
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Delete response:", data);
            fetchAllMarks(); // Refresh the list of marks
          } catch (error) {
            console.error("Error:", error);
          }
        }
      }
    });
  // Update the mark list
  let updateId;
    document.addEventListener("click", async (e) => {
        if (e.target.classList.contains("fa-pen-to-square")) {
            updateId = e.target.parentElement.parentElement.parentElement.querySelector("td:nth-child(2)").textContent;
        try {
            const response = await fetch(`/marks/${updateId}`);
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
    
            // Update the form with the retrieved data
            document.getElementById("uusn").value = data.usn;
            document.getElementById("usubject_code").value = data.subject_code;
            document.getElementById("usemester").value = data.semester;
            document.getElementById("umarks_obtained").value = data.marks_obtained;
        
        } catch (error) {
            console.error("Error:", error);
        }
    }
  });
  
  // Add the updateForm event listener outside the click event listener
  updateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usn = document.getElementById("uusn").value;
    const subject_code = document.getElementById("usubject_code").value;
    const semester = document.getElementById("usemester").value;
    const marks_obtained = document.getElementById("umarks_obtained").value;
  
    const requestBody = { usn, subject_code, semester, marks_obtained };
  
    try {
      const updateResponse = await fetch(`/marks/update/${updateId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!updateResponse.ok) {
        throw new Error(`HTTP error! Status: ${updateResponse.status}`);
      }
  
      const updateData = await updateResponse.json();
      console.log("Update response:", updateData);
      resetForm();
      fetchAllMarks(); // Refresh the list of marks
      window.location.href = "#";
    } catch (updateError) {
      console.error("Update Error:", updateError);
      alert("Error updating mark. Please try again.");
    }
  });
    
    function resetForm() {
      document.getElementById("usn").value = "";
      document.getElementById("subject_code").value = "";
      document.getElementById("semester").value = "";
      document.getElementById("marks_obtained").value = "";
    }

    async function fetchAndPopulateOptions(url, targetSelect, valueProperty) {
        try {
          const response = await fetch(url);
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
      
          data.forEach(item => {
            const option = document.createElement("option");
            option.value = item[valueProperty];
            option.textContent = item[valueProperty];
            targetSelect.appendChild(option);
          });
      
        } catch (error) {
          console.error("Error:", error);
        }
      }
      
      async function getPreviousData() {
        const usnSelect = document.getElementById("usn");
        const subject_codeSelect = document.getElementById("subject_code");
        const uusnSelect = document.getElementById("uusn");
        const usubject_codeSelect = document.getElementById("usubject_code");
      
        await fetchAndPopulateOptions("/students", usnSelect, "usn");
        await fetchAndPopulateOptions("/students", uusnSelect, "usn");
        await fetchAndPopulateOptions("/subjects", subject_codeSelect, "subject_code");
        await fetchAndPopulateOptions("/subjects", usubject_codeSelect, "subject_code");
      }
  });
  