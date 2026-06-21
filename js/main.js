const burgerBtn = document.querySelector(".burger");
const mobileMenu = document.getElementById("mobileMenu");

burgerBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  burgerBtn.classList.toggle("open");
  if (mobileMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

function openTab(evt, tabId) {
  // Скрываем весь контент
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
  }

  // Убираем активный класс у всех кнопок
  const tabBtns = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabBtns.length; i++) {
    tabBtns[i].classList.remove("active");
  }

  // Показываем текущий контент и делаем кнопку активной
  document.getElementById(tabId).classList.add("active");
  evt.currentTarget.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".compare-slider-wrapper");
  const arrowBtn = document.querySelector(".compare-arrow-btn");
  const table = document.querySelector(".compare-table");

  if (wrapper && arrowBtn && table) {
    arrowBtn.addEventListener("click", () => {
      // Вычисляем ширину одной колонки товара динамически (обычно около 180-200px)
      const cell = table.querySelector(".compare-product-card");
      const stepWidth = cell ? cell.offsetWidth : 200;

      // Максимальная глубина прокрутки таблицы
      const maxScrollLeft = wrapper.scrollWidth - wrapper.clientWidth;

      // Если доскроллили до конца, возвращаемся в начало. Иначе — листаем вперед на 1 колонку.
      if (wrapper.scrollLeft >= maxScrollLeft - 10) {
        wrapper.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        wrapper.scrollBy({
          left: stepWidth,
          behavior: "smooth",
        });
      }
    });
  }
});
