function togglePassword(id, icon) {
const input = document.getElementById(id);

```
if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
} else {
    input.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
}
```

}

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {

```
e.preventDefault();

const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();
const password = document.getElementById("password").value;
const confirmPassword =
    document.getElementById("confirmPassword").value;

if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
}

try {

    const response = await fetch(
        "https://queue-ease-apis.onrender.com/api/auth/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                phone,
                password
            })
        }
    );

    const data = await response.json();

    if (response.ok) {

        if (data.token) {
            localStorage.setItem(
                "queueease_token",
                data.token
            );
        }

        alert("Registration Successful!");

        window.location.href =
            "dashboard.html";

    } else {

        alert(
            data.message ||
            "Registration Failed"
        );

    }

} catch (error) {

    console.error(error);

    alert(
        "Unable to connect to server"
    );
}
```

});
