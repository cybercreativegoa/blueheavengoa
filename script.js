/* =========================================================
   BLUE HEAVEN — MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   MENU DATA
   ========================================================= */

const items = [

  ["popular", "Butter Squids", "Tender squid in a rich buttery Goan-style preparation."],
  ["popular", "Crispy Paneer", "Crispy paneer bites with a flavorful house seasoning."],
  ["popular", "Chicken Cafreal", "Goan-style chicken packed with herbs and spices."],
  ["popular", "Fish Curry Rice", "Classic Goan fish curry served with fragrant rice."],

  ["mains", "Chicken Cafreal", "A Goan favourite with fresh herbs and bold spices."],
  ["mains", "Chicken Xacuti", "Slow-cooked chicken in a rich roasted-spice gravy."],
  ["mains", "Pork Sorpotel", "Traditional Goan pork preparation with deep spices."],
  ["mains", "Fish Curry Rice", "Coastal fish curry served with steamed rice."],

  ["vegetarian", "Crispy Paneer", "Golden paneer with crunchy exterior and house seasoning."],
  ["vegetarian", "Goan Vegetable Curry", "Seasonal vegetables in a fragrant coconut-based curry."],
  ["vegetarian", "Garden Salad", "Fresh greens, vegetables and a light dressing."],
  ["vegetarian", "Masala Fries", "Crispy fries finished with a house masala."],

  ["starters", "Chicken Wings", "Crispy wings tossed in a flavorful house sauce."],
  ["starters", "Crispy Paneer", "Crunchy paneer bites with a spicy dip."],
  ["starters", "Calamari", "Lightly seasoned squid served crisp and tender."],
  ["starters", "Masala Fries", "Crispy fries with our signature seasoning."],

  ["seafood", "Butter Squids", "Tender squid cooked in a rich buttery preparation."],
  ["seafood", "Goan Fish Curry", "Classic coconut-based Goan curry with fresh fish."],
  ["seafood", "Prawn Curry", "Juicy prawns cooked in a fragrant coastal curry."],
  ["seafood", "Fish Fry", "Fresh fish marinated with Goan spices and pan fried."],

  ["drinks", "Fresh Lime Soda", "Refreshing lime, soda and a touch of sweetness."],
  ["drinks", "Fresh Fruit Juice", "Seasonal fruit blended fresh to order."],
  ["drinks", "Cold Coffee", "Smooth chilled coffee with a creamy finish."],
  ["drinks", "Iced Tea", "Refreshing chilled tea with citrus notes."]

];

const MENU_PREVIEW_LIMIT = 6;


/* =========================================================
   MENU ELEMENTS
   ========================================================= */

const menuGrid = document.getElementById("menuGrid");
const tabs = document.querySelectorAll("#menuTabs button");
const menuMore = document.getElementById("menuMore");
const viewFullMenuBtn = document.getElementById("viewFullMenu");

let activeCategory = "all";


/* =========================================================
   MENU CARD HTML
   ========================================================= */

function cardHtml([cat, name, desc]) {

  return `
    <article class="menu-item">

      <div class="menu-item-top">

        <h3>${name}</h3>

        <span class="menu-dots"></span>

      </div>

      <p>${desc}</p>

    </article>
  `;
}


/* =========================================================
   MENU CARD ANIMATION
   ========================================================= */

function animateMenuCards() {

  if (!menuGrid) return;

  const cards =
    menuGrid.querySelectorAll(".menu-item");

  cards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform =
      "translateY(22px) scale(.97)";
    card.style.filter = "blur(4px)";

    setTimeout(() => {

      card.style.opacity = "1";

      card.style.transform =
        "translateY(0) scale(1)";

      card.style.filter = "blur(0)";

    }, 70 + (index * 70));

  });
}


/* =========================================================
   RENDER MENU
   ========================================================= */

function renderMenu(category = "all", animate = true) {

  if (!menuGrid) return;

  activeCategory = category;

  const filtered =
    category === "all"
      ? items
      : items.filter(item => item[0] === category);

  const visible =
    filtered.slice(0, MENU_PREVIEW_LIMIT);

  if (
    animate &&
    menuGrid.children.length
  ) {

    menuGrid.classList.add("menu-switching");

  }

  setTimeout(() => {

    menuGrid.innerHTML =
      visible.map(cardHtml).join("") ||

      `
        <div class="empty-menu">
          No dishes found in this category.
        </div>
      `;

    if (menuMore) {

      menuMore.style.display =
        filtered.length > MENU_PREVIEW_LIMIT
          ? "block"
          : "none";

    }

    menuGrid.classList.remove("menu-switching");

    if (animate) {

      animateMenuCards();

    }

  }, animate ? 180 : 0);

}


/* =========================================================
   MENU CATEGORY BUTTONS
   ========================================================= */

tabs.forEach(tab => {

  tab.addEventListener("click", () => {

    const category =
      tab.dataset.category;

    if (
      tab.classList.contains("active") &&
      activeCategory === category
    ) {

      return;

    }

    tabs.forEach(t => {

      t.classList.remove("active");

    });

    tab.classList.add("active");

    renderMenu(category, true);

  });

});


/* Initial menu */

renderMenu("all", false);


/* =========================================================
   FULL MENU MODAL
   ========================================================= */

const menuModal =
  document.getElementById("menuModal");

const menuModalClose =
  document.getElementById("menuModalClose");

const menuModalBody =
  document.getElementById("menuModalBody");

const menuModalTabs =
  document.querySelectorAll("#menuModalTabs button");


/* =========================================================
   MODAL MENU RENDER
   ========================================================= */

function renderModalMenu(category) {

  if (!menuModalBody) return;

  const filtered =
    category === "all"
      ? items
      : items.filter(item => item[0] === category);

  menuModalBody.innerHTML =
    filtered.map(cardHtml).join("") ||

    `
      <div class="empty-menu">
        No dishes found in this category.
      </div>
    `;

  const cards =
    menuModalBody.querySelectorAll(".menu-item");

  cards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform =
      "translateY(18px) scale(.98)";

    card.style.filter =
      "blur(3px)";

    setTimeout(() => {

      card.style.opacity = "1";

      card.style.transform =
        "translateY(0) scale(1)";

      card.style.filter =
        "blur(0)";

    }, 50 + (index * 50));

  });

}


/* =========================================================
   OPEN MENU MODAL
   ========================================================= */

function openMenuModal(category) {

  if (!menuModal) return;

  menuModalTabs.forEach(tab => {

    tab.classList.toggle(
      "active",
      tab.dataset.category === category
    );

  });

  renderModalMenu(category);

  menuModal.classList.add("open");

  document.body.style.overflow = "hidden";

}


/* =========================================================
   CLOSE MENU MODAL
   ========================================================= */

function closeMenuModal() {

  if (!menuModal) return;

  menuModal.classList.remove("open");

  document.body.style.overflow = "";

}


/* =========================================================
   FULL MENU BUTTON
   ========================================================= */

if (viewFullMenuBtn) {

  viewFullMenuBtn.addEventListener("click", () => {

    openMenuModal(activeCategory);

  });

}


/* =========================================================
   MODAL CLOSE BUTTON
   ========================================================= */

if (menuModalClose) {

  menuModalClose.addEventListener(
    "click",
    closeMenuModal
  );

}


/* =========================================================
   CLICK OUTSIDE MODAL
   ========================================================= */

if (menuModal) {

  menuModal.addEventListener("click", event => {

    if (event.target === menuModal) {

      closeMenuModal();

    }

  });

}


/* =========================================================
   MODAL CATEGORY BUTTONS
   ========================================================= */

menuModalTabs.forEach(tab => {

  tab.addEventListener("click", () => {

    menuModalTabs.forEach(t => {

      t.classList.remove("active");

    });

    tab.classList.add("active");

    renderModalMenu(
      tab.dataset.category
    );

  });

});


/* =========================================================
   MOBILE NAVIGATION — UPDATED WITH NEW DROPDOWN
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mobileDropdown = document.getElementById("mobileMenuDropdown");

if (menuToggle && mobileDropdown) {

  menuToggle.addEventListener("click", function (event) {

    event.stopPropagation();

    this.classList.toggle("active");
    mobileDropdown.classList.toggle("open");

    // Toggle overlay class on parent
    const navParent = document.querySelector(".bh-centered-nav");
    if (navParent) {
      navParent.classList.toggle("menu-open");
    }

  });

  /* Close after clicking any navigation link in the dropdown */
  mobileDropdown.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      menuToggle.classList.remove("active");
      mobileDropdown.classList.remove("open");

      const navParent = document.querySelector(".bh-centered-nav");
      if (navParent) {
        navParent.classList.remove("menu-open");
      }

    });

  });

  /* Close when clicking outside */
  document.addEventListener("click", event => {

    if (
      !mobileDropdown.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {

      menuToggle.classList.remove("active");
      mobileDropdown.classList.remove("open");

      const navParent = document.querySelector(".bh-centered-nav");
      if (navParent) {
        navParent.classList.remove("menu-open");
      }

    }

  });

}


/* =========================================================
   HEADER SCROLL STATE
   ========================================================= */

const siteHeader =
  document.getElementById("siteHeader");


if (siteHeader) {

  window.addEventListener(
    "scroll",
    () => {

      siteHeader.classList.toggle(
        "scrolled",
        window.scrollY > 20
      );

    },
    { passive: true }
  );

}


/* =========================================================
   HERO SLIDER
   ========================================================= */

const slides =
  document.querySelectorAll(".hero-slide");

const dots =
  document.querySelectorAll(".dot");

let currentSlide = 0;
let sliderTimer;


/* =========================================================
   SHOW SLIDE
   ========================================================= */

function showSlide(index) {

  if (!slides.length) return;

  currentSlide =
    (index + slides.length) %
    slides.length;

  slides.forEach((slide, i) => {

    slide.classList.toggle(
      "active",
      i === currentSlide
    );

  });

  dots.forEach((dot, i) => {

    dot.classList.toggle(
      "active",
      i === currentSlide
    );

  });

}


/* =========================================================
   START HERO SLIDER
   ========================================================= */

function startSlider() {

  clearInterval(sliderTimer);

  if (slides.length > 1) {

    sliderTimer = setInterval(() => {

      showSlide(currentSlide + 1);

    }, 5000);

  }

}


/* =========================================================
   HERO DOT CONTROLS
   ========================================================= */

dots.forEach(dot => {

  dot.addEventListener("click", () => {

    showSlide(
      Number(dot.dataset.slide)
    );

    startSlider();

  });

});


startSlider();


/* =========================================================
   RESERVATION → WHATSAPP
   ========================================================= */

const reservationForm =
  document.getElementById("reservationForm");


const whatsappNumber =
  "919028910022";


if (reservationForm) {

  reservationForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const date =
        document.getElementById("resDate")?.value || "";

      const name =
        document.getElementById("resName")?.value.trim() || "";

      const time =
        document.getElementById("resTime")?.value || "";

      const email =
        document.getElementById("resEmail")?.value.trim() || "";

      const guests =
        document.getElementById("resGuests")?.value || "";

      const phone =
        document.getElementById("resPhone")?.value.trim() || "";


      /* Format date */

      const formattedDate =
        date
          ? new Date(
              date + "T00:00:00"
            ).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
                year: "numeric"
              }
            )
          : "Not provided";


      /* Format time */

      const formattedTime =
        time
          ? new Date(
              `1970-01-01T${time}`
            ).toLocaleTimeString(
              "en-IN",
              {
                hour: "numeric",
                minute: "2-digit"
              }
            )
          : "Not provided";


      /* WhatsApp message */

      const message =
`NEW TABLE RESERVATION - BLUE HEAVEN

Name: ${name}
Date: ${formattedDate}
Time: ${formattedTime}
Guests: ${guests}
Phone: ${phone}
Email: ${email || "Not provided"}

Please confirm my table reservation.

Thank you!`;


      /* Correct WhatsApp URL */

      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


      window.open(
        whatsappURL,
        "_blank"
      );

    }
  );

}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

const yearElement =
  document.getElementById("year");


if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* =========================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================= */

if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "in-view"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.15
      }
    );


  document
    .querySelectorAll(
      ".fade-up, .fade-left, .fade-right, .scale-in"
    )
    .forEach(el => {

      if (!el.closest(".hero")) {

        revealObserver.observe(el);

      }

    });

}


/* =========================================================
   PRELOADER + HERO ENTRANCE
   ========================================================= */

window.addEventListener("load", () => {

  const preloader =
    document.getElementById("preloader");

  const hero =
    document.querySelector(".hero");

  setTimeout(() => {

    if (preloader) {

      preloader.classList.add("hide");

    }

    if (hero) {

      hero.classList.add("loaded");

    }

  }, 500);

});


/* =========================================================
   HERO — MOUSE PARALLAX
   ========================================================= */

const hero =
  document.querySelector(".hero");

const heroSlides =
  document.querySelectorAll(".hero-slide");

const heroContent =
  document.querySelector(".hero-content");


if (
  hero &&
  heroSlides.length &&
  heroContent
) {

  let mouseX = 0;
  let mouseY = 0;

  let currentX = 0;
  let currentY = 0;


  hero.addEventListener(
    "mousemove",
    event => {

      const rect =
        hero.getBoundingClientRect();

      mouseX =
        (
          (
            event.clientX -
            rect.left
          ) /
          rect.width -
          0.5
        ) * 2;

      mouseY =
        (
          (
            event.clientY -
            rect.top
          ) /
          rect.height -
          0.5
        ) * 2;

    }
  );


  function animateParallax() {

    currentX +=
      (mouseX - currentX) * 0.035;

    currentY +=
      (mouseY - currentY) * 0.035;


    heroSlides.forEach(slide => {

      if (
        slide.classList.contains("active")
      ) {

        slide.style.setProperty(
          "--mouse-x",
          `${currentX * 10}px`
        );

        slide.style.setProperty(
          "--mouse-y",
          `${currentY * 7}px`
        );

      }

    });


    heroContent.style.transform =
      `translate3d(
        ${currentX * -5}px,
        ${currentY * -3}px,
        0
      )`;


    requestAnimationFrame(
      animateParallax
    );

  }


  animateParallax();


  hero.addEventListener(
    "mouseleave",
    () => {

      mouseX = 0;
      mouseY = 0;

    }
  );

}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") return;


    if (
      menuModal &&
      menuModal.classList.contains("open")
    ) {

      closeMenuModal();

    }


    if (mobileDropdown && mobileDropdown.classList.contains("open")) {

      mobileDropdown.classList.remove("open");

    }


    if (menuToggle) {

      menuToggle.classList.remove("active");

    }


    const navParent = document.querySelector(".bh-centered-nav");
    if (navParent) {
      navParent.classList.remove("menu-open");
    }

  }
);


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(targetId);


        if (!target) return;


        event.preventDefault();


        const headerOffset =
          siteHeader
            ? siteHeader.offsetHeight
            : 0;


        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerOffset;


        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

      }
    );

  });


/* =========================================================
   PAGE READY
   ========================================================= */

document.documentElement.classList.add(
  "js-ready"
);


/* =========================================================
   YEARS SINCE 2000 COUNTER
   ========================================================= */

const yearsCounter =
  document.getElementById("yearsCounter");


if (yearsCounter) {

  const startYear = 2000;

  const currentYear =
    new Date().getFullYear();

  const targetYears =
    currentYear - startYear;

  let counterStarted = false;


  if ("IntersectionObserver" in window) {

    const counterObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting &&
              !counterStarted
            ) {

              counterStarted = true;

              let current = 0;

              const duration = 1400;

              const stepTime =
                Math.max(
                  20,
                  Math.floor(
                    duration / targetYears
                  )
                );


              const counter =
                setInterval(() => {

                  current++;

                  yearsCounter.textContent =
                    current;


                  if (
                    current >= targetYears
                  ) {

                    clearInterval(counter);

                    yearsCounter.textContent =
                      targetYears;

                  }

                }, stepTime);


              counterObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.4
        }
      );


    counterObserver.observe(
      yearsCounter
    );

  }

}


/* =========================================================
   AUTOMATIC REVIEWS SLIDESHOW
   ========================================================= */

const reviewsTrack =
  document.getElementById("reviewsTrack");

const reviewCards =
  document.querySelectorAll(".review-card");

let reviewIndex = 0;

let reviewTimer;


/* =========================================================
   NUMBER OF VISIBLE REVIEWS
   ========================================================= */

function getReviewsPerView() {

  if (window.innerWidth <= 680) {

    return 1;

  }

  if (window.innerWidth <= 1000) {

    return 2;

  }

  return 3;

}


/* =========================================================
   SLIDE REVIEWS
   ========================================================= */

function slideReviews() {

  if (
    !reviewsTrack ||
    !reviewCards.length
  ) {

    return;

  }


  const perView =
    getReviewsPerView();

  const totalReviews =
    reviewCards.length;

  const totalGroups =
    Math.ceil(
      totalReviews / perView
    );


  reviewIndex++;


  if (
    reviewIndex >= totalGroups
  ) {

    reviewIndex = 0;

  }


  const cardWidth =
    reviewCards[0].getBoundingClientRect().width;


  const gap =
    window.innerWidth <= 680
      ? 15
      : 20;


  const distance =
    reviewIndex *
    perView *
    (cardWidth + gap);


  reviewsTrack.style.transform =
    `translateX(-${distance}px)`;

}


/* =========================================================
   START REVIEWS
   ========================================================= */

function startReviewSlideshow() {

  clearInterval(reviewTimer);

  reviewTimer =
    setInterval(
      slideReviews,
      4500
    );

}


/* =========================================================
   RESET REVIEWS AFTER RESIZE
   ========================================================= */

window.addEventListener(
  "resize",
  () => {

    reviewIndex = 0;

    if (reviewsTrack) {

      reviewsTrack.style.transform =
        "translateX(0)";

    }

  }
);


/* =========================================================
   INITIALIZE REVIEWS
   ========================================================= */

if (
  reviewsTrack &&
  reviewCards.length
) {

  startReviewSlideshow();

}