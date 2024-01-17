document.addEventListener("DOMContentLoaded", () => {
  const addStudents = document.getElementById("addStudents");
  const allStudents = document.querySelector("tbody");

  const updateForm = document.getElementById("updateForm");

  // Function to fetch and display all students
  const fetchAllStudents = async () => {
    try {
      let scount = 1;
      const response = await fetch("/students");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      allStudents.innerHTML = "";
      
      data.forEach((student) => {
        const tbody = document.createElement("tr");
        tbody.innerHTML += `<tr><td>${scount}</td><td>${student.usn}</td><td>${student.sname}
        </td><td class="deleteS"><i class="fa-solid fa-trash"></i></td><td><a href="#popup2"><i class="fa-solid fa-pen-to-square"></i></a></td></tr>`;
  
        scount++;
        allStudents.appendChild(tbody);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  fetchAllStudents();
  

  // Add a new post
  addStudents.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usn = document.getElementById("usn").value;
    const sname = document.getElementById("sname").value;

    try {
      const response = await fetch("/students/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usn, sname }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Add response:", data);
      resetForm();
      fetchAllStudents();
      window.location.href = "#";
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding student. Please try again.");
    }
  });

// delete student id
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("fa-trash")) {
      const deleteId = e.target.parentElement.parentElement.querySelector("td:nth-child(2)").textContent;
      const confirmation = confirm(`Are you sure you want to delete student with ID ${deleteId}?`);
  
      if (confirmation) {
        try {
          const response = await fetch(`/students/delete/${deleteId}`, {
            method: "DELETE",
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log("Delete response:", data);
          fetchAllStudents(); // Refresh the list of students
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
  });

  // Update the student list
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("fa-pen-to-square")) {
      const updateId = e.target.parentElement.parentElement.parentElement.querySelector("td:nth-child(2)").textContent;
      try {
        const response = await fetch(`/students/${updateId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Update the form with the retrieved data
        document.getElementById("uusn").value = data.usn;
        document.getElementById("usname").value = data.sname;


        updateForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const updateUSN = document.getElementById("uusn").value;
          const updateSname = document.getElementById("usname").value;

          const requestBody = { usn: updateUSN, sname: updateSname };
  
          try {
            const updateResponse = await fetch(`/students/update/${updateId}`, {
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
            fetchAllStudents();// Refresh the list of students
            window.location.href = "#"; 
          } catch (updateError) {
            console.error("Update Error:", updateError);
            alert("Error updating student. Please try again.");

          }
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  });
  
  
  function resetForm() {
    document.getElementById("usn").value = "";
    document.getElementById("sname").value = "";
  }
});
