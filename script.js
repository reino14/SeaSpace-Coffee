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
    baseOffset = 50;
  } else if (screenWidth < 768) {
    // Tablet kecil (sm)
    baseOffset = 50;
  } else if (screenWidth < 1024) {
    // Tablet besar (md)
    baseOffset = 170;
  } else if (screenWidth < 1440) {
    // Desktop (lg ke atas)
    baseOffset = 240;
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

// Parallax ilang harga
const wave = document.getElementById('harga');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY > 100) {
    // ubah 100 sesuai kapan efek ingin muncul
    wave.classList.add('translate-x-32', 'opacity-0');
  } else {
    wave.classList.remove('translate-x-32', 'opacity-0');
  }
});
