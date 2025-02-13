const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle"),
      sidebar = body.querySelector("nav"),
      sidebarToggle = body.querySelector(".sidebar-toggle"),
      manageAccLink = document.querySelector('a[href="manageacc.html"]');

modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

// Проверяем права на "List All Doctors"
const checkAdminRole = async () => {
    try {
        const response = await fetch("http://161.35.76.1:3000/admin/doctors", {  // Эндпоинт "List All Doctors"
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        // Если запрос успешный — оставляем вкладку
        console.log("Пользователь является администратором");
    } catch (error) {
        console.error("Пользователь не администратор:", error.message);
        if (manageAccLink) {
            manageAccLink.parentElement.style.display = "none";  // Скрываем вкладку
        }
    }
};

document.addEventListener("DOMContentLoaded", checkAdminRole);