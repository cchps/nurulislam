/* ============================================
   CV GENERATOR - Professional Academic CV
   Clean Black & White US Professor Style
   ============================================ */

'use strict';

// ============================================
// CV GENERATION FUNCTION
// ============================================
async function generateCV() {
    console.log('Starting CV generation...');

    // Create CV HTML
    const cvHTML = createCVHTML();

    // Create temporary container
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cvHTML;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '210mm';
    tempDiv.style.background = 'white';
    document.body.appendChild(tempDiv);

    // Wait for fonts to load
    await document.fonts.ready;

    // PDF options
    const opt = {
        margin: [10, 10, 10, 10],
        filename: 'Dr_Nurul_Islam_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            backgroundColor: '#ffffff'
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            compress: true
        },
        pagebreak: {
            mode: ['avoid-all', 'css', 'legacy'],
            before: '.cv-section'
        }
    };

    try {
        // Generate PDF
        await html2pdf().set(opt).from(tempDiv).save();

        console.log('CV generated successfully!');

        // Show success message
        showToast('Success!', 'CV downloaded successfully as PDF', 'success');
    } catch (error) {
        console.error('Error generating PDF:', error);
        showToast('Error', 'Failed to generate CV. Please try again.', 'error');
    } finally {
        // Clean up
        document.body.removeChild(tempDiv);
    }
}

// ============================================
// CREATE CV HTML
// ============================================
function createCVHTML() {
    return `
        <div class="cv-container">
            ${generateCVHeader()}
            ${generateCVEducation()}
            ${generateCVExperience()}
            ${generateCVExpertise()}
            ${generateCVResearch()}
            ${generateCVPublications()}
            ${generateCVTeaching()}
            ${generateCVAwards()}
            ${generateCVSupervision()}
        </div>
    `;
}

// ============================================
// CV HEADER
// ============================================
function generateCVHeader() {
    return `
        <div class="cv-header">
            <h1>Dr. Md. Nurul Islam</h1>
            <div class="cv-subtitle">Professor of Geography and Environment</div>
            <div class="cv-subtitle">Department of Geography and Environment</div>
            <div class="cv-subtitle">Jahangirnagar University, Savar, Dhaka-1342, Bangladesh</div>
            <div class="cv-contact">
                <span>Email: nurul.islam@juniv.edu</span>
                <span>|</span>
                <span>Phone: +880-1711-962342</span>
            </div>
        </div>
    `;
}

// ============================================
// EDUCATION SECTION
// ============================================
function generateCVEducation() {
    if (!EDUCATION_DATA) return '';

    let html = `
        <div class="cv-section">
            <h2 class="cv-section-title">Education</h2>
    `;

    EDUCATION_DATA.forEach(edu => {
        html += `
            <div class="cv-item">
                <div class="cv-item-header">
                    <div class="cv-item-title">${edu.degree} in ${edu.field}</div>
                    <div class="cv-item-date">${edu.year}</div>
                </div>
                <div class="cv-item-subtitle">${edu.institution}</div>
                ${edu.thesis ? `<div class="cv-item-description">Thesis: ${edu.thesis}</div>` : ''}
                ${edu.grade ? `<div class="cv-item-description">Grade: ${edu.grade}</div>` : ''}
            </div>
        `;
    });

    html += `</div>`;
    return html;
}

// ============================================
// EXPERIENCE SECTION
// ============================================
function generateCVExperience() {
    if (!EXPERIENCE_DATA) return '';

    let html = `
        <div class="cv-section">
            <h2 class="cv-section-title">Professional Experience</h2>
    `;

    EXPERIENCE_DATA.forEach(exp => {
        html += `
            <div class="cv-item">
                <div class="cv-item-header">
                    <div class="cv-item-title">${exp.position}</div>
                    <div class="cv-item-date">${exp.startYear} - ${exp.endYear}</div>
                </div>
                <div class="cv-item-subtitle">${exp.institution}</div>
                ${exp.department ? `<div class="cv-item-description">${exp.department}</div>` : ''}
            </div>
        `;
    });

    // Add Honorary Positions
    if (HONORARY_POSITIONS && HONORARY_POSITIONS.length > 0) {
        html += `<div style="margin-top: 15px;"><strong>Honorary Positions:</strong></div>`;
        HONORARY_POSITIONS.forEach(pos => {
            html += `
                <div class="cv-item">
                    <div class="cv-item-header">
                        <div class="cv-item-title">${pos.title}</div>
                        <div class="cv-item-date">${pos.period}</div>
                    </div>
                    <div class="cv-item-subtitle">${pos.organization}</div>
                </div>
            `;
        });
    }

    html += `</div>`;
    return html;
}

// ============================================
// EXPERTISE SECTION
// ============================================
function generateCVExpertise() {
    const expertiseAreas = [
        'GIS & Remote Sensing',
        'Climate Change Research',
        'Floodplain Management',
        'Environmental Analysis',
        'Disaster Management',
        'Research Methodology'
    ];

    const researchInterests = [
        'Climate Change Impacts',
        'Land Use Dynamics',
        'Environmental Degradation',
        'Agricultural Hazards',
        'Water & Sanitation',
        'Natural Disasters',
        'Rural Livelihood',
        'Floodplain Sedimentation',
        'Ecosystem Services',
        'Watershed Management'
    ];

    let html = `
        <div class="cv-section">
            <h2 class="cv-section-title">Areas of Expertise</h2>
            <div class="cv-skills-grid">
    `;

    expertiseAreas.forEach(area => {
        html += `<div class="cv-skill-item">${area}</div>`;
    });

    html += `
            </div>
            <div style="margin-top: 15px;"><strong>Research Interests:</strong></div>
            <div class="cv-skills-grid" style="margin-top: 8px;">
    `;

    researchInterests.forEach(interest => {
        html += `<div class="cv-skill-item">${interest}</div>`;
    });

    html += `
            </div>
        </div>
    `;

    return html;
}

// ============================================
// RESEARCH PROJECTS SECTION
// ============================================
function generateCVResearch() {
    if (!RESEARCH_PROJECTS) return '';

    let html = `
        <div class="cv-section">
            <h2 class="cv-section-title">Research Projects</h2>
    `;

    RESEARCH_PROJECTS.forEach(project => {
        html += `
            <div class="cv-item">
                <div class="cv-item-header">
                    <div class="cv-item-title">${project.title}</div>
                    <div class="cv-item-date">${project.year}</div>
                </div>
                ${project.funder ? `<div class="cv-item-subtitle">Funded by: ${project.funder}</div>` : ''}
                ${project.status ? `<div class="cv-item-description">Status: ${project.status}</div>` : ''}
            </div>
        `;
    });

    html += `</div>`;
    return html;
}

// ============================================
// PUBLICATIONS SECTION
// ============================================
function generateCVPublications() {
    if (!ALL_PUBLICATIONS) return '';

    // Sort publications by year (newest first)
    const sortedPubs = [...ALL_PUBLICATIONS].sort((a, b) => parseInt(b.year) - parseInt(a.year));

    // Limit to most recent 30 publications for CV
    const recentPubs = sortedPubs.slice(0, 30);

    let html = `
        <div class="cv-section">
            <h2 class="cv-section-title">Selected Publications (${recentPubs.length} of ${ALL_PUBLICATIONS.length})</h2>
    `;

    recentPubs.forEach((pub, index) => {
        html += `
            <div class="cv-publication">
                <span class="cv-publication-authors">${pub.authors}</span> 
                (${pub.year}). 
                <span class="cv-publication-title">${pub.title}.</span> 
                <span class="cv-publication-journal">${pub.journal}.</span>
                ${pub.doi ? ` DOI: ${pub.doi}` : ''}
            </div>
        `;
    });

    if (ALL_PUBLICATIONS.length > 30) {
        html += `<div style="margin-top: 10px; font-style: italic;">Plus ${ALL_PUBLICATIONS.length - 30} additional publications</div>`;
    }

    html += `</div>`;
    return html;
}

// ============================================
// TEACHING SECTION
// ============================================
function generateCVTeaching() {
    if (!TEACHING_COURSES) return '';

    let html = `
        <div class="cv-section">
            <h2 class="cv-section-title">University Teaching</h2>
            <div class="cv-item-description">Courses Taught:</div>
            <div style="margin-top: 10px;">
    `;

    TEACHING_COURSES.forEach(course => {
        html += `
            <div class="cv-item">
                <div class="cv-item-title">${course.course}</div>
                <div class="cv-item-description">${course.year}${course.code ? ' - ' + course.code : ''}</div>
            </div>
        `;
    });

    html += `</div></div>`;
    return html;
}

// ============================================
// AWARDS SECTION
// ============================================
function generateCVAwards() {
    if (!AWARDS_DATA) return '';

    let html = `
        <div class="cv-section">
            <h2 class="cv-section-title">Awards & Honors</h2>
    `;

    AWARDS_DATA.forEach(award => {
        html += `
            <div class="cv-item">
                <div class="cv-item-header">
                    <div class="cv-item-title">${award.title}</div>
                    <div class="cv-item-date">${award.year}</div>
                </div>
                <div class="cv-item-subtitle">${award.organization}</div>
                ${award.description ? `<div class="cv-item-description">${award.description}</div>` : ''}
            </div>
        `;
    });

    html += `</div>`;
    return html;
}

// ============================================
// SUPERVISION SECTION
// ============================================
function generateCVSupervision() {
    if (!STUDENTS_DATA) return '';

    const phdStudents = STUDENTS_DATA.filter(s => s.level === 'PhD' || s.level === 'MPhil');
    const mscStudents = STUDENTS_DATA.filter(s => s.level === 'MSc');

    let html = `
        <div class="cv-section">
            <h2 class="cv-section-title">Student Supervision</h2>
            <div class="cv-item-description">
                Total Students Supervised: ${STUDENTS_DATA.length} 
                (PhD/MPhil: ${phdStudents.length}, MSc: ${mscStudents.length})
            </div>
    `;

    if (phdStudents.length > 0) {
        html += `<div style="margin-top: 15px;"><strong>PhD/MPhil Students:</strong></div>`;
        phdStudents.slice(0, 10).forEach(student => {
            html += `
                <div class="cv-item">
                    <div class="cv-item-header">
                        <div class="cv-item-title">${student.name} (${student.level})</div>
                        <div class="cv-item-date">${student.year}</div>
                    </div>
                    <div class="cv-item-description">${student.thesis}</div>
                </div>
            `;
        });
    }

    html += `</div>`;
    return html;
}

// ============================================
// INITIALIZE CV DOWNLOAD
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.getElementById('downloadCVBtn');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', async function (e) {
            e.preventDefault();

            // Add loading state
            downloadBtn.classList.add('loading');
            downloadBtn.querySelector('span').textContent = 'Generating...';

            try {
                await generateCV();
            } catch (error) {
                console.error('CV generation failed:', error);
            } finally {
                // Remove loading state
                downloadBtn.classList.remove('loading');
                downloadBtn.querySelector('span').textContent = 'Download CV';
            }
        });
    }
});

console.log('%c✅ CV Generator loaded', 'color: #38A169; font-size: 12px; font-weight: bold;');