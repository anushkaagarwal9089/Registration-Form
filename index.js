document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("user_form");
    const dobError = document.getElementById("dobError");
    const userTable = document.getElementById("userTable");
    const userTableBody = document.getElementById("userTableBody");

    // Load users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Function to render the table
    function renderTable() {
        userTable.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Dob</th>
                    <th>Accepted terms?</th>
                </tr>
            </thead>
            <tbody id="userTableBody"></tbody>
        `;
        const userTableBody = document.getElementById("userTableBody");

        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>***</td>
                <td>${user.dob}</td>
                <td>${user.acceptedTerms ? "Yes" : "No"}</td>
            `;
            userTableBody.appendChild(row);
        });
    }

    renderTable(); // Render on page load

    // Function to validate email format
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Function to calculate age
    function calculateAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const dob = document.getElementById("dob").value;
        const acceptedTerms = document.getElementById("acceptTerms").checked;

        // Validate email
        if (!isValidEmail(email)) {
            alert("Invalid email address!");
            return;
        }

        // Validate age
        const age = calculateAge(dob);
        if (age < 18 || age > 55) {
            dobError.textContent = "Age must be between 18 and 55.";
            dobError.classList.remove("hidden");
            return;
        } else {
            dobError.classList.add("hidden");
        }

        // Add new user
        const newUser = { name, email, password: "***", dob, acceptedTerms };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        renderTable(); // Update table immediately
        form.reset();
    });
});
