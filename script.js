
document.addEventListener("DOMContentLoaded", () => {
    const resumeForm = document.getElementById("resumeForm");
    const resumeList = document.getElementById("resumeList");

    resumeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const experience = document.querySelector('input[name="experience"]:checked').value;
        const gender = document.getElementById("gender").value;
        const project = document.getElementById("project").value;
        const dob = document.getElementById("dob").value;

        const resume = {
            name,
            age,
            experience,
            gender,
            project,
            dob,
        };
        saveResume(resume);
        resumeForm.reset();
        renderResumeList();
    });
       //for saving and pushing in array
    function saveResume(resume) {
        let resumes = JSON.parse(localStorage.getItem("resumes")) || [];
        resumes.push(resume);
        console.log(resumes);
        localStorage.setItem("resumes", JSON.stringify(resumes));
    }

    function renderResumeList() {
        resumeList.innerHTML = "";

        const resumes = JSON.parse(localStorage.getItem("resumes")) || [];

        for (let i = 0; i < resumes.length; i++) {
            const resume = resumes[i];
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                Name: ${resume.name}
                <button class="view" data-index="${i}">View Resume</button>
                <button class="delete" data-index="${i}">Delete</button>
                <button class="Edit" data-index="${i}">Edit</button>
            `;

            resumeList.appendChild(listItem);
        }
    }

    resumeList.addEventListener("click", (e) => {
        if (e.target.classList.contains("view")) {
            const index = e.target.getAttribute("data-index");
            
            viewResume(index);
        } else if (e.target.classList.contains("delete")) {
            const index = e.target.getAttribute("data-index");
            console.log(index);
            deleteResume(index);
        }
    });

   function viewResume(index) {
    const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
    const selectedResume = resumes[index];
    if (selectedResume) {

        const resumeData = JSON.stringify(selectedResume);

        console.log(resumeData);
        window.location.href = `resume.html?resumeData=${resumeData}`;
    } else {
        console.error("Selected resume not found.");
    }
}
    function deleteResume(index) {
        const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
        resumes.splice(index, 1);
        localStorage.setItem("resumes", JSON.stringify(resumes));
        renderResumeList();
    }
    renderResumeList();
});









//resume.html
const urlParams = new URLSearchParams(window.location.search);
const resumeData = urlParams.get("resumeData");

if (resumeData) {

    const resume = JSON.parse(resumeData);
    console.log(resume);


    const resumeDetails = document.getElementById("resumeDetails");
    resumeDetails.innerHTML = `
    <div class="resume-container">
    <h1>Resume</h1>
    <div class="resume-section">
        <div class="resume-label">Name:</div>
        <div class="resume-data">${resume.name}</div>
    </div>
    <div class="resume-section">
        <div class="resume-label">Age:</div>
        <div class="resume-data">${resume.age}</div>
    </div>
    <div class="resume-section">
        <div class="resume-label">Experience:</div>
        <div class="resume-data">${resume.experience}</div>
    </div>
    <div class="resume-section">
        <div class="resume-label">Gender:</div>
        <div class="resume-data">${resume.gender}</div>
    </div>
    <div class="resume-section">
        <div class="resume-label">Project:</div>
        <div class="resume-data">${resume.project}</div>
    </div>
    <div class="resume-section">
        <div class="resume-label">Date of Birth:</div>
        <div class="resume-data">${resume.dob}</div>
    </div>
</div>
        
    `;
    
} else {
    console.error("Resume data not found in query parameter.");
}