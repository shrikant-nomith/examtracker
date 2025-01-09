// tracker.js

// DOM Elements
const subjectsDiv = document.getElementById("subjects");
const addSubjectButton = document.getElementById("addSubject");

// Load saved subjects from localStorage
const subjects = JSON.parse(localStorage.getItem("subjects")) || [];

// Create a new subject block
function createSubject(subjectData, index) {
  const subjectDiv = document.createElement("div");
  subjectDiv.classList.add("subject");

  subjectDiv.innerHTML = `
    <h3>Subject: <input type="text" value="${subjectData.name}" class="subjectName"></h3>
    <label>Lectures:</label>
    <input type="number" class="totalLectures" placeholder="Total" value="${subjectData.totalLectures}">
    <input type="number" class="completedLectures" placeholder="Completed" value="${subjectData.completedLectures}">
    <br>
    <label>Practice Questions:</label>
    <input type="number" class="totalQuestions" placeholder="Total" value="${subjectData.totalQuestions}">
    <input type="number" class="completedQuestions" placeholder="Completed" value="${subjectData.completedQuestions}">
    <br>
    <label>PYQs:</label>
    <input type="number" class="totalPYQs" placeholder="Total" value="${subjectData.totalPYQs}">
    <input type="number" class="completedPYQs" placeholder="Completed" value="${subjectData.completedPYQs}">
    <br>
    <div class="progress-bar">
      <div class="progress-bar-fill" style="width: ${subjectData.percentage || 0}%;">${subjectData.percentage || 0}%</div>
    </div>
    <button class="saveSubject" data-index="${index}">Save</button>
  `;

  subjectsDiv.appendChild(subjectDiv);

  // Attach event listener for save button
  subjectDiv.querySelector(".saveSubject").addEventListener("click", () => saveSubject(index));
}

// Save subject data
function saveSubject(index) {
  const subjectDiv = subjectsDiv.children[index];
  const name = subjectDiv.querySelector(".subjectName").value;
  const totalLectures = +subjectDiv.querySelector(".totalLectures").value || 0;
  const completedLectures = +subjectDiv.querySelector(".completedLectures").value || 0;
  const totalQuestions = +subjectDiv.querySelector(".totalQuestions").value || 0;
  const completedQuestions = +subjectDiv.querySelector(".completedQuestions").value || 0;
  const totalPYQs = +subjectDiv.querySelector(".totalPYQs").value || 0;
  const completedPYQs = +subjectDiv.querySelector(".completedPYQs").value || 0;

  // Calculate overall progress percentage
  const totalTasks = totalLectures + totalQuestions + totalPYQs;
  const completedTasks = completedLectures + completedQuestions + completedPYQs;
  const percentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Update subject data
  subjects[index] = {
    name,
    totalLectures,
    completedLectures,
    totalQuestions,
    completedQuestions,
    totalPYQs,
    completedPYQs,
    percentage
  };

  // Save to localStorage and update UI
  localStorage.setItem("subjects", JSON.stringify(subjects));
  updateSubjectsUI();
}

// Update the subjects UI
function updateSubjectsUI() {
  subjectsDiv.innerHTML = "";
  subjects.forEach((subject, index) => createSubject(subject, index));
}

// Add a new subject
addSubjectButton.addEventListener("click", () => {
  subjects.push({
    name: "New Subject",
    totalLectures: 0,
    completedLectures: 0,
    totalQuestions: 0,
    completedQuestions: 0,
    totalPYQs: 0,
    completedPYQs: 0,
    percentage: 0
  });
  localStorage.setItem("subjects", JSON.stringify(subjects));
  updateSubjectsUI();
});

// Initialize
updateSubjectsUI();
