document.addEventListener("DOMContentLoaded", () => {
    loadUsers(); // Load stored users when page loads

    document.getElementById("registration-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let dob = document.getElementById("dob").value;
        let termsAccepted = document.getElementById("terms").checked;

        if (!isValidAge(dob)) {
            alert("You must be between 18 and 55 years old.");
            return;
        }

        let userData = {
            name,
            email,
            password,
            dob,
            termsAccepted
        };

        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));

        displayUsers();
    });
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidAge(dob) {
    let birthDate = new Date(dob);
    let today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();
    let dayDiff = today.getDate() - birthDate.getDate();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
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