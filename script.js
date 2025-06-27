// ==========================NAVBAR=====================
  window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
      header.classList.add('shadow-md', 'backdrop-blur-md');
      header.style.backgroundColor = 'rgba(44, 47, 139, 0.85)'; // #2c2f8b + opacity
    } else {
      header.classList.remove('shadow-md', 'backdrop-blur-md');
      header.style.backgroundColor = 'transparent';
    }
  });

  const navbarCheckbox = document.getElementById('navbar-open')
  const menuLinks = document.querySelectorAll('nav ul li a')

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarCheckbox.checked = false; // Tutup navbar
    })
  })
// ==========================HOME===============================
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const stepSize = 90;
  const step = Math.floor(scrollY / stepSize);

  // Ambil lebar layar
  const screenWidth = window.innerWidth;

  // Tentukan baseOffset berdasarkan lebar layar
  let baseOffset;
  if (screenWidth < 640) {
    // Mobile (kurang dari sm)
    baseOffset = 5;
  } else if (screenWidth < 768) {
    // Tablet kecil (sm)
    baseOffset = 20;
  } else if (screenWidth < 1024) {
    // Tablet besar (md)
    baseOffset = 180;
  } else if (screenWidth < 1440) {
    // Desktop (lg ke atas)
    baseOffset = 250;
  } else if (screenWidth < 2560) {
    // Desktop (lg ke atas)
    baseOffset = 450;
  } else {
    // Desktop (lg ke atas)
    baseOffset = 900;
  }

  const stepOffset = 20;

  const leftImage = document.getElementById('left-img');
  const rightImage = document.getElementById('right-img');

  leftImage.style.left = `${baseOffset - step * stepOffset}px`;
  rightImage.style.right = `${baseOffset - step * stepOffset}px`;
});

// ==========================SLIDER DAFTAR MENU BEST SELLER=====================
var swiper = new Swiper('.mySwiper', {
  slidesPerView: 5, // jumlah card per layar
  spaceBetween: 16, // jarak antar kartu
  centeredSlides: false,
  loop: true, // infinite
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    1440: { slidesPerView: 5 },
    1024: {slidesPerView: 4},
    640: { slidesPerView: 2 },
    0: { slidesPerView: 1 },
  },
});

// ==========================PRODUCTS FILTER=====================
document.addEventListener("DOMContentLoaded", function () {
  const filterCheckboxes = document.querySelectorAll(".filter-checkbox");
  const menuGrid = document.getElementById("menu-grid");
  const menuTitle = document.getElementById("menu-title");
  const menuCards = Array.from(menuGrid.children);

  // Data menu (contoh)
  const menuData = {
    coffee: "Coffee",
    milk: "Milk Base",
    signature: "Signature",
    tea: "Tea & Mocktails",
  };

  function updateMenu() {
    const checkedFilters = Array.from(filterCheckboxes)
      .filter((cb) => cb.checked && cb.value !== "all")
      .map((cb) => cb.value);

    // Update judul
    if (checkedFilters.length === 0 || filterCheckboxes[0].checked) {
      menuTitle.textContent = "All Variants";
    } else {
      menuTitle.textContent = checkedFilters.map((val) => menuData[val]).join(" & ");
    }

    // Update card yang ditampilkan
    menuCards.forEach((card) => {
      const categories = card.dataset.category.split(",");
      const isVisible = filterCheckboxes[0].checked || checkedFilters.length === 0 || checkedFilters.some((filter) => categories.includes(filter));
      card.style.display = isVisible ? "" : "none";
    });
  }

  filterCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.value === "all" && this.checked) {
        filterCheckboxes.forEach((cb) => {
          if (cb !== this) cb.checked = false;
        });
      } else if (this.value !== "all" && this.checked) {
        filterCheckboxes[0].checked = false;
      }
      updateMenu();
    });
  });

  // Mobile filter popup
  const filterToggle = document.getElementById("filter-toggle");
  const filterPopup = document.getElementById("filter-popup");
  const filterClose = document.getElementById("filter-close");

  if (filterToggle) {
    filterToggle.addEventListener("click", () => {
      filterPopup.classList.add("active");
      filterPopup.classList.remove("hidden");
    });
  }

  if (filterClose) {
    filterClose.addEventListener("click", () => {
      filterPopup.classList.remove("active");
      // Beri jeda sebelum menyembunyikan agar animasi selesai
      setTimeout(() => filterPopup.classList.add("hidden"), 300);
    });
  }

  // Inisialisasi tampilan awal
  updateMenu();
});

// ==========================TESTIMONIAL SLIDER===============================
// Data testimoni
const testimonials = [
  {
    quote:
      '"Saya benar-benar terkesan dengan SeaSpace Coffee. Tempatnya nyaman, pelayanannya ramah, dan pilihan menunya beragam. Setiap tegukan kopi di sini memberikan rasa hangat dan kaya, membuat saya betah berlama-lama. Selain itu, harganya sangat terjangkau untuk kualitas sebagus ini. Pasti saya akan kembali lagi dan merekomendasikan SeaSpace ke teman-teman! ."',
    img: "./img/testi-ariel.png",
    name: "Ariel Ramaditya",
    role: "Youtuber",
  },
  {
    quote: '"Sejak pertama kali mencoba SeaSpace Coffee, saya langsung jatuh cinta. Selain rasanya yang autentik dan kaya, suasana kafenya begitu nyaman untuk bekerja maupun bersantai. Dengan harga yang bersahabat dan kualitas yang konsisten, SeaSpace benar-benar menjadi pilihan utama saya untuk menikmati secangkir kopi spesial setiap hari."',
    img: "./img/testi-reino.png",
    name: "Reino Aimar Rafif",
    role: "Influencer Tiktok",
  },
];
let currentTesti = 0;

function showTestimonial(idx) {
  const quoteEl = document.getElementById("testimonial-quote");
  const imgEl = document.getElementById("testimonial-img");
  const nameEl = document.getElementById("testimonial-name");
  const roleEl = document.getElementById("testimonial-role");
  const dotsContainer = document.getElementById("testimonial-dots");
  if (!quoteEl || !imgEl || !nameEl || !roleEl || !dotsContainer) return;
  const t = testimonials[idx];
  quoteEl.textContent = t.quote;
  imgEl.src = t.img;
  nameEl.textContent = t.name;
  roleEl.textContent = t.role;
  updateDots();
}

function updateDots() {
  const dotsContainer = document.getElementById("testimonial-dots");
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";
  testimonials.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "w-4 h-4 rounded-full mx-1 transition-all duration-200 " + (i === currentTesti ? "bg-[#2C2E83]" : "bg-[#A3A8F0] opacity-80");
    dot.addEventListener("click", () => {
      currentTesti = i;
      showTestimonial(i);
    });
    dotsContainer.appendChild(dot);
  });
}

function setupTestimonialSlider() {
  const btnLeft = document.getElementById("testimonial-left");
  const btnRight = document.getElementById("testimonial-right");
  if (!btnLeft || !btnRight) return;
  btnLeft.addEventListener("click", () => {
    currentTesti = (currentTesti - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTesti);
  });
  btnRight.addEventListener("click", () => {
    currentTesti = (currentTesti + 1) % testimonials.length;
    showTestimonial(currentTesti);
  });
  showTestimonial(currentTesti);
}

document.addEventListener("DOMContentLoaded", setupTestimonialSlider);

