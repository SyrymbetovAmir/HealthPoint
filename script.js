document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("errorMessage");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error(".");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token); // Сохраняем токен

            alert("Успешный вход!");
            window.location.href = "dashboard.html"; // Перенаправляем на другой экран (если есть)
        } catch (error) {
            errorMessage.textContent = error.message;
        }
    });
});
