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
