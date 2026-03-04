const users = [
    {
        username: "admin",
        password: "admin123",
        secondCode: "9999",
        role: "admin",
        permissions: ["dashboard", "agenda"]
    },
    {
        username: "user1",
        password: "user123",
        secondCode: "1111",
        role: "user",
        permissions: ["dashboard"]
    }
];

let attempts = 0;

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        attempts++;
        document.getElementById("error").innerText = "Identifiants incorrects";
        if (attempts >= 3) {
            alert("Trop de tentatives !");
        }
        return;
    }

    const code = prompt("Code secondaire :");
    if (code !== user.secondCode) {
        alert("Code incorrect");
        return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "./dashboard.html";
}

function checkAuth(page) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    if (!user.permissions.includes(page)) {
        alert("Accès refusé");
        window.location.href = "dashboard.html";
        return;
    }

    document.getElementById("welcome")?.innerText = "Connecté en tant que " + user.username;

    setTimeout(logout, 600000);
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "./index.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("loginBtn");
    if (btn) {
        btn.addEventListener("click", login);
    }
});

