/* ============================================
   CV PAGE JAVASCRIPT
   Populate CV with Data from data.js
   Dr. Md. Nurul Islam - Professional CV
   ============================================ */

'use strict';

// ============================================
// INITIALIZE CV ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    console.log('%c🎓 CV Page Loading...', 'color: #0066cc; font-size: 16px; font-weight: bold;');

    // Check if data is available
    if (typeof EDUCATION_DATA === 'undefined') {
        console.error('❌ Error: data.js not loaded! Make sure data.js is included before script.js');
        showErrorMessage();
        return;
    }

    try {
        // Populate all CV sections
        populateEducation();
        populateExperience();
        populateHonorary();
        populateProjects();
        populatePublications();
        populateTeaching();
        populateTalks();
        populateAwards();
        populateSupervision();

        // Set last updated date
        setLastUpdated();

        console.log('%c✅ CV Page Loaded Successfully!', 'color: #28a745; font-size: 14px; font-weight: bold;');

    } catch (error) {
        console.error('❌ Error loading CV:', error);
        showErrorMessage();
    }
});

// ============================================
// ERROR MESSAGE
// ============================================
function showErrorMessage() {
    document.querySelector('.cv-container').innerHTML = `
        <div style="text-align: center; padding: 4rem; color: #dc3545;">
            <i class="fas fa-exclamation-triangle" style="font-size: 4rem; margin-bottom: 1rem;"></i>
            <h2>Error Loading CV Data</h2>
            <p>Please make sure data.js is loaded correctly.</p>
            <a href="../index.html" style="display: inline-block; margin-top: 2rem; padding: 1rem 2rem; background: #0066cc; color: white; text-decoration: none; border-radius: 5px;">
                Return to Website
            </a>
        </div>
    `;
}

// ============================================
// POPULATE EDUCATION
// ============================================
function populateEducation() {
    const container = document.getElementById('educationSection');
    if (!container || !EDUCATION_DATA) return;

    let html = '';

    EDUCATION_DATA.forEach(edu => {
        html += `
            <div class="cv-item">
                <div class="item-header">
                    <div class="item-title">${edu.degree} in ${edu.field}</div>
                    <div class="item-date">${edu.year}</div>
                </div>
                <div class="item-subtitle">${edu.institution}</div>
                ${edu.thesis ? `<div class="item-description"><strong>Dissertation/Thesis:</strong> ${edu.thesis}</div>` : ''}
                ${edu.grade ? `<div class="item-note"><strong>Grade:</strong> ${edu.grade}</div>` : ''}
            </div>
        `;
    });

    container.innerHTML = html;
}

// ============================================
// POPULATE PROFESSIONAL EXPERIENCE
// ============================================
function populateExperience() {
    const container = document.getElementById('experienceSection');
    if (!container || !EXPERIENCE_DATA) return;

    let html = '';

    EXPERIENCE_DATA.forEach(exp => {
        html += `
            <div class="cv-item">
                <div class="item-header">
                    <div class="item-title">${exp.position}</div>
                    <div class="item-date">${exp.startYear} – ${exp.endYear}</div>
                </div>
                <div class="item-institution">${exp.institution}</div>
                ${exp.department ? `<div class="item-subtitle">${exp.department}</div>` : ''}
                ${exp.current ? `<div class="item-note"><em>Current Position</em></div>` : ''}
            </div>
        `;
    });

    container.innerHTML = html;
}

// ============================================
// POPULATE HONORARY POSITIONS
// ============================================
function populateHonorary() {
    const container = document.getElementById('honorarySection');
    if (!container || !HONORARY_POSITIONS) return;

    let html = '';

    HONORARY_POSITIONS.forEach(pos => {
        html += `
            <div class="cv-item">
                <div class="item-header">
                    <div class="item-title">${pos.title}</div>
                    <div class="item-date">${pos.period}</div>
                </div>
                <div class="item-institution">${pos.organization}</div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ============================================
// POPULATE RESEARCH PROJECTS
// ============================================
function populateProjects() {
    const container = document.getElementById('projectsSection');
    if (!container || !RESEARCH_PROJECTS) return;

    let html = '';

    RESEARCH_PROJECTS.forEach(project => {
        html += `
            <div class="cv-item">
                <div class="item-header">
                    <div class="item-title">${project.title}</div>
                    <div class="item-date">${project.year}</div>
                </div>
                ${project.funder ? `<div class="item-institution"><strong>Funding Agency:</strong> ${project.funder}</div>` : ''}
                ${project.status ? `<div class="item-note"><strong>Status:</strong> ${project.status}</div>` : ''}
            </div>
        `;
    });

    container.innerHTML = html;
}

// ============================================
// POPULATE PUBLICATIONS
// ============================================
function populatePublications() {
    const container = document.getElementById('publicationsSection');
    if (!container || !ALL_PUBLICATIONS) return;

    // Sort publications by year (newest first)
    const sortedPubs = [...ALL_PUBLICATIONS].sort((a, b) =>
        parseInt(b.year) - parseInt(a.year)
    );

    // Display top 35 publications for CV
    const displayPubs = sortedPubs.slice(0, 35);

    let html = '';

    displayPubs.forEach((pub, index) => {
        html += `
            <div class="publication-item">
                <span class="pub-authors">${pub.authors}</span>
                <span class="pub-year">(${pub.year}).</span>
                <span class="pub-title">${pub.title}.</span>
                <span class="pub-journal">${pub.journal}.</span>
                ${pub.doi ? `<span class="pub-doi">DOI: ${pub.doi}</span>` : ''}
            </div>
        `;
    });

    if (ALL_PUBLICATIONS.length > 35) {
        html += `
            <p class="item-note" style="margin-top: 1.5rem; padding: 1rem; background: #f8f9fa; border-left: 3px solid #0066cc; border-radius: 4px;">
                <i class="fas fa-info-circle"></i> 
                <strong>Note:</strong> Plus ${ALL_PUBLICATIONS.length - 35} additional publications. 
                Complete publication list available upon request.
            </p>
        `;
    }

    container.innerHTML = html;
}

// ============================================
// POPULATE TEACHING
// ============================================
function populateTeaching() {
    const container = document.getElementById('teachingSection');
    if (!container || !TEACHING_COURSES) return;

    let html = '<div class="teaching-grid">';

    TEACHING_COURSES.forEach(course => {
        html += `
            <div class="teaching-item">
                <div class="course-title">${course.course}</div>
                <div class="course-code">${course.year}${course.code ? ' • ' + course.code : ''}</div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

// ============================================
// POPULATE TALKS & PRESENTATIONS
// ============================================
function populateTalks() {
    const container = document.getElementById('talksSection');
    if (!container) return;

    // Combine all talks and workshops
    const allTalks = [
        ...(TALKS_DATA || []),
        ...(WORKSHOPS_DATA || []),
        ...(MEDIA_APPEARANCES || [])
    ];

    if (allTalks.length === 0) {
        container.innerHTML = '<p class="item-note">Information not available</p>';
        return;
    }

    // Sort by year (newest first)
    allTalks.sort((a, b) => parseInt(b.year) - parseInt(a.year));

    let html = '';

    allTalks.forEach(talk => {
        html += `
            <div class="talk-item">
                <div class="talk-title">${talk.title}</div>
                <div class="talk-details">
                    ${talk.event || talk.organization || ''} 
                    ${talk.location ? ' • ' + talk.location : ''} 
                    • ${talk.year}
                    ${talk.date ? ' (' + talk.date + ')' : ''}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ============================================
// POPULATE AWARDS & HONORS
// ============================================
function populateAwards() {
    const container = document.getElementById('awardsSection');
    if (!container || !AWARDS_DATA) return;

    let html = '';

    AWARDS_DATA.forEach(award => {
        html += `
            <div class="cv-item">
                <div class="item-header">
                    <div class="item-title">${award.title}</div>
                    <div class="item-date">${award.year}</div>
                </div>
                <div class="item-institution">${award.organization}</div>
                ${award.description ? `<div class="item-description">${award.description}</div>` : ''}
            </div>
        `;
    });

    container.innerHTML = html;
}

// ============================================
// POPULATE STUDENT SUPERVISION
// ============================================
function populateSupervision() {
    const container = document.getElementById('supervisionSection');
    if (!container || !STUDENTS_DATA) return;

    // Calculate statistics
    const phdStudents = STUDENTS_DATA.filter(s => s.level === 'PhD' || s.level === 'MPhil');
    const mscStudents = STUDENTS_DATA.filter(s => s.level === 'MSc');
    const bscStudents = STUDENTS_DATA.filter(s => s.level === 'BSc' || s.level === 'BA');

    let html = `
        <div class="supervision-summary">
            <i class="fas fa-graduation-cap"></i>
            <strong>Total Students Supervised: ${STUDENTS_DATA.length}</strong> 
            (PhD/MPhil: ${phdStudents.length} | MSc: ${mscStudents.length} | BSc: ${bscStudents.length})
        </div>
    `;

    // PhD/MPhil Students
    if (phdStudents.length > 0) {
        html += `
            <h3 style="margin: 1.5rem 0 1rem; font-size: 14pt; color: var(--color-primary); font-family: var(--font-serif);">
                PhD & MPhil Students
            </h3>
        `;

        phdStudents.forEach(student => {
            html += `
                <div class="student-item">
                    <div>
                        <span class="student-name">${student.name}</span>
                        <span class="student-level">${student.level}</span>
                        <span class="item-date" style="margin-left: 1rem; font-size: 10pt;">${student.year}</span>
                    </div>
                    <div class="student-thesis"><strong>Thesis:</strong> ${student.thesis}</div>
                    ${student.status ? `<div class="item-note"><strong>Status:</strong> ${student.status}</div>` : ''}
                </div>
            `;
        });
    }

    // MSc Students (show first 12)
    if (mscStudents.length > 0) {
        html += `
            <h3 style="margin: 1.5rem 0 1rem; font-size: 14pt; color: var(--color-primary); font-family: var(--font-serif);">
                MSc Students (Selected)
            </h3>
        `;

        mscStudents.slice(0, 12).forEach(student => {
            html += `
                <div class="student-item">
                    <div>
                        <span class="student-name">${student.name}</span>
                        <span class="student-level">${student.level}</span>
                        <span class="item-date" style="margin-left: 1rem; font-size: 10pt;">${student.year}</span>
                    </div>
                    <div class="student-thesis"><strong>Thesis:</strong> ${student.thesis}</div>
                </div>
            `;
        });

        if (mscStudents.length > 12) {
            html += `<p class="item-note" style="margin-top: 1rem;"><em>Plus ${mscStudents.length - 12} additional MSc students</em></p>`;
        }
    }

    container.innerHTML = html;
}

// ============================================
// SET LAST UPDATED DATE
// ============================================
function setLastUpdated() {
    const dateElement = document.getElementById('lastUpdated');
    if (!dateElement) return;

    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);

    dateElement.textContent = formattedDate;
}

// ============================================
// DOWNLOAD PDF FUNCTION
// ============================================
function downloadPDF() {
    // Simply trigger the print dialog
    // Users can save as PDF from the print dialog
    window.print();
}

// ============================================
// CONSOLE BRANDING
// ============================================
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #0066cc;');
console.log('%c🎓 Dr. Md. Nurul Islam - Curriculum Vitae', 'color: #1a1a1a; font-size: 16px; font-weight: bold;');
console.log('%cProfessor of Geography and Environment', 'color: #666; font-size: 14px;');
console.log('%cJahangirnagar University, Bangladesh', 'color: #999; font-size: 12px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #0066cc;');
console.log('%c✅ CV Script Loaded Successfully', 'color: #28a745; font-size: 12px; font-weight: bold;');