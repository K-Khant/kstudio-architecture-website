// Preloader
window.addEventListener("load", () => {
    setTimeout(() => {
        const pre = document.querySelector(".pre-loader");
        if (pre) pre.classList.add("hidden");

        // Animate hero headline after preloader hides
        const headline = document.querySelector(".heading-style-h1");
        if (headline) headline.classList.add("animate-headline");
    }, 1300);
});

// Burger Menu
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.navbar_burger');
    const nav = document.querySelector('.navbar_nav');
    const navLinks = document.querySelectorAll('.navbar_link');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
        });
    });
});

// Smooth scroll for anchor links
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            // If it's just '#', let it behave normally
            if (href === "#") return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    document
        .querySelectorAll(
            ".expertise_list-item"
        )
        .forEach((el) => {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "opacity 0.8s, transform 0.8s";
            observer.observe(el);
        });
});

// Expertise
const items = document.querySelectorAll(".expertise-list-item");
const descriptions = document.querySelectorAll(".expertise-description");
const image = document.getElementById("current-image");

items.forEach((item, index) => {
    // Make keyboard accessible
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    
    // Shared activation function
    const handleActivation = () => {
        const isActive = item.classList.contains("active");

        // Reset all
        items.forEach((i) => i.classList.remove("active"));
        descriptions.forEach((d) => (d.style.maxHeight = null));

        // Activate clicked/selected
        if (!isActive) {
            item.classList.add("active");
            descriptions[index].style.maxHeight =
                descriptions[index].scrollHeight + "px";
            image.src = item.dataset.image;
            image.alt = item.textContent.trim();
        }
    };
    
    // Handle mouse clicks
    item.addEventListener("click", handleActivation);
    
    // Handle keyboard (Enter or Space)
    item.addEventListener("keypress", (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleActivation();
        }
    });
});

// Contact Form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact_form');
    if (!contactForm) return;

    const inputs = contactForm.querySelectorAll('.form_input, .form_textarea');
    
    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.classList.remove('active');
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            subject: contactForm.querySelector('input[placeholder="Subject"]').value,
            message: contactForm.querySelector('textarea').value
        };
        
        // Validate form data
        if (!validateForm(formData)) {
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('.form_submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
            inputs.forEach(input => input.classList.remove('active'));
            
        } catch (error) {
            // Show error message
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
});

// Form validation
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name.trim()) {
        showNotification('Please enter your name.', 'error');
        return false;
    }
    
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!data.subject.trim()) {
        showNotification('Please enter a subject.', 'error');
        return false;
    }
    
    if (!data.message.trim()) {
        showNotification('Please enter your message.', 'error');
        return false;
    }
    
    return true;
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove any existing notification
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.textContent = message;
    
    // Add notification to the page
    const contactSection = document.querySelector('.section_contact');
    contactSection.appendChild(notification);
    
    // Fade in
    setTimeout(() => notification.classList.add('visible'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
