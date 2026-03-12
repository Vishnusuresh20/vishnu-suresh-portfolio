// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Close mobile menu when a link is clicked
links.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

// Sticky Header & Active Link Highlighting
const header = document.querySelector(".header");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    // Sticky Header
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    // Active Link Highlighting
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute("id");
        }
    });

    links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// Scroll Reveal Animations
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Initial check for elements in view on load
window.addEventListener("load", reveal);
// Check elements on scroll
window.addEventListener("scroll", reveal);

// Web3Forms Contact Form Submission
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
        
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Success state
                submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fa-solid fa-check"></i>';
                submitBtn.style.background = '#27c93f';
                contactForm.reset();
            } else {
                // Error state
                submitBtn.innerHTML = '<span>Error Sending</span> <i class="fa-solid fa-xmark"></i>';
                submitBtn.style.background = '#ff5f56';
                console.error('Web3Forms Error:', data);
            }
        } catch (error) {
            submitBtn.innerHTML = '<span>Error Sending</span> <i class="fa-solid fa-xmark"></i>';
            submitBtn.style.background = '#ff5f56';
            console.error('Fetch Error:', error);
        }
        
        // Restore button after 4 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 4000);
    });
}
