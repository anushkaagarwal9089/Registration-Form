document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const userTable = document.getElementById("userTable");
    const dobInput = document.getElementById("dob");

    // Set min and max date for 18-55 years age range (excluding today)
    const today = new Date();
    const minDate = new Date();
    const maxDate = new Date();

    minDate.setFullYear(today.getFullYear() - 55); // Oldest allowed
    maxDate.setFullYear(today.getFullYear() - 18); // Youngest allowed

    minDate.setDate(minDate.getDate() + 1); // Exclude today
    maxDate.setDate(maxDate.getDate() - 1); // Exclude today

    dobInput.setAttribute("min", minDate.toISOString().split("T")[0]);
    dobInput.setAttribute("max", maxDate.toISOString().split("T")[0]);

    // Prevent editing DOB after selection
    dobInput.addEventListener("change", function () {
        if (dobInput.value) {
            dobInput.setAttribute("readonly", true);
        }
    });

    // Load stored users
    function loadUsers() {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        userTable.innerHTML = "";
        users.forEach(user => {
            const row = userTable.insertRow();
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td>${user.dob}</td>
                <td>${user.terms}</td>
            `;
        });
    }

    // Save new user
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const dob = document.getElementById("dob").value;
        const terms = document.getElementById("terms").checked;

        if (!dob) {
            alert("Please select a valid date of birth.");
            return;
        }

        const newUser = { name, email, password, dob, terms };
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        loadUsers();
        form.reset();
    });

    loadUsers();
});
