document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener("click", function () {
      mainNav.style.display =
        mainNav.style.display === "block" ? "none" : "block";
    });
  }

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".dot");
  const prevButton = document.querySelector(".testimonial-prev");
  const nextButton = document.querySelector(".testimonial-next");
  let currentSlide = 0;

  function showSlide(index) {
    testimonialSlides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    testimonialSlides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
  }

  if (dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => showSlide(index));
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) newIndex = testimonialSlides.length - 1;
      showSlide(newIndex);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      let newIndex = currentSlide + 1;
      if (newIndex >= testimonialSlides.length) newIndex = 0;
      showSlide(newIndex);
    });
  }

  // Auto slide testimonials
  setInterval(() => {
    if (nextButton) nextButton.click();
  }, 5000);

  // Quick View Modal
  const quickViewButtons = document.querySelectorAll(".quick-view");
  const modal = document.getElementById("quickViewModal");
  const modalClose = document.querySelector(".modal-close");
  const overlay = document.querySelector(".overlay");

  function openModal() {
    if (modal && overlay) {
      modal.style.display = "flex";
      overlay.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    if (modal && overlay) {
      modal.style.display = "none";
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }

  if (quickViewButtons.length > 0) {
    quickViewButtons.forEach((button) => {
      button.addEventListener("click", openModal);
    });
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (overlay) {
    overlay.addEventListener("click", closeModal);
  }

  // Cart Sidebar
  const cartIcon = document.querySelector(".cart-icon");
  const cartSidebar = document.querySelector(".cart-sidebar");
  const cartClose = document.querySelector(".cart-close");

  function openCart() {
    if (cartSidebar && overlay) {
      cartSidebar.classList.add("active");
      overlay.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  }

  function closeCart() {
    if (cartSidebar && overlay) {
      cartSidebar.classList.remove("active");
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }

  if (cartIcon) {
    cartIcon.addEventListener("click", function (e) {
      e.preventDefault();
      openCart();
    });
  }

  if (cartClose) {
    cartClose.addEventListener("click", closeCart);
  }

  // Add to Cart functionality
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartCount = document.querySelector(".cart-count");
  let count = 0;

  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        count++;
        if (cartCount) cartCount.textContent = count;

        // Show notification
        const notification = document.createElement("div");
        notification.className = "notification";
        notification.textContent = "Produto adicionado ao carrinho!";
        document.body.appendChild(notification);

        setTimeout(() => {
          notification.classList.add("show");
        }, 10);

        setTimeout(() => {
          notification.classList.remove("show");
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 2000);
      });
    });
  }

  // Quantity selector
  const minusButtons = document.querySelectorAll(".quantity-button.minus");
  const plusButtons = document.querySelectorAll(".quantity-button.plus");

  if (minusButtons.length > 0) {
    minusButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const input = this.nextElementSibling;
        let value = parseInt(input.value);
        if (value > 1) {
          input.value = value - 1;
        }
      });
    });
  }

  if (plusButtons.length > 0) {
    plusButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const input = this.previousElementSibling;
        let value = parseInt(input.value);
        let max = parseInt(input.getAttribute("max") || "10");
        if (value < max) {
          input.value = value + 1;
        }
      });
    });
  }

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = this.querySelector("input");
      if (input.value) {
        // Show success message
        const formContainer = this.parentElement;
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><p>Obrigado por se inscrever!</p>';

        // Replace form with success message
        this.style.display = "none";
        formContainer.appendChild(successMessage);
      }
    });
  }

  // Add notification styles
  const style = document.createElement("style");
  style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--success-color);
            color: white;
            padding: 1rem;
            border-radius: var(--radius-sm);
            box-shadow: var(--shadow-md);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1001;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .success-message {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            color: var(--success-color);
            margin-top: 1rem;
        }
    `;
  document.head.appendChild(style);
});
