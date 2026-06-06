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

document.getElementById("registerForm")
.addEventListener("submit", async function (e) {

```
e.preventDefault();

const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;
const password = document.getElementById("password").value;
const confirmPassword = document.getElementById("confirmPassword").value;

if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
}

try {

    const response = await fetch(
        "https://queue-ease-apis.onrender.com/YOUR_REGISTER_ENDPOINT",
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

        alert("Account Created Successfully");

        window.location.href = "login.html";

    } else {

        alert(data.message || "Registration failed");

    }

} catch (error) {

    console.error(error);
    alert("Unable to connect to server");

}
```

});
