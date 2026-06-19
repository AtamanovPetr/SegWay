const burgerBtn = document.querySelector(".burger");
const mobileMenu = document.getElementById("mobileMenu");

burgerBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  burgerBtn.classList.toggle("open");
});
