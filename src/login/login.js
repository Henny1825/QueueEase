function togglePassword() {
    const password = document.getElementById("loginPassword");
    const icon = document.querySelector(".password-box i");

    if (password.type === "password") {
        password.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        password.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

document.getElementById("loginForm")
.addEventListener("submit", async function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("loginPassword").value;

    try {

        const response = await fetch(
            "https://queue-ease-apis.onrender.com/YOUR_LOGIN_ENDPOINT",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            // Save token if API returns one
            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            alert("Login Successful");
            window.location.href = "dashboard.html";

        } else {

            alert(data.message || "Invalid credentials");

        }

    } catch (error) {

        console.error(error);
        alert("Server connection failed");

    }
});