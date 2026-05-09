document.documentElement.classList.add("js-enhanced");

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
const revealNodes = document.querySelectorAll(".reveal");

const debounce = (callback, delay = 120) => {
    let timeoutId;

    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => callback(...args), delay);
    };
};

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

    window.addEventListener("resize", debounce(() => {
        if (window.innerWidth > 860) {
            closeSiteMenu();
        }
    }));
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

    window.addEventListener("resize", debounce(() => {
        setMegaOpen(false);
    }));
}

if (floatingTopButton || floatingWhatsAppButton) {
    let floatingButtonsTicking = false;
    let isWhatsAppVisible = false;
    let isTopButtonVisible = false;

    const updateFloatingButtonVisibility = () => {
        const shouldShowWhatsApp = window.scrollY > 300;
        const shouldShowTopButton = window.scrollY > 520;

        if (floatingWhatsAppButton) {
            floatingWhatsAppButton.classList.toggle("is-visible", shouldShowWhatsApp);
        }

        if (floatingTopButton) {
            floatingTopButton.classList.toggle("is-visible", shouldShowTopButton);
        }

        isWhatsAppVisible = shouldShowWhatsApp;
        isTopButtonVisible = shouldShowTopButton;
    };

    const requestFloatingButtonVisibilityUpdate = () => {
        if (floatingButtonsTicking) {
            return;
        }

        floatingButtonsTicking = true;
        window.requestAnimationFrame(() => {
            const shouldShowWhatsApp = window.scrollY > 300;
            const shouldShowTopButton = window.scrollY > 520;

            if (shouldShowWhatsApp !== isWhatsAppVisible || shouldShowTopButton !== isTopButtonVisible) {
                updateFloatingButtonVisibility();
            }

            floatingButtonsTicking = false;
        });
    };

    updateFloatingButtonVisibility();
    window.addEventListener("scroll", requestFloatingButtonVisibilityUpdate, { passive: true });
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

if (revealNodes.length > 0) {
    const showAllReveals = () => {
        revealNodes.forEach((node) => {
            node.classList.add("is-visible");
        });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        showAllReveals();
    } else if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -10% 0px",
            }
        );

        revealNodes.forEach((node, index) => {
            node.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 60}ms`);
            revealObserver.observe(node);
        });
    } else {
        showAllReveals();
    }
}

if (testimonialsCarousel) {
    const testimonialsTrack = testimonialsCarousel.querySelector(".testimonials-track");
    const previousButton = testimonialsCarousel.querySelector(".testimonial-arrow-prev");
    const nextButton = testimonialsCarousel.querySelector(".testimonial-arrow-next");

    const testimonialsData = [
        {
            name: "Sophie C.",
            review: "Absolutely love my brows &mdash; Gemma took so much care with the shape.",
        },
        {
            name: "Michelle",
            review: "One of the best beauty investments I've made. My brows look natural and I've had so many compliments.",
        },
        {
            name: "Nicola C.",
            review: "My brows have completely transformed my face &mdash; the results are perfect.",
        },
        {
            name: "Stacey Jessop",
            review: "Gemma made me feel completely at ease during my consultation and I love my results.",
        },
        {
            name: "Gemma Jones",
            review: "I travelled to Hull to have my brows done with Gemma &mdash; it was absolutely worth it.",
        },
        {
            name: "Sophia Sharpe",
            review: "I wouldn't trust anyone else with permanent makeup &mdash; professional, warm and incredibly skilled.",
        },
        {
            name: "Stacey Jessop",
            review: "Gemma made me feel completely at ease during my consultation and I love my results.",
        },
        {
            name: "Kaleigh Burdall",
            review: "Gemma gave me my confidence back &mdash; I love my brows.",
        },
        {
            name: "Becky Hadfield",
            review: "Such a talented perfectionist &mdash; I only wish I'd booked my brows sooner.",
        },
        {
            name: "Kelly Smith",
            review: "I felt relaxed the whole time and Gemma explained the aftercare clearly.",
        },
        {
            name: "Sophia Sharpe",
            review: "My brows look beautiful and frame my face perfectly.",
        },
        {
            name: "Jess Thompson",
            review: "A five-star experience from consultation to aftercare &mdash; I felt informed throughout.",
        },
        {
            name: "Diane Large",
            review: "Professional, friendly and incredibly reassuring throughout my treatment.",
        },
        {
            name: "Louise Walker",
            review: "She made me feel completely at ease &mdash; even though I was nervous.",
        },
        {
            name: "Elaine Platten",
            review: "I'm absolutely thrilled with the results &mdash; well worth the wait.",
        },
        {
            name: "Kristy",
            review: "I had lip blush with Gemma and I love the soft colour so much.",
        },
        {
            name: "Brenda Ward",
            review: "Love, love, love my brows &mdash; highly recommend.",
        },
        {
            name: "Tyna",
            review: "After chemo, this treatment helped me feel like myself again.",
        },
        {
            name: "Phil &amp; Carmen P.",
            review: "Amazing results and such a lovely, welcoming experience.",
        },
        {
            name: "Sue Wakefield",
            review: "She corrected my brows after a bad experience &mdash; I'm now delighted with the shape.",
        },
        {
            name: "Kym Bunn",
            review: "I finally have brows again after years &mdash; such a confidence boost.",
        },
        {
            name: "Nicola Tekce",
            review: "I cannot recommend Gemma enough &mdash; the results are incredible.",
        },
        {
            name: "Donna Wright",
            review: "Just had my brows finished today and I absolutely love them. Gemma makes you feel completely at ease and talks you through the full process.",
        },
        {
            name: "Julie",
            review: "She made me feel complete again after a difficult time.",
        },
        {
            name: "Jayne",
            review: "Incredibly talented &mdash; I was amazed when I saw my brows.",
        },
        {
            name: "Donna Weber",
            review: "Such meaningful work &mdash; a truly positive experience.",
        },
        {
            name: "Julie Rawson",
            review: "Professional, informative and gave me exactly the natural result I wanted.",
        },
        {
            name: "Emma Clarkson",
            review: "Friendly, skilled and instantly puts you at ease from the moment you arrive.",
        },
    ];

    let currentIndex = 0;
    let testimonialsInitialized = false;
    let carouselFrameId = 0;

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
        if (carouselFrameId) {
            window.cancelAnimationFrame(carouselFrameId);
        }

        carouselFrameId = window.requestAnimationFrame(() => {
            carouselFrameId = 0;

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
        });
    };

    const initializeTestimonials = () => {
        if (testimonialsInitialized) {
            return;
        }

        testimonialsInitialized = true;

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
        window.addEventListener("resize", debounce(updateCarousel));
    };

    if ("IntersectionObserver" in window) {
        const testimonialsObserver = new IntersectionObserver(
            (entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) {
                    return;
                }

                testimonialsObserver.disconnect();
                initializeTestimonials();
            },
            { rootMargin: "240px 0px" }
        );

        testimonialsObserver.observe(testimonialsCarousel);
    } else if ("requestIdleCallback" in window) {
        window.requestIdleCallback(initializeTestimonials, { timeout: 1200 });
    } else {
        window.setTimeout(initializeTestimonials, 0);
    }
}
