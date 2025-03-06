document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("user_form");
    const dobInput = document.getElementById("dob");
    const dobError = document.getElementById("dobError");
    const userTableBody = document.getElementById("userTableBody");

    // Load existing users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    function renderTable() {
        userTableBody.innerHTML = "";
        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="border border-gray-300 px-4 py-2">${user.name}</td>
                <td class="border border-gray-300 px-4 py-2">${user.email}</td>
                <td class="border border-gray-300 px-4 py-2">${user.password}</td>
                <td class="border border-gray-300 px-4 py-2">${user.dob}</td>
                <td class="border border-gray-300 px-4 py-2">${user.acceptedTerms}</td>
            `;
            userTableBody.appendChild(row);
        });
    }

    renderTable();

    // Validate date of birth
    function isValidAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            return age - 1;
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

        const age = isValidAge(dob);
        if (age < 18 || age > 55) {
            dobError.classList.remove("hidden");
            return;
        } else {
            dobError.classList.add("hidden");
        }

        // Check for duplicate email
        if (users.some(user => user.email === email)) {
            alert("Email is already registered!");
            return;
        }

        const newUser = { name, email, password, dob, acceptedTerms };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        renderTable();
        form.reset();
    });
});
