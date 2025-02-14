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

// Функции для открытия и закрытия модального окна
function openModal() {
  document.getElementById("modal-overlay").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal-overlay").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("add-account-button").addEventListener("click", openModal);
  document.getElementById("close-modal").addEventListener("click", closeModal);

  const reloadButton = document.querySelector(".reload");
  const tableBody = document.querySelector(".table");

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

  reloadButton.addEventListener("click", (e) => {
      e.preventDefault();
      loadDoctors();
  });

  loadDoctors();
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
    document.getElementById("add-account-form").addEventListener("submit", async (e) => {
      e.preventDefault();
    
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const role = document.querySelector('input[name="role"]:checked')?.value;
      const modalOverlay = document.getElementById("modal-overlay");
    
      if (!role) {
          showPopup("Выберите роль!", "error");
          return;
      }
    
      try {
          const response = await fetch("http://161.35.76.1:3000/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password, role }),
          });
    
          if (!response.ok) {
              throw new Error("Ошибка регистрации доктора");
          }
    
          showPopup("Доктор успешно зарегистрирован!", "success");
          modalOverlay();
      } catch (error) {
          showPopup("Не удалось зарегистрировать доктора", "error");
      }
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
        alert("Выберите роль!");
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
  
        alert("Доктор успешно зарегистрирован!");
        modalOverlay.style.display = "none"; // Закрываем модальное окно
      } catch (error) {
        console.error("Ошибка:", error.message);
        alert("Не удалось зарегистрировать доктора.");
      }
    });
  
    // Скрываем модалку по умолчанию
    modalOverlay.style.display = "none";
  });
