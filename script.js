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
                                                                                                                                    
        const skillsSelect = document.getElementById("skills");
        const selectedSkills = Array.from(skillsSelect.selectedOptions).map(option => option.value);
        const resume = {
            name,
            age,
            experience,
            gender,
            project,
            dob,
            skills: selectedSkills,
        };

        const editIndex = parseInt(resumeForm.dataset.editIndex);
        if (editIndex >= 0) {
            const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
            resumes[editIndex] = resume;
            localStorage.setItem("resumes", JSON.stringify(resumes));
            resumeForm.dataset.editIndex = -1;
        } else {
            saveResume(resume);
        }
        resumeForm.reset();
        renderResumeList();
    });

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
    <div class="resume-container">
        <div class="resume-info">
            <p>Name: ${resume.name}</p>
            <p>Age: ${resume.age}</p>
            <p>Experience: ${resume.experience}</p>
            <p>DOB: ${resume.dob}</p>
        </div>
        <div class="resume-actions">
            <button class="view" data-index="${i}">View Resume</button>
            <button class="delete" data-index="${i}">Delete</button>
            <button class="edit" data-index="${i}">Edit</button>
        </div>
    </div>
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
        else if (e.target.classList.contains("edit")) {
            const index = e.target.getAttribute("data-index");
            const selectedResume = JSON.parse(localStorage.getItem("resumes"))[index];
        

            document.getElementById("name").value = selectedResume.name;
            document.getElementById("age").value = selectedResume.age;
        
         
            const experienceRadios = document.querySelectorAll('input[name="experience"]');
            for (const radio of experienceRadios) {
                if (radio.value === selectedResume.experience) {
                    radio.checked = true;
                    break; 
                }
            }

            document.getElementById("gender").value = selectedResume.gender;
            document.getElementById("project").value = selectedResume.project;
            document.getElementById("dob").value = selectedResume.dob;
        
            resumeForm.dataset.editIndex = index;
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
        <div class="resume-section">
            <div class="resume-label">Skills:</div>
            <div class="resume-data">
                <ul>
                    ${resume.skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>
    `;
} else {
    console.error("Resume data not found in query parameter.");
}
