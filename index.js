document.addEventListener("DOMContentLoaded", () => {
    loadUsers(); // Load stored users when page loads

    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let dob = document.getElementById("dob").value;
        let acceptTerms = document.getElementById("acceptTerms").checked;

        // Validate email
        if (!isValidEmail(email)) {
            document.getElementById("emailError").textContent = "Invalid email address!";
            return;
        } else {
            document.getElementById("emailError").textContent = "";
        }

        // Validate DOB (Age between 18 and 55)
        if (!isValidAge(dob)) {
            document.getElementById("dobError").textContent = "Age must be between 18 and 55.";
            return;
        } else {
            document.getElementById("dobError").textContent = "";
        }

        // Create user object
        let user = {
            name: name,
            email: email,
            password: password,
            dob: dob,
            acceptedTerms: acceptTerms
        };

        // Save to localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        // Add user to table
        addUserToTable(user);

        // Reset form
        this.reset();
    });
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidAge(dob) {
    let birthDate = new Date(dob);
    let age = new Date().getFullYear() - birthDate.getFullYear();

    let monthDiff = new Date().getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18 && age <= 55;
}

function addUserToTable(user) {
    let tableBody = document.querySelector("#userTable tbody");
    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.acceptedTerms}</td>
    `;

    tableBody.appendChild(row);
}

function loadUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.forEach(addUserToTable);
}