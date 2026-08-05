function goToProjects() {
    document.getElementById("projects").scrollIntoView({
        behavior: "smooth"
    });
}

// Automatically select service

const params = new URLSearchParams(window.location.search);

const selectedService = params.get("service");

if(selectedService){
    const service = document.getElementById("service");
    if(service){
        service.value = selectedService;
    }
}

const quoteForm = document.getElementById("quoteForm");

if(quoteForm){

    quoteForm.addEventListener("submit", function(event){

        event.preventDefault();

        // your quote form code

    });

}

const themeToggle = document.getElementById("theme-toggle");

if(themeToggle){

    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark-mode");
        themeToggle.checked = true;
    }

    themeToggle.addEventListener("change", function(){

        document.body.classList.toggle("dark-mode");

        if(document.body.classList.contains("dark-mode")){
            localStorage.setItem("theme","dark");
        }else{
            localStorage.setItem("theme","light");
        }

    });

}

/* Scroll Animation */

const hiddenElements = document.querySelectorAll("section, .card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

});

hiddenElements.forEach((el) => {

    el.classList.add("hidden");
    observer.observe(el);

});

/* =========================
   BACK TO TOP BUTTON
========================= */

const backToTop = document.getElementById("backToTop");

if(backToTop){

    window.addEventListener("scroll", function(){

        if(window.scrollY > 300){
            backToTop.style.display = "block";
        }else{
            backToTop.style.display = "none";
        }

    });

    backToTop.addEventListener("click", function(){

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}

/* =========================
   TYPING ANIMATION
========================= */

const typing = document.getElementById("typing");

if(typing){

    const words = [
        "Web Developer",
        "Graphic Designer",
        "Photo Editor",
        "Photoshop Expert",
        "Freelancer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type(){

        const currentWord = words[wordIndex];

        if(!deleting){
            typing.textContent = currentWord.substring(0, charIndex++);
        }else{
            typing.textContent = currentWord.substring(0, charIndex--);
        }

        let speed = deleting ? 25 : 50;

if (!deleting && charIndex > currentWord.length) {
    deleting = true;
    speed = 800;
}

if (deleting && charIndex < 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 100;
}
        setTimeout(type, speed);
    }

    type();
}

/* =========================
   EMAILJS CONTACT FORM
========================= */

emailjs.init("aUIqFhKJXEPEKGVKd");

const contactForm = document.getElementById("contact-form");

if(contactForm){

    contactForm.addEventListener("submit", function(e){

        e.preventDefault();

        emailjs.sendForm(
            "service_15ay3dd",
            "template_91i42c8",
            this
        ).then(function(){

            document.getElementById("status").textContent =
            "✅ Your message has been sent successfully!";

            contactForm.reset();

        }).catch(function(error){

            document.getElementById("status").textContent =
            "❌ Failed to send message.";

            console.log(error);

        });

    });

}