document.addEventListener("DOMContentLoaded", function () {
  // Slideshow functionality
  const slideshow = document.querySelector(".slideshow");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const playPauseBtn = document.getElementById("playPauseBtn");

  let currentIndex = 0;
  const slideCount = slides.length;
  let slideInterval;
  let isPlaying = true;

  function updateSlide() {
    slideshow.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlide();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlide();
  }

  function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
    isPlaying = true;
    if (playPauseBtn) playPauseBtn.textContent = "Pause";
  }

  function pauseSlideShow() {
    clearInterval(slideInterval);
    isPlaying = false;
    if (playPauseBtn) playPauseBtn.textContent = "Play";
  }

  function togglePlayPause() {
    if (isPlaying) {
      pauseSlideShow();
    } else {
      startSlideShow();
    }
  }

  // Initialize slideshow
  startSlideShow();

  // Button events
  nextBtn.addEventListener("click", () => {
    nextSlide();
    if (!isPlaying) {
      pauseSlideShow();
    }
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    if (!isPlaying) {
      pauseSlideShow();
    }
  });

  if (playPauseBtn) {
    playPauseBtn.addEventListener("click", togglePlayPause);
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlide();
      if (!isPlaying) {
        pauseSlideShow();
      }
    });
  });

  // Pause on hover
  const gallery = document.querySelector(".gallery-container");
  gallery.addEventListener("mouseenter", () => {
    if (isPlaying) {
      pauseSlideShow();
    }
  });

  gallery.addEventListener("mouseleave", () => {
    if (isPlaying) {
      startSlideShow();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === " ") {
      togglePlayPause();
      e.preventDefault(); // Prevent spacebar from scrolling the page
    }
  });
});
