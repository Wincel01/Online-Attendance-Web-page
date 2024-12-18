document.addEventListener("DOMContentLoaded", () => {
    const loginSection = document.getElementById("login-section");
    const registerSection = document.getElementById("register-section");
    const attendanceSection = document.getElementById("attendance-section");
    const teacherControls = document.getElementById("teacher-controls");
    const studentControls = document.getElementById("student-controls");
    const userRole = document.getElementById("user-role");
    const userName = document.getElementById("user-name");
    const studentList = document.getElementById("student-list");
    const markAbsentBtn = document.getElementById("mark-absent");

    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    function showLogin() {
        loginSection.style.display = "block";
        registerSection.style.display = "none";
        attendanceSection.style.display = "none";
    }

    function showRegister() {
        loginSection.style.display = "none";
        registerSection.style.display = "block";
        attendanceSection.style.display = "none";
    }

    function showAttendance(username, role) {
        loginSection.style.display = "none";
        registerSection.style.display = "none";
        attendanceSection.style.display = "block";
        userRole.textContent = role.charAt(0).toUpperCase() + role.slice(1);
        userName.textContent = username;

        if (role === "teacher") {
            teacherControls.style.display = "block";
            studentControls.style.display = "none";
            populateStudentList();
        } else {
            teacherControls.style.display = "none";
            studentControls.style.display = "block";
        }
    }

    function populateStudentList() {
        const students = users.filter((user) => user.role === "student");
        studentList.innerHTML = students.map((s) => `<option value="${s.username}">${s.username}</option>`).join("");
    }

    // Login form handler
    loginSection.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;

        // Check if user exists
        const user = users.find((u) => u.username === username && u.password === password && u.role === role);

        if (user) {
            showAttendance(username, role);
        } else {
            alert("Invalid credentials!");
        }
    });

    // Register form handler
    registerSection.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("reg-username").value.trim();
        const password = document.getElementById("reg-password").value.trim();
        const role = document.getElementById("reg-role").value;

        const existingUser = users.find((user) => user.username === username);
        if (existingUser) {
            alert("Username already exists! Please choose a different one.");
        } else {
            // Create new user and save to localStorage
            users.push({ username, password, role });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registration successful! You can now log in.");
            showLogin();
        }
    });

    // Mark attendance as absent
    markAbsentBtn.addEventListener("click", () => {
        const student = studentList.value;
        const reason = document.getElementById("reason").value.trim();

        if (student && reason) {
            attendance.push({ student, reason });
            localStorage.setItem("attendance", JSON.stringify(attendance));
            alert(`${student} marked absent for: ${reason}`);
        } else {
            alert("Please select a student and provide a reason.");
        }
    });

    // Logout function
    function logout() {
        showLogin();
    }

    // Initialize view to login screen
    showLogin();
});
        
