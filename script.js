// Get elements from HTML
const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const studentCount = document.getElementById("studentCount");
const searchStudent = document.getElementById("searchStudent");
const submitButton = document.getElementById("submitButton");

// Get students from localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Keep track of the student being edited
let editIndex = -1;

// Display students when page loads
displayStudents();


// ===============================
// ADD / UPDATE STUDENT
// ===============================

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const student = {
        name: document.getElementById("studentName").value,
        studentClass: document.getElementById("studentClass").value,
        age: document.getElementById("age").value,
        bloodType: document.getElementById("bloodType").value,
        subject: document.getElementById("subject").value,
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value,
        transport: document.getElementById("transport").value
    };


    // ADD STUDENT
    if (editIndex === -1) {

        students.push(student);

        alert("Student added successfully!");

    }

    // UPDATE STUDENT
    else {

        students[editIndex] = student;

        alert("Student updated successfully!");

        editIndex = -1;

        submitButton.textContent = "Add Student";
    }


    // Save to localStorage
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    // Display students
    displayStudents();


    // Clear form
    studentForm.reset();

});


// ===============================
// DISPLAY STUDENTS
// ===============================

function displayStudents(studentList = students) {

    studentTable.innerHTML = "";


    studentList.forEach(function(student) {

        const realIndex = students.indexOf(student);

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${realIndex + 1}</td>

            <td>${student.name}</td>

            <td>${student.studentClass}</td>

            <td>${student.age}</td>

            <td>${student.bloodType}</td>

            <td>${student.subject}</td>

            <td>${student.dob}</td>

            <td>${student.gender}</td>

            <td>${student.transport}</td>

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


    // Update student counter
    studentCount.textContent = students.length;

}


// ===============================
// DELETE STUDENT
// ===============================

function deleteStudent(index) {

    const confirmDelete = confirm(
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


// ===============================
// EDIT STUDENT
// ===============================

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

    document.getElementById("transport").value =
        student.transport;


    editIndex = index;


    submitButton.textContent = "Update Student";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ===============================
// SEARCH STUDENTS
// ===============================

searchStudent.addEventListener("input", function() {

    const searchValue =
        searchStudent.value.toLowerCase();


    const filteredStudents = students.filter(function(student) {

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

        );

    });


    displayStudents(filteredStudents);

});
