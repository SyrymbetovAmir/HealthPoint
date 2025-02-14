const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");

modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");

});
sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");

})
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

// Функции для открытия и закрытия модального окна
function openModal() {
  document.getElementById("modal-overlay").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal-overlay").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    const reloadButton = document.querySelector(".reload");
    const tableBody = document.querySelector(".table");
  
    // Функция для загрузки данных
    const loadDoctors = async () => {
      try {
        const response = await fetch("http://161.35.76.1:3000/admin/doctors", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'X-Session-Token': `${localStorage.getItem("sessionToken")}`
          },
        });
  
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }
  
        const doctors = await response.json();
        renderDoctors(doctors);
        showPopup("Список докторов обновлен", "success");
      } catch (error) {
        showPopup("Ошибка загрузки данных", "error");
      }
    };
  
    // Функция для отображения данных в таблице
    const renderDoctors = (doctors) => {
      const rows = doctors.map((doctor) => `
        <tr class="table-row">
          <td class="id">${doctor.id}</td>
          <td class="email">${doctor.email}</td>
          <td class="access">
            <input type="checkbox" ${doctor.isAdmin ? "checked" : ""} data-id="${doctor.id}" class="access-checkbox">
          </td>
          <td class="action">
            <a href="#" class="action-a delete-button" data-id="${doctor.id}">DELETE</a>
          </td>
        </tr>
      `).join("");
  
      // Добавляем строки в таблицу
      tableBody.innerHTML = `
        <tr class="table-header">
          <th class="id">ID</th>
          <th class="email">Email</th>
          <th class="access">Access</th>
          <th class="action">Action</th>
        </tr>
        ${rows}
      `;
    };
  
    reloadButton.addEventListener("click", (e) => {
      e.preventDefault();
      loadDoctors();
    });
  
    loadDoctors(); // Загружаем данные при загрузке страницы
  });

  document.addEventListener("change", async (event) => {
    if (event.target.classList.contains("access-checkbox")) {
      const doctorId = event.target.dataset.id; // ID доктора
      const isAdmin = event.target.checked; // Новый статус роли
  
      try {
        const response = await fetch(`http://161.35.76.1:3000/admin/users/${doctorId}/role`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'X-Session-Token': `${localStorage.getItem("sessionToken")}`
          },
          body: JSON.stringify({ isAdmin }), // Передаём новый статус
        });
  
        if (!response.ok) {
          throw new Error("Ошибка обновления роли");
        }
  
        showPopup("Роль успешно обновлена!", "success");
      } catch (error) {
        console.error("Ошибка:", error.message);
        showPopup("Не удалось обновить роль. Проверьте настройки API.", "error")
      }
    }
  });

  document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-button")) {
      event.preventDefault();
  
      const doctorId = event.target.dataset.id;
  
      try {
        const response = await fetch(`http://161.35.76.1:3000/admin/doctors/${doctorId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'X-Session-Token': `${localStorage.getItem("sessionToken")}`
          },
        });
  
        if (!response.ok) {
          throw new Error("Не удалось удалить доктора");
        }
  
        showPopup("Доктор успешно удален!", "success");
        event.target.closest(".table-row").remove(); // Удаляем строку из таблицы
      } catch (error) {
        console.error("Ошибка:", error.message);
      }
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const modalOverlay = document.getElementById("modal-overlay");
    const addAccountButton = document.querySelector(".add-acc");
    const cancelButton = document.getElementById("cancel-button");
  
    // Открыть модальное окно
    addAccountButton.addEventListener("click", (e) => {
      e.preventDefault();
      modalOverlay.style.display = "flex"; // Показываем окно
    });
  
    // Закрыть модальное окно
    cancelButton.addEventListener("click", () => {
      modalOverlay.style.display = "none"; // Скрываем окно
    });
  
    // Закрыть модальное окно при клике вне карточки
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.style.display = "none"; // Скрываем окно
      }
    });
  
    // Обработка формы (добавление нового аккаунта)
    document.getElementById("add-account-form").addEventListener("submit", (e) => {
      e.preventDefault();
  
      const account = document.getElementById("account").value;
      const email = document.getElementById("email").value;
      const description = document.getElementById("description").value;
      const access = document.getElementById("access").checked;
  
      console.log({
        account,
        email,
        description,
        access,
      });
  
      modalOverlay.style.display = "none"; // Закрываем окно после успешного добавления
    });
  
    // Скрываем модалку по умолчанию
    modalOverlay.style.display = "none";
  });

  document.addEventListener("DOMContentLoaded", () => {
    const modalOverlay = document.getElementById("modal-overlay");
    const addAccountButton = document.querySelector(".add-acc");
    const cancelButton = document.getElementById("cancel-button");
  
    // Открыть модальное окно
    addAccountButton.addEventListener("click", (e) => {
      e.preventDefault();
      modalOverlay.style.display = "flex"; // Показываем окно
    });
  
    // Закрыть модальное окно
    cancelButton.addEventListener("click", () => {
      modalOverlay.style.display = "none"; // Скрываем окно
    });
  
    // Закрыть модалку при клике вне карточки
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.style.display = "none";
      }
    });
  
    // Обработка формы (Регистрация доктора)
    document.getElementById("add-account-form").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const role = document.querySelector('input[name="role"]:checked')?.value; // Получаем выбранную роль
  
      if (!role) {
        showPopup("Выберите роль!", "error");
        return;
      }
  
      try {
        const response = await fetch("http://161.35.76.1:3000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, role }),
        });
  
        if (!response.ok) {
          throw new Error("Ошибка регистрации доктора");
        }
  
        showPopup("Доктор успешно зарегистрирован!", "success");
        modalOverlay.style.display = "none"; // Закрываем модальное окно
      } catch (error) {
        console.error("Ошибка:", error.message);
        showPopup("Не удалось зарегистрировать доктора", "error");
      }
    });
  
    // Скрываем модалку по умолчанию
    modalOverlay.style.display = "none";
  });