// ========================================
// GET STUDENTS FROM LOCAL STORAGE
// ========================================

let students =
    JSON.parse(localStorage.getItem("students")) || [];


// ========================================
// GET HTML ELEMENTS
// ========================================

const studentTable =
    document.getElementById("studentTable");

const studentCount =
    document.getElementById("studentCount");

const searchStudent =
    document.getElementById("searchStudent");


// ========================================
// DISPLAY STUDENTS
// ========================================

function displayStudents(studentList = students) {

    studentTable.innerHTML = "";

    studentList.forEach(function (student) {

        const realIndex =
            students.indexOf(student);

        const row =
            document.createElement("tr");


        // ========================================
        // SUPPORT OLD AND NEW SUBJECT DATA
        // ========================================

        const subjects =
            Array.isArray(student.subject)
                ? student.subject
                : student.subject
                    ? [student.subject]
                    : [];


        // ========================================
        // CREATE TABLE ROW
        // ========================================

        row.innerHTML = `

            <td>
                ${realIndex + 1}
            </td>

            <td>
                <a
                    href="#"
                    onclick="viewStudent('${student.studentId}')">
                    ${student.studentId || "N/A"}
                </a>
            </td>

            <td>
                ${student.name || ""}
            </td>

            <td>
                ${student.studentClass || ""}
            </td>

            <td>
                ${student.homeAddress || ""}
            </td>

            <td>
                ${student.email || ""}
            </td>

            <td>
                ${
                Array.isArray(student.subjects)
                ? student.subjects.join(", ")
                : student.subject || ""
                }
            </td>

            <td>
                ${student.dob || ""}
            </td>

            <td>
                ${student.gender || ""}
            </td>

            <td>
                ${student.phoneNo || ""}
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${realIndex})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${realIndex})">
                    Delete
                </button>

            </td>

        `;


        studentTable.appendChild(row);

    });


    // ========================================
    // UPDATE STUDENT COUNT
    // ========================================

    studentCount.textContent =
        students.length;
}


// ========================================
// VIEW STUDENT PROFILE
// ========================================

function viewStudent(studentId) {

    localStorage.setItem(
        "selectedStudentId",
        studentId
    );

    window.location.href =
        "student-profile.html";
}


// ========================================
// EDIT STUDENT
// ========================================

function editStudent(index) {

    localStorage.setItem(
        "editStudentIndex",
        index
    );

    window.location.href =
        "index.html";
}


// ========================================
// DELETE STUDENT
// ========================================

function deleteStudent(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (confirmDelete) {

        students.splice(index, 1);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        displayStudents();

    }
}


// ========================================
// SEARCH STUDENTS
// ========================================

searchStudent.addEventListener(
    "input",
    function () {

        const searchValue =
            searchStudent.value.toLowerCase();


        const filteredStudents =
            students.filter(function (student) {


                // Subjects
                const subjects =
                    Array.isArray(student.subject)
                        ? student.subject
                        : student.subject
                            ? [student.subject]
                            : [];


                return (

                    // Student ID
                    (student.studentId || "")
                        .toLowerCase()
                        .includes(searchValue)


                    ||

                    // Name
                    (student.name || "")
                        .toLowerCase()
                        .includes(searchValue)


                    ||

                    // Class
                    (student.studentClass || "")
                        .toLowerCase()
                        .includes(searchValue)


                    ||

                    // Home Address
                    (student.homeAddress || "")
                        .toLowerCase()
                        .includes(searchValue)


                    ||

                    // Email
                    (student.email || "")
                        .toLowerCase()
                        .includes(searchValue)


                    ||

                    // Subjects
                    subjects
                        .join(" ")
                        .toLowerCase()
                        .includes(searchValue)


                    ||

                    // Phone Number
                    (student.phoneNo || "")
                        .toLowerCase()
                        .includes(searchValue)

                );

            });


        displayStudents(filteredStudents);

    }
);


// ========================================
// DISPLAY STUDENTS WHEN PAGE LOADS
// ========================================

displayStudents();