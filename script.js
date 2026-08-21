// ========================================
// GET FORM ELEMENTS
// ========================================

const studentForm = document.getElementById("studentForm");
const submitButton = document.getElementById("submitButton");


// ========================================
// GET STUDENTS FROM LOCAL STORAGE
// ========================================

let students =
    JSON.parse(localStorage.getItem("students")) || [];


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

const savedEditIndex =
    localStorage.getItem("editStudentIndex");

if (savedEditIndex !== null) {

    editIndex = Number(savedEditIndex);

    const student = students[editIndex];

    if (student) {

    document.getElementById("firstName").value =
        student.firstName;

    document.getElementById("surname").value =
        student.surname;

    document.getElementById("studentClass").value =
        student.studentClass || "";

    document.getElementById("homeAddress").value =
        student.homeAddress || "";

    document.getElementById("email").value =
        student.email || "";
        // Select the student's existing subjects
document.querySelectorAll('input[name="subjects"]').forEach(function (checkbox) {

    checkbox.checked =
        (student.subjects || []).includes(checkbox.value);

});
    document.getElementById("dob").value =
        student.dob || "";

    document.getElementById("gender").value =
        student.gender || "";

    document.getElementById("PhoneNo").value =
        student.phoneNo || "";

    // Select the student's subjects
    const subjects =
    student.subjects || [];

document.querySelectorAll(
    'input[name="subjects"]'
    ).forEach(function (checkbox) {

    checkbox.checked =
        subjects.includes(checkbox.value);

});

    submitButton.textContent =
        "Update Student";
}

    localStorage.removeItem("editStudentIndex");
}

// ========================================
// ADD / UPDATE STUDENT
// ========================================

studentForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // ========================================
    // GET FORM INFORMATION
    // ========================================

   const student = {

    firstName:
        document.getElementById("firstName").value,

    surname:
        document.getElementById("surname").value,

    studentClass:
        document.getElementById("studentClass").value,

    homeAddress:
        document.getElementById("homeAddress").value,

    email:
        document.getElementById("email").value,

    subjects:
        Array.from(
            document.querySelectorAll('input[name="subjects"]:checked')
        ).map(checkbox => checkbox.value),

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

        // Generate Student ID
        student.studentId =
            generateStudentId();


        // Add student to array
        students.push(student);


        // Save to localStorage
        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );


        // Success message
        alert(
            "Student added successfully!\n\n" +
            "Student ID: " +
            student.studentId
        );


        // Clear form
        studentForm.reset();


        // Go to Registered Students page
        window.location.href =
            "students.html";

    }


   // ========================================
// UPDATE STUDENT
// ========================================

else {

    // Keep the original Student ID
    student.studentId =
        students[editIndex].studentId;

    // Update the student
    students[editIndex] = student;

    // Save updated students
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    alert("Student updated successfully!");

    // Reset edit mode
    editIndex = -1;

    // Reset button
    submitButton.textContent = "Add Student";

    // Clear form
    studentForm.reset();

    // Go back to registered students
    window.location.href = "students.html";
}

});     