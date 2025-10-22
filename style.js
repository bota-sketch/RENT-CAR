

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

// ==== Burger Menu ====
const burger = document.createElement("div");
burger.classList.add("burger");
burger.innerHTML = "<div></div><div></div><div></div>";
document.querySelector(".navbar").appendChild(burger);


burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navMenu.classList.toggle("show");
});
