// ========================================
// GET STUDENTS
// ========================================

const students =
    JSON.parse(localStorage.getItem("students")) || [];


// ========================================
// GET SELECTED STUDENT ID
// ========================================

const studentId =
    localStorage.getItem("selectedStudentId");


// ========================================
// GET PROFILE CONTAINER
// ========================================

const studentProfile =
    document.getElementById("studentProfile");


// ========================================
// FIND STUDENT
// ========================================

const student =
    students.find(function (student) {

        return student.studentId === studentId;

    });


// ========================================
// DISPLAY STUDENT
// ========================================

if (student) {

    // Support multiple subjects
    const subjects =
        Array.isArray(student.subjects)
            ? student.subjects
            : student.subject
                ? [student.subject]
                : [];


    studentProfile.innerHTML = `

        <div class="student-profile-card">

            <h3>
                ${student.firstName || ""} ${student.surname || ""}
            </h3>

            <p>
                <strong>Student ID:</strong>
                ${student.studentId || "N/A"}
            </p>

            <p>
                <strong>Class:</strong>
                ${student.studentClass || ""}
            </p>

            <p>
                <strong>Home Address:</strong>
                ${student.homeAddress || ""}
            </p>

            <p>
                <strong>Email Address:</strong>
                ${student.email || ""}
            </p>

            <p>
                <strong>Subjects:</strong>
                ${subjects.join(", ")}
            </p>

            <p>
                <strong>Date of Birth:</strong>
                ${student.dob || ""}
            </p>

            <p>
                <strong>Gender:</strong>
                ${student.gender || ""}
            </p>

            <p>
                <strong>Phone Number:</strong>
                ${student.phoneNo || ""}
            </p>

        </div>

    `;

}


// ========================================
// STUDENT NOT FOUND
// ========================================

else {

    studentProfile.innerHTML = `

        <p>
            Student not found.
        </p>

    `;

}