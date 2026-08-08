/* =========================================================
   MARS TEE STUDIO
   PREMIUM WEBSITE JAVASCRIPT
   PART 1 / 3

   CORE EXPERIENCE
   - Page initialization
   - Mobile navigation
   - Smooth scrolling
   - Reveal animations
   - Navigation state
   - Premium interaction effects
========================================================= */

"use strict";


/* =========================================================
   01. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
     * Everything starts here.
     * We wait until the HTML has loaded before trying
     * to find or control any elements.
     */

    initializeNavigation();

    initializeSmoothScrolling();

    initializeRevealAnimations();

    initializeNavigationState();

    initializePremiumHoverEffects();

    initializePageLoadAnimation();

});


/* =========================================================
   02. ELEMENT HELPERS
========================================================= */

const $ = (selector, parent = document) => {

    return parent.querySelector(selector);

};


const $$ = (selector, parent = document) => {

    return Array.from(
        parent.querySelectorAll(selector)
    );

};


/* =========================================================
   03. MOBILE NAVIGATION
========================================================= */

function initializeNavigation() {

    const navToggle = $(".nav-toggle");

    const navMenu = $(".nav-menu");

    if (!navToggle || !navMenu) {

        return;

    }


    /*
     * Open / close mobile navigation.
     */

    navToggle.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle("open");


        navToggle.classList.toggle(
            "active",
            isOpen
        );


        navToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        /*
         * Prevent the page from scrolling behind
         * the mobile navigation.
         */

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    /*
     * Close menu when a navigation link is clicked.
     */

    $$(".nav-menu a").forEach(link => {

        link.addEventListener("click", () => {

            closeMobileNavigation();

        });

    });


    /*
     * Close menu when clicking outside it.
     */

    document.addEventListener("click", event => {

        if (!navMenu.classList.contains("open")) {

            return;

        }


        const clickedInsideMenu =
            navMenu.contains(event.target);


        const clickedToggle =
            navToggle.contains(event.target);


        if (!clickedInsideMenu && !clickedToggle) {

            closeMobileNavigation();

        }

    });


    /*
     * Close menu when Escape is pressed.
     */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMobileNavigation();

        }

    });

}


/* =========================================================
   04. CLOSE MOBILE NAVIGATION
========================================================= */

function closeMobileNavigation() {

    const navToggle = $(".nav-toggle");

    const navMenu = $(".nav-menu");


    if (!navMenu) {

        return;

    }


    navMenu.classList.remove("open");


    if (navToggle) {

        navToggle.classList.remove("active");

        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    document.body.classList.remove(
        "menu-open"
    );

}


/* =========================================================
   05. SMOOTH SCROLLING
========================================================= */

function initializeSmoothScrolling() {

    const internalLinks =
        $$('a[href^="#"]');


    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            /*
             * Ignore a plain "#" link.
             */

            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) {

                return;

            }


            event.preventDefault();


            /*
             * Account for the sticky navigation.
             */

            const header =
                $(".site-header");


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;


            window.scrollTo({

                top:
                    targetPosition,

                behavior:
                    "smooth"

            });


            /*
             * Update the URL without jumping.
             */

            if (
                window.history &&
                window.history.pushState
            ) {

                window.history.pushState(
                    null,
                    "",
                    targetId
                );

            }

        });

    });

}


/* =========================================================
   06. REVEAL ANIMATIONS
========================================================= */

function initializeRevealAnimations() {

    const revealElements =
        $$(".reveal");


    if (!revealElements.length) {

        return;

    }


    /*
     * If the browser does not support
     * IntersectionObserver, show everything.
     */

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {

                        return;

                    }


                    entry.target.classList.add(
                        "visible"
                    );


                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },
            {

                threshold:
                    0.12,

                rootMargin:
                    "0px 0px -50px 0px"

            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   07. STAGGERED CARD ANIMATIONS
========================================================= */

function initializeStaggeredAnimations() {

    const groups = [

        ".service-grid .service-card",

        ".experience-showcase .experience-card",

        ".process-grid .process-card",

        ".guidance-cards .guidance-card"

    ];


    groups.forEach(selector => {

        const elements =
            $$(selector);


        elements.forEach((element, index) => {

            /*
             * Small delays make the cards appear
             * one after another instead of all at once.
             */

            element.style.setProperty(
                "--reveal-delay",
                `${index * 90}ms`
            );

        });

    });

}


/* =========================================================
   08. NAVIGATION ACTIVE STATE
========================================================= */

function initializeNavigationState() {

    const navLinks =
        $$(".nav-menu a[href^='#']");


    const sections =
        $$("main section[id]");


    if (
        !navLinks.length ||
        !sections.length
    ) {

        return;

    }


    /*
     * Highlight the section currently visible
     * on the screen.
     */

    const updateActiveNavigation =
        () => {

            const scrollPosition =
                window.scrollY +
                window.innerHeight * 0.35;


            let currentSection = "";


            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop;


                const sectionBottom =
                    sectionTop +
                    section.offsetHeight;


                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionBottom
                ) {

                    currentSection =
                        section.id;

                }

            });


            navLinks.forEach(link => {

                const linkTarget =
                    link.getAttribute("href");


                const isActive =
                    linkTarget ===
                    `#${currentSection}`;


                link.classList.toggle(
                    "active",
                    isActive
                );

            });

        };


    let ticking = false;


    window.addEventListener(
        "scroll",
        () => {

            if (ticking) {

                return;

            }


            window.requestAnimationFrame(() => {

                updateActiveNavigation();

                ticking = false;

            });


            ticking = true;

        },
        {
            passive: true
        }
    );


    updateActiveNavigation();

}


/* =========================================================
   09. PREMIUM HOVER EFFECTS
========================================================= */

function initializePremiumHoverEffects() {

    /*
     * We don't want heavy effects on touch devices.
     */

    const hasFinePointer =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (!hasFinePointer) {

        return;

    }


    initializeCardTilt();

    initializeMagneticButtons();

}


/* =========================================================
   10. SUBTLE CARD TILT
========================================================= */

function initializeCardTilt() {

    const cards = $$(
        ".service-card, " +
        ".experience-card, " +
        ".process-card, " +
        ".guidance-card"
    );


    cards.forEach(card => {

        card.addEventListener(
            "pointermove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                /*
                 * Keep the movement very small.
                 * Luxury design should feel subtle,
                 * not like a gaming website.
                 */

                const rotateX =
                    ((y - centerY) /
                    centerY) * -2;


                const rotateY =
                    ((x - centerX) /
                    centerX) * 2;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   11. MAGNETIC BUTTON EFFECT
========================================================= */

function initializeMagneticButtons() {

    const buttons = $$(
        ".btn-primary, " +
        ".btn-outline, " +
        ".nav-cta"
    );


    buttons.forEach(button => {

        button.addEventListener(
            "pointermove",
            event => {

                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                const moveX =
                    x * 0.10;


                const moveY =
                    y * 0.10;


                button.style.transform =
                    `translate(${moveX}px, ${moveY}px)`;

            }
        );


        button.addEventListener(
            "pointerleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   12. PAGE LOAD ANIMATION
========================================================= */

function initializePageLoadAnimation() {

    /*
     * Give the browser one frame to paint the page
     * before starting the entrance animation.
     */

    requestAnimationFrame(() => {

        document.body.classList.add(
            "page-loaded"
        );


        initializeStaggeredAnimations();

    });

}


/* =========================================================
   13. SCROLL LOCK HELPER
========================================================= */

function lockPageScroll() {

    document.body.classList.add(
        "scroll-locked"
    );

}


function unlockPageScroll() {

    document.body.classList.remove(
        "scroll-locked"
    );

}


/* =========================================================
   14. RESIZE HANDLING
========================================================= */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(resizeTimer);


        resizeTimer =
            setTimeout(() => {

                /*
                 * If the screen becomes large again,
                 * remove the mobile menu state.
                 */

                if (
                    window.innerWidth > 850
                ) {

                    closeMobileNavigation();

                }

            }, 150);

    },
    {
        passive: true
    }
);


/* =========================================================
   15. PREMIUM SECTION PARALLAX
========================================================= */

function initializeSectionParallax() {

    const elements = $$(
        ".hero-glow-orb, " +
        ".cta-glow-one, " +
        ".cta-glow-two"
    );


    if (!elements.length) {

        return;

    }


    const finePointer =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (!finePointer) {

        return;

    }


    let animationFrame = null;


    window.addEventListener(
        "scroll",
        () => {

            if (animationFrame) {

                return;

            }


            animationFrame =
                requestAnimationFrame(() => {

                    const scrollY =
                        window.scrollY;


                    elements.forEach(
                        (element, index) => {

                            const speed =
                                index % 2 === 0
                                    ? 0.035
                                    : -0.025;


                            element.style.transform =
                                `translate3d(
                                    0,
                                    ${scrollY * speed}px,
                                    0
                                )`;

                        }
                    );


                    animationFrame =
                        null;

                });

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   16. INITIALIZE PARALLAX
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeSectionParallax();

    }
);


/* =========================================================
   MARS TEE STUDIO
   PREMIUM WEBSITE JAVASCRIPT
   PART 2 / 3

   INTERACTIVE EXPERIENCE
   - Dark / light mode
   - Back-to-top button
   - Animated statistics
   - Hero effects
   - Image loading
   - Service interactions
   - Cursor glow
   - Button ripple
========================================================= */


/* =========================================================
   17. THEME SYSTEM
========================================================= */

function initializeTheme() {

    const toggle =
        $("#theme-toggle");


    if (!toggle) {

        return;

    }


    const savedTheme =
        localStorage.getItem(
            "mars-tee-theme"
        );


    /*
     * Restore the customer's previous choice.
     */

    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

        toggle.checked = true;

    }


    if (savedTheme === "light") {

        document.body.classList.remove(
            "dark-mode"
        );

        toggle.checked = false;

    }


    /*
     * Change theme when the switch is clicked.
     */

    toggle.addEventListener(
        "change",
        () => {

            const darkMode =
                toggle.checked;


            document.body.classList.toggle(
                "dark-mode",
                darkMode
            );


            localStorage.setItem(
                "mars-tee-theme",
                darkMode
                    ? "dark"
                    : "light"
            );

        }
    );

}


/* =========================================================
   18. START THEME SYSTEM
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeTheme();

    }
);


/* =========================================================
   19. BACK TO TOP
========================================================= */

function initializeBackToTop() {

    const button =
        $("#backToTop");


    if (!button) {

        return;

    }


    const updateButton =
        () => {

            if (window.scrollY > 500) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );

            }

        };


    window.addEventListener(
        "scroll",
        updateButton,
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top:
                    0,

                behavior:
                    "smooth"

            });

        }
    );


    updateButton();

}


/* =========================================================
   20. INITIALIZE BACK TO TOP
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeBackToTop();

    }
);


/* =========================================================
   21. ANIMATED NUMBERS
========================================================= */

function initializeCounters() {

    const counters =
        $$(".counter");


    if (!counters.length) {

        return;

    }


    if (
        !("IntersectionObserver" in window)
    ) {

        counters.forEach(counter => {

            counter.textContent =
                counter.dataset.target ||
                counter.textContent;

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    animateCounter(
                        entry.target
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold:
                    0.7
            }
        );


    counters.forEach(counter => {

        observer.observe(counter);

    });

}


/* =========================================================
   22. COUNTER ANIMATION
========================================================= */

function animateCounter(element) {

    const target =
        Number(
            element.dataset.target ||
            element.textContent.replace(
                /[^0-9.]/g,
                ""
            )
        );


    if (
        Number.isNaN(target)
    ) {

        return;

    }


    const suffix =
        element.dataset.suffix || "";


    const duration =
        1500;


    const startTime =
        performance.now();


    const update =
        currentTime => {

            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            /*
             * Ease-out animation.
             */

            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const current =
                target * eased;


            element.textContent =
                `${Math.floor(current)}${suffix}`;


            if (
                progress < 1
            ) {

                requestAnimationFrame(
                    update
                );

            } else {

                element.textContent =
                    `${target}${suffix}`;

            }

        };


    requestAnimationFrame(
        update
    );

}


/* =========================================================
   23. START COUNTERS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeCounters();

    }
);


/* =========================================================
   24. HERO MOUSE MOVEMENT
========================================================= */

function initializeHeroInteraction() {

    const hero =
        $(".hero");


    const visual =
        $(".hero-visual");


    if (
        !hero ||
        !visual
    ) {

        return;

    }


    const finePointer =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (!finePointer) {

        return;

    }


    hero.addEventListener(
        "pointermove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            const x =
                (
                    event.clientX -
                    rect.left
                ) / rect.width;


            const y =
                (
                    event.clientY -
                    rect.top
                ) / rect.height;


            const moveX =
                (x - 0.5) * 12;


            const moveY =
                (y - 0.5) * 8;


            visual.style.transform =
                `translate3d(
                    ${moveX}px,
                    ${moveY}px,
                    0
                )`;

        }
    );


    hero.addEventListener(
        "pointerleave",
        () => {

            visual.style.transform =
                "";

        }
    );

}


/* =========================================================
   25. START HERO INTERACTION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeHeroInteraction();

    }
);


/* =========================================================
   26. IMAGE LOADING EFFECT
========================================================= */

function initializeImageLoading() {

    const images =
        $$("img");


    images.forEach(image => {

        /*
         * If the image has already loaded,
         * mark it immediately.
         */

        if (image.complete) {

            image.classList.add(
                "image-loaded"
            );

            return;

        }


        image.addEventListener(
            "load",
            () => {

                image.classList.add(
                    "image-loaded"
                );

            },
            {
                once: true
            }
        );


        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

            },
            {
                once: true
            }
        );

    });

}


/* =========================================================
   27. START IMAGE LOADING
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeImageLoading();

    }
);


/* =========================================================
   28. CURSOR GLOW
========================================================= */

function initializeCursorGlow() {

    const finePointer =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (!finePointer) {

        return;

    }


    const glow =
        document.createElement("div");


    glow.className =
        "cursor-glow";


    document.body.appendChild(
        glow
    );


    let mouseX = -100;

    let mouseY = -100;

    let currentX = -100;

    let currentY = -100;


    document.addEventListener(
        "pointermove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

        },
        {
            passive: true
        }
    );


    const animate =
        () => {

            currentX +=
                (mouseX - currentX) *
                0.12;


            currentY +=
                (mouseY - currentY) *
                0.12;


            glow.style.transform =
                `translate3d(
                    ${currentX}px,
                    ${currentY}px,
                    0
                )`;


            requestAnimationFrame(
                animate
            );

        };


    animate();


    /*
     * Hide the effect when the pointer
     * leaves the browser window.
     */

    document.addEventListener(
        "mouseleave",
        () => {

            glow.classList.remove(
                "visible"
            );

        }
    );


    document.addEventListener(
        "mouseenter",
        () => {

            glow.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================================
   29. START CURSOR GLOW
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeCursorGlow();

    }
);


/* =========================================================
   30. BUTTON RIPPLE
========================================================= */

function initializeButtonRipple() {

    const buttons =
        $$(
            ".btn, " +
            ".nav-cta, " +
            ".project-btn"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                /*
                 * Do not create the effect if the
                 * user is opening a new tab.
                 */

                if (
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey
                ) {

                    return;

                }


                const rect =
                    button.getBoundingClientRect();


                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.className =
                    "button-ripple";


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                ripple.style.width =
                    `${size}px`;


                ripple.style.height =
                    `${size}px`;


                ripple.style.left =
                    `${
                        event.clientX -
                        rect.left -
                        size / 2
                    }px`;


                ripple.style.top =
                    `${
                        event.clientY -
                        rect.top -
                        size / 2
                    }px`;


                button.appendChild(
                    ripple
                );


                setTimeout(
                    () => {

                        ripple.remove();

                    },
                    650
                );

            }
        );

    });

}


/* =========================================================
   31. START BUTTON RIPPLE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeButtonRipple();

    }
);


/* =========================================================
   32. SERVICE CARD INTERACTION
========================================================= */

function initializeServiceInteractions() {

    const cards =
        $$(".service-card");


    cards.forEach(card => {

        const link =
            $(".service-link", card);


        if (!link) {

            return;

        }


        card.addEventListener(
            "click",
            event => {

                /*
                 * Don't interfere with an actual
                 * link click.
                 */

                if (
                    event.target.closest("a")
                ) {

                    return;

                }


                link.focus();

            }
        );

    });

}


/* =========================================================
   33. START SERVICE INTERACTIONS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeServiceInteractions();

    }
);


/* =========================================================
   34. PORTFOLIO IMAGE EFFECT
========================================================= */

function initializePortfolioEffects() {

    const cards =
        $$(".work-card");


    const finePointer =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (!finePointer) {

        return;

    }


    cards.forEach(card => {

        const image =
            $("img", card);


        if (!image) {

            return;

        }


        card.addEventListener(
            "pointermove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) / rect.width;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) / rect.height;


                const moveX =
                    (x - 0.5) * 8;


                const moveY =
                    (y - 0.5) * 8;


                image.style.transform =
                    `scale(1.06)
                     translate(
                        ${moveX}px,
                        ${moveY}px
                     )`;

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                image.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   35. START PORTFOLIO EFFECTS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializePortfolioEffects();

    }
);


/* =========================================================
   36. SECTION KICKER ANIMATION
========================================================= */

function initializeKickerAnimation() {

    const kickers =
        $$(".section-kicker");


    if (!kickers.length) {

        return;

    }


    if (
        !("IntersectionObserver" in window)
    ) {

        kickers.forEach(kicker => {

            kicker.classList.add(
                "kicker-visible"
            );

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "kicker-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold:
                    0.5
            }
        );


    kickers.forEach(kicker => {

        observer.observe(kicker);

    });

}


/* =========================================================
   37. START KICKER ANIMATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeKickerAnimation();

    }
);


/* =========================================================
   38. PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        /*
         * When the customer switches tabs,
         * we don't need to keep expensive
         * visual work running.
         */

        if (
            document.hidden
        ) {

            document.body.classList.add(
                "page-hidden"
            );

        } else {

            document.body.classList.remove(
                "page-hidden"
            );

        }

    }
);


/* =========================================================
   MARS TEE STUDIO
   PREMIUM WEBSITE JAVASCRIPT
   PART 3 / 3

   BUSINESS EXPERIENCE
   - Order / inquiry handling
   - WhatsApp integration
   - Pricing package preparation
   - Digital experience selection
   - Form validation
   - Copy to clipboard
   - Notifications
   - Loading states
   - Performance optimization
   - Accessibility
========================================================= */


/* =========================================================
   39. MARS TEE CONFIGURATION
========================================================= */

const MARS_TEE_CONFIG = {

    /*
     * Replace this with the WhatsApp number you want
     * customers to contact.
     *
     * Use international format WITHOUT + or spaces.
     *
     * Example:
     * 2348012345678
     */

    whatsapp:
        "2340000000000",


    /*
     * Studio name used in generated messages.
     */

    studio:
        "Mars Tee Studio",


    /*
     * Default message.
     */

    defaultMessage:
        "Hello Mars Tee Studio, I would like to make an enquiry about your services."

};


/* =========================================================
   40. WHATSAPP URL BUILDER
========================================================= */

function createWhatsAppURL(message = "") {

    const finalMessage =
        message.trim() ||
        MARS_TEE_CONFIG.defaultMessage;


    return (
        "https://wa.me/" +
        MARS_TEE_CONFIG.whatsapp +
        "?text=" +
        encodeURIComponent(finalMessage)
    );

}


/* =========================================================
   41. WHATSAPP BUTTON
========================================================= */

function initializeWhatsApp() {

    const whatsappButtons =
        $$(
            ".whatsapp-float, " +
            "[data-whatsapp]"
        );


    if (!whatsappButtons.length) {

        return;

    }


    whatsappButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                /*
                 * If a custom message was supplied,
                 * use it.
                 */

                const customMessage =
                    button.dataset.whatsappMessage ||
                    "";


                const url =
                    createWhatsAppURL(
                        customMessage
                    );


                /*
                 * Only prevent the default action
                 * when the button doesn't already
                 * contain a proper link.
                 */

                if (
                    !button.getAttribute("href")
                ) {

                    event.preventDefault();

                    window.open(
                        url,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }

            }
        );

    });

}


/* =========================================================
   42. CUSTOMER ENQUIRY MESSAGE
========================================================= */

function createEnquiryMessage(data = {}) {

    const service =
        data.service ||
        "General enquiry";


    const packageName =
        data.package ||
        "Not selected";


    const message =
        data.message ||
        "I would like to make an enquiry.";


    return `Hello ${MARS_TEE_CONFIG.studio},

I would like to make an enquiry.

Service: ${service}
Package: ${packageName}

Message:
${message}

Thank you.`;


}


/* =========================================================
   43. ORDER / INQUIRY BUTTONS
========================================================= */

function initializeOrderButtons() {

    const buttons =
        $$(
            "[data-order], " +
            "[data-enquire]"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const service =
                    button.dataset.service ||
                    button.dataset.order ||
                    "Mars Tee Studio service";


                const packageName =
                    button.dataset.package ||
                    "Not selected";


                const message =
                    createEnquiryMessage({

                        service:
                            service,

                        package:
                            packageName

                    });


                const url =
                    createWhatsAppURL(
                        message
                    );


                /*
                 * Allow normal anchor links to work
                 * if the element already has a valid
                 * destination.
                 */

                if (
                    button.tagName.toLowerCase() ===
                    "a"
                ) {

                    button.href =
                        url;

                    return;

                }


                event.preventDefault();


                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    });

}


/* =========================================================
   44. PRICING PACKAGE SELECTION
========================================================= */

function initializePackageSelection() {

    const packageCards =
        $$(
            ".pricing-card, " +
            ".package-card, " +
            "[data-package]"
        );


    if (!packageCards.length) {

        return;

    }


    packageCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                packageCards.forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                card.classList.add(
                    "selected"
                );


                const packageName =
                    card.dataset.package ||
                    $(".package-name", card)?.textContent?.trim() ||
                    "Selected package";


                /*
                 * Store the customer's selection
                 * so it can be used later by an
                 * order form.
                 */

                sessionStorage.setItem(
                    "marsTeeSelectedPackage",
                    packageName
                );

            }
        );

    });

}


/* =========================================================
   45. SERVICE SELECTION
========================================================= */

function initializeServiceSelection() {

    const serviceItems =
        $$(
            "[data-service-select]"
        );


    serviceItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const service =
                    item.dataset.serviceSelect;


                if (!service) {

                    return;

                }


                sessionStorage.setItem(
                    "marsTeeSelectedService",
                    service
                );


                /*
                 * Visually show the selection.
                 */

                serviceItems.forEach(
                    serviceItem => {

                        serviceItem.classList.remove(
                            "selected"
                        );

                    }
                );


                item.classList.add(
                    "selected"
                );

            }
        );

    });

}


/* =========================================================
   46. DIGITAL EXPERIENCE TYPES
========================================================= */

const DIGITAL_EXPERIENCES = {

    invitation:
        "Digital Invitation",

    birthday:
        "Birthday Surprise",

    wedding:
        "Wedding Experience",

    proposal:
        "Digital Proposal",

    apology:
        "Digital Apology",

    letter:
        "Digital Letter",

    portfolio:
        "Digital Portfolio",

    announcement:
        "Digital Announcement",

    custom:
        "Custom Digital Experience"

};


/* =========================================================
   47. DIGITAL EXPERIENCE BUTTONS
========================================================= */

function initializeDigitalExperiences() {

    const buttons =
        $$(
            "[data-experience]"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const type =
                    button.dataset.experience;


                const experience =
                    DIGITAL_EXPERIENCES[type] ||
                    type;


                sessionStorage.setItem(
                    "marsTeeExperience",
                    experience
                );


                /*
                 * Add a premium selected state.
                 */

                buttons.forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                button.classList.add(
                    "selected"
                );


                showNotification(
                    `${experience} selected.`
                );

            }
        );

    });

}


/* =========================================================
   48. FORM VALIDATION
========================================================= */

function initializeForms() {

    const forms =
        $$("form");


    if (!forms.length) {

        return;

    }


    forms.forEach(form => {

        form.addEventListener(
            "submit",
            event => {

                const requiredFields =
                    $$(
                        "[required]",
                        form
                    );


                let valid = true;


                requiredFields.forEach(
                    field => {

                        if (
                            !field.value.trim()
                        ) {

                            valid = false;

                            markFieldError(
                                field
                            );

                        } else {

                            clearFieldError(
                                field
                            );

                        }

                    }
                );


                /*
                 * Basic email validation.
                 */

                const email =
                    $('input[type="email"]', form);


                if (
                    email &&
                    email.value.trim() &&
                    !isValidEmail(
                        email.value.trim()
                    )
                ) {

                    valid = false;

                    markFieldError(
                        email
                    );

                }


                if (!valid) {

                    event.preventDefault();


                    showNotification(
                        "Please check the highlighted fields.",
                        "error"
                    );


                    return;

                }


                /*
                 * Add a temporary loading state.
                 */

                const submitButton =
                    form.querySelector(
                        '[type="submit"]'
                    );


                if (submitButton) {

                    setButtonLoading(
                        submitButton
                    );

                }

            }
        );


        /*
         * Remove error state while the customer
         * starts correcting the field.
         */

        $$(
            "input, textarea, select",
            form
        ).forEach(field => {

            field.addEventListener(
                "input",
                () => {

                    clearFieldError(
                        field
                    );

                });

        });

    });

}


/* =========================================================
   49. EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* =========================================================
   50. FORM ERROR
========================================================= */

function markFieldError(field) {

    field.classList.add(
        "field-error"
    );


    field.setAttribute(
        "aria-invalid",
        "true"
    );

}


/* =========================================================
   51. CLEAR FORM ERROR
========================================================= */

function clearFieldError(field) {

    field.classList.remove(
        "field-error"
    );


    field.removeAttribute(
        "aria-invalid"
    );

}


/* =========================================================
   52. BUTTON LOADING STATE
========================================================= */

function setButtonLoading(button) {

    if (
        button.dataset.loading === "true"
    ) {

        return;

    }


    button.dataset.loading =
        "true";


    button.dataset.originalText =
        button.innerHTML;


    button.innerHTML =
        `
        <span class="button-spinner"></span>
        <span>Processing...</span>
        `;


    button.disabled =
        true;


    /*
     * Restore automatically after a short period.
     * A real backend can later control this properly.
     */

    setTimeout(
        () => {

            button.innerHTML =
                button.dataset.originalText;


            button.disabled =
                false;


            button.dataset.loading =
                "false";

        },
        1800
    );

}


/* =========================================================
   53. NOTIFICATION SYSTEM
========================================================= */

function showNotification(
    message,
    type = "success"
) {

    /*
     * Remove an existing notification first.
     */

    const existing =
        $(".mars-notification");


    if (existing) {

        existing.remove();

    }


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        `mars-notification ${type}`;


    notification.setAttribute(
        "role",
        "status"
    );


    notification.innerHTML =
        `
        <span class="notification-icon">
            ${
                type === "error"
                    ? "!"
                    : "✓"
            }
        </span>

        <span class="notification-message">
            ${escapeHTML(message)}
        </span>

        <button
            type="button"
            class="notification-close"
            aria-label="Close notification"
        >
            ×
        </button>
        `;


    document.body.appendChild(
        notification
    );


    requestAnimationFrame(
        () => {

            notification.classList.add(
                "visible"
            );

        }
    );


    const close =
        $(".notification-close", notification);


    close.addEventListener(
        "click",
        () => {

            removeNotification(
                notification
            );

        }
    );


    setTimeout(
        () => {

            removeNotification(
                notification
            );

        },
        4500
    );

}


/* =========================================================
   54. REMOVE NOTIFICATION
========================================================= */

function removeNotification(
    notification
) {

    if (!notification) {

        return;

    }


    notification.classList.remove(
        "visible"
    );


    setTimeout(
        () => {

            notification.remove();

        },
        300
    );

}


/* =========================================================
   55. ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   56. COPY TO CLIPBOARD
========================================================= */

async function copyToClipboard(
    text
) {

    try {

        await navigator.clipboard.writeText(
            text
        );


        showNotification(
            "Copied to clipboard."
        );


        return true;

    } catch (error) {

        /*
         * Older-browser fallback.
         */

        const textarea =
            document.createElement(
                "textarea"
            );


        textarea.value =
            text;


        textarea.style.position =
            "fixed";


        textarea.style.opacity =
            "0";


        document.body.appendChild(
            textarea
        );


        textarea.select();


        try {

            document.execCommand(
                "copy"
            );


            showNotification(
                "Copied to clipboard."
            );


            textarea.remove();


            return true;

        } catch (fallbackError) {

            textarea.remove();


            showNotification(
                "Unable to copy.",
                "error"
            );


            return false;

        }

    }

}


/* =========================================================
   57. COPY BUTTONS
========================================================= */

function initializeCopyButtons() {

    const buttons =
        $$(
            "[data-copy]"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                const text =
                    button.dataset.copy;


                if (!text) {

                    return;

                }


                const success =
                    await copyToClipboard(
                        text
                    );


                if (success) {

                    const original =
                        button.innerHTML;


                    button.innerHTML =
                        "Copied ✓";


                    setTimeout(
                        () => {

                            button.innerHTML =
                                original;

                        },
                        1500
                    );

                }

            }
        );

    });

}


/* =========================================================
   58. CONTACT FORM → WHATSAPP
========================================================= */

function initializeWhatsAppForms() {

    const forms =
        $$(
            "[data-whatsapp-form]"
        );


    forms.forEach(form => {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const formData =
                    new FormData(form);


                const name =
                    formData.get("name") ||
                    "Not provided";


                const email =
                    formData.get("email") ||
                    "Not provided";


                const service =
                    formData.get("service") ||
                    "General enquiry";


                const message =
                    formData.get("message") ||
                    "No additional message.";


                const selectedPackage =
                    sessionStorage.getItem(
                        "marsTeeSelectedPackage"
                    ) ||
                    "Not selected";


                const selectedExperience =
                    sessionStorage.getItem(
                        "marsTeeExperience"
                    ) ||
                    "Not selected";


                const whatsappMessage =

`Hello Mars Tee Studio,

I would like to make an enquiry.

Name: ${name}
Email: ${email}

Service: ${service}
Package: ${selectedPackage}
Digital Experience: ${selectedExperience}

Message:
${message}

I look forward to hearing from you.`;


                window.open(
                    createWhatsAppURL(
                        whatsappMessage
                    ),
                    "_blank",
                    "noopener,noreferrer"
                );


                showNotification(
                    "Opening WhatsApp..."
                );

            }
        );

    });

}


/* =========================================================
   59. PERFORMANCE: LAZY IMAGE OBSERVER
========================================================= */

function initializeLazyImages() {

    const images =
        $$("img[data-src]");


    if (!images.length) {

        return;

    }


    if (
        !("IntersectionObserver" in window)
    ) {

        images.forEach(
            image => {

                image.src =
                    image.dataset.src;

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        const image =
                            entry.target;


                        image.src =
                            image.dataset.src;


                        image.removeAttribute(
                            "data-src"
                        );


                        observer.unobserve(
                            image
                        );

                    }
                );

            },
            {
                rootMargin:
                    "150px"
            }
        );


    images.forEach(
        image => {

            observer.observe(
                image
            );

        }
    );

}


/* =========================================================
   60. REDUCED MOTION CHECK
========================================================= */

function prefersReducedMotion() {

    return window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

}


/* =========================================================
   61. STOP HEAVY EFFECTS FOR REDUCED MOTION
========================================================= */

function initializeAccessibilityMotion() {

    if (
        !prefersReducedMotion()
    ) {

        return;

    }


    document.body.classList.add(
        "reduced-motion"
    );


    /*
     * Make sure reveal elements are immediately visible.
     */

    $$(".reveal").forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================================
   62. CLEAR TEMPORARY STORAGE
========================================================= */

function initializeStorageCleanup() {

    /*
     * The selected package/service is useful during
     * the current visit, but it shouldn't live forever.
     */

    window.addEventListener(
        "beforeunload",
        () => {

            /*
             * sessionStorage automatically clears
             * when the browsing session ends.
             */

        }
    );

}


/* =========================================================
   63. FINAL INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeWhatsApp();

        initializeOrderButtons();

        initializePackageSelection();

        initializeServiceSelection();

        initializeDigitalExperiences();

        initializeForms();

        initializeCopyButtons();

        initializeWhatsAppForms();

        initializeLazyImages();

        initializeAccessibilityMotion();

        initializeStorageCleanup();

    }
);


/* =========================================================
   64. CONSOLE BRAND MESSAGE
========================================================= */

console.log(
    "%cMars Tee Studio",
    "font-size:22px;font-weight:800;color:#2563eb;"
);


console.log(
    "%cDigital experiences. Premium design. Built to impress.",
    "font-size:12px;color:#64748b;"
);


/* =========================================================
   65. FINAL PERFORMANCE TOUCH
========================================================= */

/*
 * Tell the browser that certain interactions are
 * intentionally handled by JavaScript.
 */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "fully-loaded"
        );


        /*
         * Remove temporary loading class if
         * the browser supports it.
         */

        document.documentElement.classList.add(
            "js-ready"
        );

    }
);


/* =========================================================
   66. PREVENT DOUBLE SUBMISSIONS
========================================================= */

document.addEventListener(
    "submit",
    event => {

        const form =
            event.target;


        if (
            form.dataset.submitting === "true"
        ) {

            event.preventDefault();

            return;

        }


        /*
         * Only mark forms that have actually
         * passed through the validation stage.
         */

        if (
            form.checkValidity &&
            form.checkValidity()
        ) {

            form.dataset.submitting =
                "true";


            setTimeout(
                () => {

                    form.dataset.submitting =
                        "false";

                },
                2500
            );

        }

    }
);


/* =========================================================
   67. GLOBAL ERROR SAFETY
========================================================= */

window.addEventListener(
    "error",
    event => {

        /*
         * Don't allow one visual effect to
         * break the entire website.
         *
         * We intentionally don't show technical
         * errors to customers.
         */

        console.warn(
            "Mars Tee Studio:",
            event.message
        );

    }
);


/* =========================================================
   68. FINAL BUSINESS EXPERIENCE
========================================================= */
