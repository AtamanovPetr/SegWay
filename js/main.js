function openTab(evt, tabId) {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
  }

  const tabBtns = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabBtns.length; i++) {
    tabBtns[i].classList.remove("active");
  }

  const targetTab = document.getElementById(tabId);
  if (targetTab) targetTab.classList.add("active");
  if (evt && evt.currentTarget) evt.currentTarget.classList.add("active");
}

// Единый обработчик загрузки DOM для всего остального кода
document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. БУРГЕР-МЕНЮ
  // ==========================================
  const burgerBtn = document.querySelector(".burger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      burgerBtn.classList.toggle("open");
      if (mobileMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });
  }

  // ==========================================
  // 2. СЛАЙДЕР СРАВНЕНИЯ ТОВАРОВ
  // ==========================================
  const compareWrapper = document.querySelector(".compare-slider-wrapper");
  const compareArrowBtn = document.querySelector(".compare-arrow-btn");
  const compareTable = document.querySelector(".compare-table");

  if (compareWrapper && compareArrowBtn && compareTable) {
    compareArrowBtn.addEventListener("click", () => {
      const cell = compareTable.querySelector(".compare-product-card");
      const stepWidth = cell ? cell.offsetWidth : 200;
      const maxScrollLeft =
        compareWrapper.scrollWidth - compareWrapper.clientWidth;

      if (compareWrapper.scrollLeft >= maxScrollLeft - 10) {
        compareWrapper.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        compareWrapper.scrollBy({ left: stepWidth, behavior: "smooth" });
      }
    });
  }

  // ==========================================
  // 3. СЛАЙДЕР ОТЗЫВОВ
  // ==========================================
  const reviewsWrapper = document.querySelector(".reviews-slider-wrapper");
  const reviewsPrevBtn = document.querySelector(".reviews-arrow--prev");
  const reviewsNextBtn = document.querySelector(".reviews-arrow--next");
  const reviewsTrack = document.querySelector(".reviews-slider-track");

  if (reviewsWrapper && reviewsPrevBtn && reviewsNextBtn && reviewsTrack) {
    const getStepWidth = () => {
      const card = reviewsTrack.querySelector(".review-card-item");
      return card ? card.offsetWidth + 30 : 300;
    };

    reviewsNextBtn.addEventListener("click", () => {
      reviewsWrapper.scrollBy({ left: getStepWidth(), behavior: "smooth" });
    });

    reviewsPrevBtn.addEventListener("click", () => {
      reviewsWrapper.scrollBy({ left: -getStepWidth(), behavior: "smooth" });
    });
  }

  // ==========================================
  // 4. УНИВЕРСАЛЬНЫЕ МОДАЛЬНЫЕ ОКНА + АВТОВСПЛЫТИЕ
  // ==========================================

  // Находим все кнопки открытия модалок на сайте
  const openModalBtns = document.querySelectorAll(".open-modal-btn");
  // Находим все модальные оверлеи
  const allModals = document.querySelectorAll(".modal-overlay");

  // Функция для безопасного открытия конкретного окна
  const openModal = (modalWindow) => {
    if (!modalWindow) return;
    modalWindow.classList.add("is-open");
    document.body.style.overflow = "hidden"; // Запрещаем скролл сайта
  };

  // Функция закрытия конкретного окна
  const closeModal = (modalWindow) => {
    if (!modalWindow) return;
    modalWindow.classList.remove("is-open");

    // Проверяем, остались ли на странице другие ОТКРЫТЫЕ модалки
    const hasAnyOpenModal = Array.from(allModals).some((m) =>
      m.classList.contains("is-open"),
    );
    // Также проверяем бургер
    const isBurgerOpen = mobileMenu && mobileMenu.classList.contains("active");

    if (!hasAnyOpenModal && !isBurgerOpen) {
      document.body.style.overflow = ""; // Возвращаем скролл сайту
    }
  };

  // 1. Автоматическое всплытие второй модалки при открытии страницы
  // Окно откроется через 1500 миллисекунд (1.5 секунды) после загрузки DOM
  setTimeout(() => {
    const promoModal = document.getElementById("promoModal");

    // Проверяем, что модалка есть на странице и в этот момент не открыто бургер-меню
    const isBurgerActive =
      mobileMenu && mobileMenu.classList.contains("active");

    if (promoModal && !isBurgerActive) {
      openModal(promoModal);
    }
  }, 1500);

  // 2. Логика ОТКРЫТИЯ окон по клику на ручные кнопки (если они есть)
  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute("data-target");
      const targetModal = document.getElementById(targetId);
      if (targetModal) openModal(targetModal);
    });
  });

  // 3. Логика ИНИЦИАЛИЗАЦИИ внутренних событий для каждого окна отдельно
  allModals.forEach((modalInstance) => {
    const closeBtn = modalInstance.querySelector(".modal-close");
    const form = modalInstance.querySelector(".modal-form");
    const phoneInput = modalInstance.querySelector(".input-wrapper input");

    // Инициализация маски (только если в этой модалке есть текстовое поле ввода)
    if (phoneInput && typeof IMask !== "undefined") {
      IMask(phoneInput, {
        mask: "+7 (000) 000-00-00",
        lazy: false,
      });
    }

    // Закрытие по клику на крестик
    if (closeBtn) {
      closeBtn.addEventListener("click", () => closeModal(modalInstance));
    }

    // Закрытие по клику на темный фон (оверлей) вокруг окна
    modalInstance.addEventListener("click", (e) => {
      if (e.target === modalInstance) {
        closeModal(modalInstance);
      }
    });

    // Обработка отправки формы (если она есть в модалке)
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (phoneInput) {
          const rawPhone = phoneInput.value.replace(/\D/g, "");
          if (rawPhone.length < 11) {
            alert("Пожалуйста, введите номер телефона полностью.");
            return;
          }
        }
        alert("Заявка успешно отправлена!");
        form.reset();
        closeModal(modalInstance);
      });
    }

    // Если внутри второй модалки просто статичная кнопка без тега form:
    const actionBtn = modalInstance.querySelector(".modal-actions .submit-btn");
    if (actionBtn && !form) {
      actionBtn.addEventListener("click", () => {
        alert("Спасибо за заказ! Акция зафиксирована.");
        closeModal(modalInstance);
      });
    }
  });

  // 4. Общее закрытие всех открытых окон по кнопке Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      allModals.forEach((modalInstance) => {
        if (modalInstance.classList.contains("is-open")) {
          closeModal(modalInstance);
        }
      });
    }
  });
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach((input) => {
    // Устанавливаем начальное значение при клике, если поле пустое
    input.addEventListener("focus", () => {
      if (!input.value) {
        input.value = "+7 ";
      }
    });

    input.addEventListener("input", (e) => {
      let matrix = "+7 (___) ___-__-__",
        i = 0,
        // Очищаем ввод от нецифровых символов, кроме первой семерки
        def = matrix.replace(/\D/g, ""),
        val = input.value.replace(/\D/g, "");

      // Если пользователь пытается стереть начальную семерку
      if (def.length >= val.length) {
        val = def;
      }

      // Форматируем строку по матрице
      input.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
            ? ""
            : a;
      });
    });

    // Очищаем поле при потере фокуса, если пользователь ничего не ввел кроме +7
    input.addEventListener("blur", () => {
      if (input.value === "+7 " || input.value.length <= 4) {
        input.value = "";
      }
    });
  });
});
