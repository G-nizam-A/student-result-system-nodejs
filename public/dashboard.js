document.addEventListener("DOMContentLoaded", () => {
    const StudentCount = document.getElementById("StudentCount");
    const SubjectCount = document.getElementById("SubjectCount");
    
    // Function to fetch and display all subjects
    const fetchCount = async () => {
      try {
        const response = await fetch("/count");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        StudentCount.textContent = data[0].StudentCount;
        SubjectCount.textContent = data[0].SubjectCount;
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCount();
  });
  