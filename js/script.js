// ============================================================
// MAIN SCRIPT FOR PORTFOLIO WEBSITE
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // ============================================================
    // GLOBAL VARIABLES & CONSTANTS
    // ============================================================
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const form = document.getElementById('contactForm');
    const backToTopBtn = document.getElementById('backToTop');

    const currentYearSpan = document.getElementById('currentYear');
    
    // Typing animation variables
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    const textArray = [
        'Mahasiswa Teknologi Informasi di Universitas Tidar',
        'Web Developer',
        'UI/UX Enthusiast',
        'Frontend Developer',
        'Problem Solver'
    ];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 1500; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;
    let isTyping = true;
    
    // ============================================================
    // DARK/LIGHT MODE TOGGLE
    // ============================================================
    function initTheme() {
        // Check localStorage for theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);
        
        // Update toggle button icon
        updateThemeIcon(savedTheme);
    }
    
    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Set new theme
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update toggle button icon
        updateThemeIcon(newTheme);
        
        // Add transition effect
        body.classList.add('theme-transition');
        setTimeout(() => {
            body.classList.remove('theme-transition');
        }, 300);
    }
    
    function updateThemeIcon(theme) {
        const moonIcon = themeToggle.querySelector('.fa-moon');
        const sunIcon = themeToggle.querySelector('.fa-sun');
        
        if (theme === 'dark') {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        } else {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        }
    }
    
    // ============================================================
    // TYPING ANIMATION
    // ============================================================
    function type() {
        if (charIndex < textArray[textArrayIndex].length && isTyping) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            // Finished typing, start erasing after delay
            isTyping = false;
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0 && !isTyping) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            // Finished erasing, move to next text
            isTyping = true;
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, typingDelay + 500);
        }
    }
    
    // ============================================================
    // NAVBAR FUNCTIONS
    // ============================================================
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    }
    
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = 'auto';
    }
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        // Get all sections
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    function shrinkNavbarOnScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    }
    
    // ============================================================
    // SMOOTH SCROLLING
    // ============================================================
    function smoothScroll(target) {
        const targetElement = document.querySelector(target);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
    
    // ============================================================
    // SKILL PROGRESS BARS ANIMATION
    // ============================================================
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = '0%';
            
            // Animate progress bar
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 300);
        });
    }
    
    function checkProgressBarsVisibility() {
        const skillsSection = document.getElementById('skills');
        const sectionTop = skillsSection.offsetTop;
        const sectionHeight = skillsSection.clientHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        // If skills section is in viewport
        if (scrollPosition > sectionTop + 100) {
            animateProgressBars();
            // Remove event listener after animation has been triggered
            window.removeEventListener('scroll', checkProgressBarsVisibility);
        }
    }
    
    // ============================================================
    // CONTACT FORM VALIDATION & SUBMISSION
    // ============================================================
    function validateForm(e) {
        e.preventDefault();
        
        // Get form elements
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const formMessage = document.getElementById('formMessage');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        
        let isValid = true;
        let errorMessage = '';
        
        // Reset previous errors
        name.classList.remove('error');
        email.classList.remove('error');
        subject.classList.remove('error');
        message.classList.remove('error');
        formMessage.className = 'form-message';
        
        // Validate name
        if (!name.value.trim()) {
            name.classList.add('error');
            isValid = false;
            errorMessage = 'Nama lengkap wajib diisi';
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            email.classList.add('error');
            isValid = false;
            errorMessage = 'Email wajib diisi';
        } else if (!emailRegex.test(email.value)) {
            email.classList.add('error');
            isValid = false;
            errorMessage = 'Format email tidak valid';
        }
        
        // Validate subject
        if (!subject.value.trim()) {
            subject.classList.add('error');
            isValid = false;
            errorMessage = 'Subject wajib diisi';
        }

        // Validate message
        if (!message.value.trim()) {
            message.classList.add('error');
            isValid = false;
            errorMessage = 'Pesan wajib diisi';
        } else if (message.value.trim().length < 10) {
            message.classList.add('error');
            isValid = false;
            errorMessage = 'Pesan minimal 10 karakter';
        }
        
        if (!isValid) {
            formMessage.textContent = errorMessage;
            formMessage.className = 'form-message error';
            return false;
        }
        
        // Simulate form submission with EmailJS
        btnText.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // EmailJS configuration
        const serviceID = 'service_nopalsatoru1234'; // Your EmailJS service ID
        const templateID = 'template_tr82kq1'; // Your EmailJS template ID
        
        // Prepare email parameters
        const emailParams = {
            from_name: name.value,
            from_email: email.value,
            subject: subject.value,
            message: message.value,
            to_email: 'anggernaufal503@gmail.com' // Your email address
        };
        
        // Send email using EmailJS
        emailjs.send(serviceID, templateID, emailParams)
            .then(function(response) {
                console.log('Email sent successfully!', response);
                
                // Show success message
                formMessage.textContent = 'Pesan Anda telah berhasil dikirim! Saya akan membalas secepatnya.';
                formMessage.className = 'form-message success';
                
                // Reset form
                form.reset();
                
                // Reset button
                btnText.textContent = 'Send Message';
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            })
            .catch(function(error) {
                console.error('Email sending failed:', error);
                
                // Show error message
                formMessage.textContent = 'Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi atau hubungi langsung via email.';
                formMessage.className = 'form-message error';
                
                // Reset button
                btnText.textContent = 'Send Message';
                submitBtn.disabled = false;
            });
        
        return false; // Prevent actual form submission
    }
    
    // ============================================================
    // SCROLL REVEAL ANIMATION
    // ============================================================
    function scrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // ============================================================
    // INITIALIZATION FUNCTION
    // ============================================================
    function init() {
        // Initialize EmailJS
        emailjs.init('XtbwIMGE1a32XAQpk'); // Your EmailJS public key
        
        // Initialize theme
        initTheme();
        
        // Start typing animation
        setTimeout(type, 1000);
        
        // Set current year in footer
        currentYearSpan.textContent = new Date().getFullYear();
        
        // Add scroll event listeners
        window.addEventListener('scroll', updateActiveNavLink);
        window.addEventListener('scroll', shrinkNavbarOnScroll);
        window.addEventListener('scroll', checkProgressBarsVisibility);
        window.addEventListener('scroll', scrollReveal);
        
        // Initial checks
        updateActiveNavLink();
        shrinkNavbarOnScroll();
        scrollReveal();
        
        // Add reveal class to elements that should animate on scroll
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (section.id !== 'home') {
                section.classList.add('reveal');
            }
        });
        
        // Add reveal class to about highlights
        const highlights = document.querySelectorAll('.highlight');
        highlights.forEach(highlight => {
            highlight.classList.add('reveal');
        });
        
        // Add reveal class to skill cards
        const skillCards = document.querySelectorAll('.skill-card, .soft-skill');
        skillCards.forEach(card => {
            card.classList.add('reveal');
        });
        
        // Add reveal class to timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.classList.add('reveal');
        });
    }
    
    // ============================================================
    // EVENT LISTENERS
    // ============================================================
    themeToggle.addEventListener('click', toggleTheme);
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');
            
            // Close mobile menu
            closeMobileMenu();
            
            // Smooth scroll to target
            if (target.startsWith('#')) {
                e.preventDefault();
                smoothScroll(target);
            }
        });
    });
    
    // Contact form submission
    if (form) {
        form.addEventListener('submit', validateForm);
    }
    
    // Back to top button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScroll('#home');
        });
    }
    
    // Ripple effect for buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
            const btn = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
            const ripple = document.createElement('div');
            ripple.classList.add('btn-ripple');
            
            // Get click position relative to button
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Set ripple position and size
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            // Add ripple to button
            btn.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
    
    // Input focus effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // ============================================================
    // INITIALIZE EVERYTHING
    // ============================================================
    init();
});