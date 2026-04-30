const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteMenu = document.querySelector(".site-nav");
const yearNodes = document.querySelectorAll(".js-year");
const floatingWhatsAppButton = document.querySelector(".floating-whatsapp-button");
const floatingTopButton = document.querySelector(".floating-top-button");
const faqGroups = document.querySelectorAll(".faq-list");
const megaNavItem = document.querySelector(".nav-item-mega");
const megaTrigger = document.querySelector(".mega-trigger");
const testimonialsCarousel = document.querySelector("[data-testimonials-carousel]");

if (yearNodes.length > 0) {
    const currentYear = new Date().getFullYear();
    yearNodes.forEach((node) => {
        node.textContent = currentYear;
    });
}

if (navToggle && siteHeader && siteMenu) {
    const mobileTreatmentsNavItem = siteMenu.querySelector(".nav-item-mobile-dropdown");
    const mobileTreatmentsTrigger = siteMenu.querySelector(".mobile-treatments-trigger");

    const setMobileTreatmentsOpen = (isOpen) => {
        if (!mobileTreatmentsNavItem || !mobileTreatmentsTrigger) {
            return;
        }

        mobileTreatmentsNavItem.classList.toggle("is-open", isOpen);
        mobileTreatmentsTrigger.setAttribute("aria-expanded", String(isOpen));
    };

    const getMenuFocusables = () =>
        [navToggle, ...siteMenu.querySelectorAll('a[href], button:not([disabled])')].filter(
            (element) => !element.hasAttribute("hidden") && element.getClientRects().length > 0
        );

    const closeSiteMenu = ({ restoreFocus = false } = {}) => {
        setMobileTreatmentsOpen(false);
        siteHeader.classList.remove("menu-open");
        document.body.classList.remove("menu-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");

        if (restoreFocus) {
            navToggle.focus();
        }
    };

    const openSiteMenu = () => {
        siteHeader.classList.add("menu-open");
        document.body.classList.add("menu-open");
        navToggle.setAttribute("aria-expanded", "true");
        navToggle.setAttribute("aria-label", "Close menu");

        const [, firstMenuItem] = getMenuFocusables();
        if (firstMenuItem && window.innerWidth <= 860) {
            firstMenuItem.focus();
        }
    };

    navToggle.addEventListener("click", () => {
        if (siteHeader.classList.contains("menu-open")) {
            closeSiteMenu({ restoreFocus: true });
            return;
        }

        openSiteMenu();
    });

    siteMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            closeSiteMenu();
        });
    });

    if (mobileTreatmentsTrigger) {
        mobileTreatmentsTrigger.addEventListener("click", (event) => {
            if (window.innerWidth > 860) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            setMobileTreatmentsOpen(!mobileTreatmentsNavItem.classList.contains("is-open"));
        });
    }

    document.addEventListener("click", (event) => {
        const clickedInsideHeader = siteHeader.contains(event.target);
        if (!clickedInsideHeader) {
            closeSiteMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!siteHeader.classList.contains("menu-open")) {
            return;
        }

        if (event.key === "Escape") {
            closeSiteMenu({ restoreFocus: true });
            return;
        }

        if (event.key !== "Tab" || window.innerWidth > 860) {
            return;
        }

        const focusableElements = getMenuFocusables();
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement || !lastElement) {
            return;
        }

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 860) {
            closeSiteMenu();
        }
    });
}

if (megaNavItem && megaTrigger) {
    const setMegaOpen = (isOpen) => {
        megaNavItem.classList.toggle("is-open", isOpen);
        megaNavItem.classList.toggle("mega-menu-open", isOpen);
        megaTrigger.setAttribute("aria-expanded", String(isOpen));
    };

    const megaPanel = document.getElementById(megaTrigger.getAttribute("aria-controls"));

    if (megaPanel) {
        megaPanel.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                setMegaOpen(false);
            });
        });
    }

    megaTrigger.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        setMegaOpen(!megaNavItem.classList.contains("is-open"));
    });

    document.addEventListener("click", (event) => {
        if (!megaNavItem.contains(event.target)) {
            setMegaOpen(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && megaNavItem.classList.contains("is-open")) {
            setMegaOpen(false);
            megaTrigger.focus();
        }
    });

    window.addEventListener("resize", () => {
        setMegaOpen(false);
    });
}

if (floatingTopButton || floatingWhatsAppButton) {
    const updateFloatingButtonVisibility = () => {
        if (floatingWhatsAppButton) {
            floatingWhatsAppButton.classList.toggle("is-visible", window.scrollY > 300);
        }

        if (floatingTopButton) {
            floatingTopButton.classList.toggle("is-visible", window.scrollY > 520);
        }
    };

    updateFloatingButtonVisibility();
    window.addEventListener("scroll", updateFloatingButtonVisibility, { passive: true });
}

if (floatingTopButton) {
    floatingTopButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

faqGroups.forEach((group) => {
    const items = Array.from(group.querySelectorAll(".faq-item"));
    items.forEach((item) => {
        item.addEventListener("toggle", () => {
            if (!item.open) {
                return;
            }

            items.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.open = false;
                }
            });
        });
    });
});

if (testimonialsCarousel) {
    const testimonialsTrack = testimonialsCarousel.querySelector(".testimonials-track");
    const previousButton = testimonialsCarousel.querySelector(".testimonial-arrow-prev");
    const nextButton = testimonialsCarousel.querySelector(".testimonial-arrow-next");

    // Add or edit reviews here
    const testimonialsData = [
        {
            name: "Keran",
            review: "I love my brows so much, and it was a pain-free treatment too. Very professional.",
        },
        {
            name: "Michelle",
            review: "One of the best beauty investments I've made. I've had so many compliments on my brows since Gemma did them.",
        },
        {
            name: "Nicola C.",
            review: "Getting my very light blonde eyebrows tattooed by Gemma was the best decision I ever made. It has completely transformed my face and looks perfect.",
        },
        {
            name: "Sophie C.",
            review: "Absolutely love my brows. My only regret is not having them done sooner. Gemma is incredibly talented and has a real eye for perfection.",
        },
    ];

    let currentIndex = 0;

    const getSlidesPerView = () => {
        if (window.innerWidth <= 640) {
            return 1;
        }

        if (window.innerWidth <= 1040) {
            return 2;
        }

        return 4;
    };

    const renderTestimonials = () => {
        testimonialsTrack.innerHTML = testimonialsData
            .map(
                (item) => `
                    <article class="testimonial-slide">
                        <div class="testimonial-entry">
                            <div class="testimonial-meta">
                                <span class="testimonial-stars" aria-label="5 star review">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                                <span class="testimonial-name">${item.name}</span>
                            </div>
                            <p class="testimonial-quote">&ldquo;${item.review}&rdquo;</p>
                        </div>
                    </article>
                `
            )
            .join("");
    };

    const updateCarousel = () => {
        const slides = Array.from(testimonialsTrack.children);
        const slidesPerView = getSlidesPerView();
        const maxIndex = Math.max(0, testimonialsData.length - slidesPerView);

        currentIndex = Math.min(currentIndex, maxIndex);

        const firstSlide = slides[0];
        if (!firstSlide) {
            return;
        }

        const slideWidth = firstSlide.getBoundingClientRect().width;
        const trackStyles = window.getComputedStyle(testimonialsTrack);
        const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
        const offset = currentIndex * (slideWidth + gap);

        testimonialsTrack.style.transform = `translateX(-${offset}px)`;
        previousButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= maxIndex;
    };

    previousButton.addEventListener("click", () => {
        const slidesPerView = getSlidesPerView();
        currentIndex = Math.max(0, currentIndex - slidesPerView);
        updateCarousel();
    });

    nextButton.addEventListener("click", () => {
        const slidesPerView = getSlidesPerView();
        const maxIndex = Math.max(0, testimonialsData.length - slidesPerView);
        currentIndex = Math.min(maxIndex, currentIndex + slidesPerView);
        updateCarousel();
    });

    renderTestimonials();
    updateCarousel();
    window.addEventListener("resize", updateCarousel);
}
