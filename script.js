const items = document.querySelectorAll(".menu-item");
const container = document.getElementById("mainContainer");
const waveLayers = document.querySelectorAll(".wave-layer");
let index = 0;
let slideTimer;

// 1. FIX LỖI CHIỀU CAO TRÊN MOBILE
// Hàm này giúp tính toán lại chiều cao thực tế của màn hình (trừ đi thanh địa chỉ)
function setFullHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// Cấu hình màu sắc
const themes = [
  { bg: "#c8d682", wave: "#e5f312" }, // Burger
  { bg: "#e9c46a", wave: "#f4a261" }, // Pizza
];

function updateMenu() {
  items.forEach((item, i) => {
    item.classList.remove("active");
    if (i === index) item.classList.add("active");
  });

  const theme = themes[index];
  if (theme) {
    // Sử dụng transition mượt mà hơn cho màu nền thông qua style
    container.style.transition = "background-color 0.8s ease";
    container.style.backgroundColor = theme.bg;
    waveLayers.forEach((layer) => {
      layer.style.transition = "fill 0.8s ease";
      layer.style.fill = theme.wave;
    });
  }
}

function nextSlide() {
  index = (index + 1) % items.length;
  updateMenu();
}

function prevSlide() {
  index = (index - 1 + items.length) % items.length;
  updateMenu();
}

function startAutoSlide() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 7000);
}

// 2. HỖ TRỢ VUỐT TRÊN MÀN HÌNH CẢM ỨNG (MOBILE)
let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
  if (touchEndX < touchStartX - 50) {
    nextSlide(); // Vuốt sang trái -> món tiếp theo
    startAutoSlide();
  }
  if (touchEndX > touchStartX + 50) {
    prevSlide(); // Vuốt sang phải -> món trước đó
    startAutoSlide();
  }
}

container.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

container.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});

// 3. KHỞI TẠO VÀ LẮNG NGHE SỰ KIỆN THAY ĐỔI MÀN HÌNH
window.addEventListener("resize", () => {
  setFullHeight();
});

// Chạy lần đầu
setFullHeight();
updateMenu();
startAutoSlide();

// Export các hàm điều hướng cho nút bấm (HTML onclick)
window.manualNext = () => {
  nextSlide();
  startAutoSlide();
};
window.manualPrev = () => {
  prevSlide();
  startAutoSlide();
};
