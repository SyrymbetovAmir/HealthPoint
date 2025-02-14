// Функция для создания и отображения кастомного поп-апа
function showPopup(message, type = "success") {
    const popup = document.createElement("div");
    popup.classList.add("custom-popup", type);
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add("show");
    }, 10);

    setTimeout(() => {
        popup.classList.remove("show");
        setTimeout(() => popup.remove(), 300);
    }, 3000);
}

// Применяем поп-апы в существующем коде

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://161.35.76.1:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error("Ошибка входа. Проверьте данные.");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("sessionToken", data.sessionToken);
            
            showPopup("Успешный вход!", "success");
            setTimeout(() => window.location.href = "/dashboard", 1500);
        } catch (error) {
            showPopup(error.message, "error");
        }
    });
});

// CSS для поп-апов
const style = document.createElement("style");
style.textContent = `
    .custom-popup {
        position: fixed;
        bottom: -50px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #4caf50;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transition: all 0.3s ease-in-out;
    }
    .custom-popup.show {
        bottom: 20px;
        opacity: 1;
    }
    .custom-popup.error {
        background-color: #f44336;
    }
`;
document.head.appendChild(style);
