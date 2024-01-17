document.addEventListener("DOMContentLoaded", () => {
    const addSubjects = document.getElementById("addSubjects");
    const allSubjects = document.querySelector("tbody");
    const updateForm = document.getElementById("updateForm");
    
    // Function to fetch and display all subjects
    const fetchAllSubjects = async () => {
      try {
        let scount = 1;
        const response = await fetch("/subjects");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        allSubjects.innerHTML = "";
    
        data.forEach((subject) => {
          const tbody = document.createElement("tr");
          tbody.innerHTML += `<tr><td>${scount}</td><td>${subject.subject_code}</td><td>${subject.subject_name}</td><td>${subject.department}</td>
          <td class="deleteS"><i class="fa-solid fa-trash"></i></td><td><a href="#popup2"><i class="fa-solid fa-pen-to-square"></i></a></td></tr>`;
    
          scount++;
          allSubjects.appendChild(tbody);
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchAllSubjects();
    
  
    // Add a new subject
    addSubjects.addEventListener("submit", async (e) => {
      e.preventDefault();
      const subject_code = document.getElementById("subject_code").value;
      const subject_name = document.getElementById("subject_name").value;
      const department = document.getElementById("department").value;
  
      try {
        const response = await fetch("/subjects/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subject_code, subject_name, department }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Add response:", data);
        resetForm();
        fetchAllSubjects();
        window.location.href = "#";
      } catch (error) {
        console.error("Error:", error);
        alert("Error adding subject. Please try again.");
      }
    });
  
  // delete subject id
    document.addEventListener("click", async (e) => {
      if (e.target.classList.contains("fa-trash")) {
        const deleteId = e.target.parentElement.parentElement.querySelector("td:nth-child(2)").textContent;
        const confirmation = confirm(`Are you sure you want to delete subject with ID ${deleteId}?`);
    
        if (confirmation) {
          try {
            const response = await fetch(`/subjects/delete/${deleteId}`, {
              method: "DELETE",
            });
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Delete response:", data);
            fetchAllSubjects(); // Refresh the list of students
          } catch (error) {
            console.error("Error:", error);
          }
        }
      }
    });
  
    // Update the subject list
    document.addEventListener("click", async (e) => {
      if (e.target.classList.contains("fa-pen-to-square")) {
        const updateId = e.target.parentElement.parentElement.parentElement.querySelector("td:nth-child(2)").textContent;
        try {
          const response = await fetch(`/subjects/${updateId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
  
          // Update the form with the retrieved data
          document.getElementById("usubject_code").value = data.subject_code;
          document.getElementById("usubject_name").value = data.subject_name;
          document.getElementById("udepartment").value = data.department;
  
  
          updateForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const subject_code = document.getElementById("usubject_code").value;
            const subject_name = document.getElementById("usubject_name").value;
            const department = document.getElementById("udepartment").value;
  
            const requestBody = { subject_code, subject_name, department };
    
            try {
              const updateResponse = await fetch(`/subjects/update/${updateId}`, {
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
              fetchAllSubjects();// Refresh the list of students
              window.location.href = "#"; 
            } catch (updateError) {
              console.error("Update Error:", updateError);
              alert("Error updating subject. Please try again.");
  
            }
          });
        } catch (error) {
          console.error("Error:", error);
        }
      }
    });
    
    
    function resetForm() {
      document.getElementById("subject_code").value = "";
      document.getElementById("subject_name").value = "";
      document.getElementById("department").value = "";
    }
  });
  