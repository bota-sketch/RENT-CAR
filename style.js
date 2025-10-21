// Efek bintang latar
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];
let width, height;

function initStars() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  stars = [];
  for (let i = 0; i < 300; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5,
      alpha: Math.random(),
      speed: Math.random() * 0.3 + 0.2
    });
  }
}

function animateStars() {
  ctx.clearRect(0, 0, width, height);
  for (let s of stars) {
    s.y += s.speed;
    if (s.y > height) s.y = 0;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.fill();
  }
  requestAnimationFrame(animateStars);
}

initStars();
animateStars();
window.addEventListener("resize", initStars);

// Efek bintang jatuh saat klik link navbar
function createFallingStar(x, y) {
  const star = document.createElement("div");
  star.className = "falling-star";
  star.style.left = x + "px";
  star.style.top = y + "px";
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 1000);
}

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    const rect = e.target.getBoundingClientRect();
    createFallingStar(rect.left + rect.width / 2, rect.top);
  });
});

// ==== Tata Surya ====
const solarSystem = document.createElement("div");
solarSystem.className = "solar-system";
document.body.appendChild(solarSystem);

// Matahari
const sun = document.createElement("div");
sun.className = "sun";
solarSystem.appendChild(sun);

// Data planet (radius orbit dan ukuran planet)
const planets = [
  { distance: 120, size: 12, color: "#88ccff" },  // Merkurius
  { distance: 170, size: 16, color: "#66aaff" },  // Venus
  { distance: 220, size: 18, color: "#3399ff" },  // Bumi
  { distance: 270, size: 14, color: "#ff7744" },  // Mars
  { distance: 330, size: 28, color: "#ffcc66" },  // Jupiter
  { distance: 400, size: 22, color: "#ffaa33" },  // Saturnus
  { distance: 470, size: 20, color: "#99ccff" },  // Uranus
  { distance: 530, size: 20, color: "#6666ff" }   // Neptunus
];

// Tambahkan planet & orbit
planets.forEach((planet, index) => {
  const orbit = document.createElement("div");
  orbit.className = "orbit";
  orbit.style.width = planet.distance * 2 + "px";
  orbit.style.height = planet.distance * 2 + "px";
  solarSystem.appendChild(orbit);

  const planetDiv = document.createElement("div");
  planetDiv.className = "planet";
  planetDiv.style.width = planet.size + "px";
  planetDiv.style.height = planet.size + "px";
  planetDiv.style.background = planet.color;
  planetDiv.style.boxShadow = `0 0 20px ${planet.color}`;
  planetDiv.style.transform = `translate(${planet.distance}px, -50%)`;

  // Kecepatan rotasi planet
  planetDiv.style.animation = `orbit-${index} ${40 + index * 15}s linear infinite`;

  // Tambahkan animasi planet orbit
  const orbitKeyframes = `
    @keyframes orbit-${index} {
      from { transform: rotate(0deg) translate(${planet.distance}px) rotate(0deg); }
      to { transform: rotate(360deg) translate(${planet.distance}px) rotate(-360deg); }
    }
  `;
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(orbitKeyframes, styleSheet.cssRules.length);

  solarSystem.appendChild(planetDiv);
});

// ==== Ular Melingkar (Efek Neon) ====
const snakeCanvas = document.createElement("canvas");
snakeCanvas.width = window.innerWidth;
snakeCanvas.height = window.innerHeight;
snakeCanvas.style.position = "fixed";
snakeCanvas.style.top = "0";
snakeCanvas.style.left = "0";
snakeCanvas.style.zIndex = "-1";
snakeCanvas.style.pointerEvents = "none";
document.body.appendChild(snakeCanvas);

const ctxSnake = snakeCanvas.getContext("2d");
const numSegments = 60; // jumlah lingkaran ular
let angle = 0;

function drawSnake() {
  ctxSnake.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const radius = 200; // seberapa lebar ular melingkar

  for (let i = 0; i < numSegments; i++) {
    const t = angle + i * 0.2;
    const x = centerX + Math.cos(t) * radius;
    const y = centerY + Math.sin(t) * radius;

    const glow = Math.sin(t * 2) * 0.5 + 0.5;
    const size = 10 + Math.sin(t * 2) * 5;

    ctxSnake.beginPath();
    ctxSnake.arc(x, y, size, 0, Math.PI * 2);
    ctxSnake.fillStyle = `rgba(${100 + 155 * glow}, ${255 * glow}, 255, 0.8)`;
    ctxSnake.shadowBlur = 20;
    ctxSnake.shadowColor = `rgba(0, 255, 255, 0.8)`;
    ctxSnake.fill();
  }

  angle += 0.05;
  requestAnimationFrame(drawSnake);
}

drawSnake();

window.addEventListener("resize", () => {
  snakeCanvas.width = window.innerWidth;
  snakeCanvas.height = window.innerHeight;
});

// ==== Popup Info Mobil ====
const modal = document.getElementById("mobilModal");
const modalNama = document.getElementById("mobilNama");
const modalGambar = document.getElementById("mobilGambar");
const modalDeskripsi = document.getElementById("mobilDeskripsi");
const modalHarga = document.getElementById("mobilHarga");
const closeBtn = document.querySelector(".close");

// Data mobil (bisa kamu ganti sesuai kebutuhan)
const dataMobil = {
  avanza: {
    nama: "Toyota Avanza",
    gambar: "gambar/avanza.jpg",
    deskripsi: "Mobil keluarga nyaman dengan kapasitas 7 penumpang dan konsumsi bahan bakar irit.",
    harga: "Rp 350.000 / hari"
  },
  rush: {
    nama: "Toyota Rush",
    gambar: "gambar/rush.png",
    deskripsi: "SUV tangguh cocok untuk perjalanan jauh dan medan menantang.",
    harga: "Rp 450.000 / hari"
  },
  fortuner: {
    nama: "Toyota Fortuner",
    gambar: "gambar/fortuner.png",
    deskripsi: "Mobil premium dengan interior mewah dan performa tinggi.",
    harga: "Rp 700.000 / hari"
  }
};

// Fungsi untuk menampilkan modal
function showMobilInfo(id) {
  const mobil = dataMobil[id];
  if (mobil) {
    modalNama.textContent = mobil.nama;
    modalGambar.src = mobil.gambar;
    modalDeskripsi.textContent = mobil.deskripsi;
    modalHarga.textContent = mobil.harga;
    modal.style.display = "block";
  }
}

// Tutup modal
closeBtn.onclick = () => (modal.style.display = "none");
window.onclick = (event) => {
  if (event.target === modal) modal.style.display = "none";
};
