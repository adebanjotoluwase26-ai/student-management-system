// ========================================
// GET ELEMENTS FROM HTML
// ========================================

const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const studentCount = document.getElementById("studentCount");
const searchStudent = document.getElementById("searchStudent");
const submitButton = document.getElementById("submitButton");


// ========================================
// GET STUDENTS FROM LOCAL STORAGE
// ========================================

let students = JSON.parse(localStorage.getItem("students")) || [];


// ========================================
// STUDENT ID COUNTER
// ========================================

let studentNumber =
    Number(localStorage.getItem("studentNumber")) || 0;


// ========================================
// GENERATE STUDENT ID
// ========================================

function generateStudentId() {

    studentNumber++;

    localStorage.setItem(
        "studentNumber",
        studentNumber
    );

    const year = new Date().getFullYear();

    return `STU-${year}-${String(studentNumber).padStart(3, "0")}`;
}


// ========================================
// EDIT INDEX
// ========================================

let editIndex = -1;


// ========================================
// DISPLAY STUDENTS WHEN PAGE LOADS
// ========================================

displayStudents();


// ========================================
// ADD / UPDATE STUDENT
// ========================================

studentForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get information from the form
    const student = {

        name: document.getElementById("studentName").value,

        studentClass:
            document.getElementById("studentClass").value,

        age:
            document.getElementById("age").value,

        bloodType:
            document.getElementById("bloodType").value,

        subject:
            document.getElementById("subject").value,

        dob:
            document.getElementById("dob").value,

        gender:
            document.getElementById("gender").value,

        phoneNo:
            document.getElementById("PhoneNo").value
    };


    // ========================================
    // ADD NEW STUDENT
    // ========================================

    if (editIndex === -1) {

        // Generate ID automatically
        student.studentId = generateStudentId();

        // Add student
        students.push(student);

        // Save students
        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        // Show success message
        alert(
            "Student added successfully!\n\n" +
            "Student ID: " +
            student.studentId
        );

    }


    // ========================================
    // UPDATE STUDENT
    // ========================================

    else {

        // Keep the student's existing ID
        student.studentId =
            students[editIndex].studentId;

        students[editIndex] = student;


        // Save updated students
        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );


        alert("Student updated successfully!");


        // Reset edit mode
        editIndex = -1;

        submitButton.textContent = "Add Student";
    }


    // Display students
    displayStudents();


    // Clear form
    studentForm.reset();

});


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


        row.innerHTML = `

            <td>${realIndex + 1}</td>

            <td>${student.studentId || "N/A"}</td>

            <td>${student.name}</td>

            <td>${student.studentClass}</td>

            <td>${student.age}</td>

            <td>${student.bloodType}</td>

            <td>${student.subject}</td>

            <td>${student.dob}</td>

            <td>${student.gender}</td>

            <td>${student.phoneNo}</td>

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


    // Update student count
    studentCount.textContent =
        students.length;
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
// EDIT STUDENT
// ========================================

function editStudent(index) {

    const student = students[index];


    document.getElementById("studentName").value =
        student.name;

    document.getElementById("studentClass").value =
        student.studentClass;

    document.getElementById("age").value =
        student.age;

    document.getElementById("bloodType").value =
        student.bloodType;

    document.getElementById("subject").value =
        student.subject;

    document.getElementById("dob").value =
        student.dob;

    document.getElementById("gender").value =
        student.gender;

    document.getElementById("PhoneNo").value =
        student.phoneNo;


    // Remember which student is being edited
    editIndex = index;


    // Change button text
    submitButton.textContent =
        "Update Student";


    // Scroll to form
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
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

                return (

                    student.name
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    student.studentClass
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    student.subject
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    (student.studentId || "")
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    (student.phoneNo || "")
                        .toLowerCase()
                        .includes(searchValue)

                );

            });


        displayStudents(filteredStudents);

    }
);