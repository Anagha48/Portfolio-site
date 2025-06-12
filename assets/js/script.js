  window.addEventListener("load", () => {
    const splash = document.getElementById("splash-screen");
    const nameEl = document.getElementById("name");

    // Wrap each character in a span for animation
    const text = nameEl.textContent;
    nameEl.textContent = ''; // Clear original text

    for (let char of text) {
      const span = document.createElement('span');
      span.textContent = char;
      nameEl.appendChild(span);
    }

    const spans = nameEl.querySelectorAll('span');

    // After 2 seconds delay, start fading characters one by one (left to right)
    setTimeout(() => {
      spans.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add('fade-out');
        }, index * 150);  // Faster: 150ms between chars
      });
    }, 1000);

    // Total fade time: 2s delay + (150ms * number_of_chars) + 0.5s fade duration
    const totalFadeTime = 1000 + spans.length * 150 + 500;

    setTimeout(() => {
      splash.classList.add("hide"); // triggers 2s fade of splash

      // Remove splash after 2 seconds fade out
      setTimeout(() => {
        splash.style.display = "none";
      }, 1000);

    }, totalFadeTime);
  });



document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.read-more-link');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      const currentDetails = document.getElementById(targetId);
      const isVisible = currentDetails.classList.contains('visible');

      // Close ALL other details
      document.querySelectorAll('.details').forEach(detail => {
        if (detail !== currentDetails) {
          detail.classList.remove('visible');
          detail.classList.remove('showing'); // Forcefully collapse
          const otherLink = document.querySelector(`.read-more-link[data-target="${detail.id}"]`);
          if (otherLink) otherLink.textContent = 'Read More';
        }
      });

      // Toggle current one
      if (!isVisible) {
        currentDetails.classList.add('showing');
        setTimeout(() => {
          currentDetails.classList.add('visible');
        }, 10);
        this.textContent = 'Read Less';
      } else {
        currentDetails.classList.remove('visible');
        setTimeout(() => {
          currentDetails.classList.remove('showing');
        }, 500); // Wait for animation to finish
        this.textContent = 'Read More';
      }
    });
  });
});





  document.querySelectorAll('.read-more-link').forEach(button => {
    button.addEventListener('click', function () {
        // Remove 'active' class from all buttons
        document.querySelectorAll('.read-more-link').forEach(btn => btn.classList.remove('active'));
        
        // Add 'active' class to the clicked button
        this.classList.add('active');

        // Animate all country items
        const items = document.querySelectorAll('.details');
        items.forEach((item, index) => {
            // Remove any existing animation class
            item.classList.remove('animate-up');

            // Trigger reflow to restart animation
            void item.offsetWidth;

            // Add the animation class
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('animate-up');
        });
    });
});




document.addEventListener('DOMContentLoaded', function() {
    // Get all collapse sections
    const collapseSections = document.querySelectorAll('.collapse-section');
    let currentlyOpen = null;
    
    collapseSections.forEach(section => {
        const sectionTitle = section.querySelector('.section-title');
        const collapseContent = section.querySelector('.collapse');
        const arrowIcon = section.querySelector('.arrow-icon img');
        
        // Initialize Bootstrap Collapse
        const bsCollapse = new bootstrap.Collapse(collapseContent, {
            toggle: false
        });
        
        sectionTitle.addEventListener('click', function(e) {
            // Prevent default if this is not a Bootstrap toggle (we'll handle it)
            if (!e.target.hasAttribute('data-bs-toggle')) {
                e.preventDefault();
            }
            
            const isExpanding = !collapseContent.classList.contains('show');

            
            // Close currently open section if opening a new one
            if (isExpanding && currentlyOpen && currentlyOpen !== bsCollapse) {
                const prevContent = currentlyOpen._element;
                prevContent.classList.remove('show-animate');
                currentlyOpen.hide();
                
                // Reset arrow of previously open section
                const prevArrow = currentlyOpen._element.closest('.collapse-section')
                    .querySelector('.arrow-icon img');
                prevArrow.style.transform = 'rotate(0deg)';
            }
            
            // Toggle current section
            bsCollapse.toggle();
            
            // Update currently open reference
            currentlyOpen = isExpanding ? bsCollapse : null;
            
            // Add class for animations if expanding
            if (isExpanding) {
                collapseContent.classList.add('show-animate');
            } else {
                collapseContent.classList.remove('show-animate');
            }
        });
        
        // Handle shown event for animations
        collapseContent.addEventListener('shown.bs.collapse', function() {
            const items = this.querySelectorAll('.skill-item .items, .education-item, .achievement-item');
            
            items.forEach((item, index) => {
                // Reset animation
                item.style.animation = 'none';
                item.style.opacity = '0';
                void item.offsetWidth; // Trigger reflow
                
                // Apply animation with delay
                item.style.animation = '';
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('animate-up');
            });
        });

        // Handle hidden event to reset animations
        collapseContent.addEventListener('hidden.bs.collapse', function() {
            const items = this.querySelectorAll('.skill-item .items, .education-item, .achievement-item');
            items.forEach(item => {
                item.classList.remove('animate-up');
                item.style.animation = 'none';
                item.style.opacity = '0';
            });
        });
    });

    // Read-more links functionality (existing)
    const readMoreLinks = document.querySelectorAll('.read-more-link');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement.style.display === 'none') {
                targetElement.style.display = 'block';
                targetElement.classList.remove('animate-up');
                void targetElement.offsetWidth;
                targetElement.style.opacity = '1';
                targetElement.classList.add('animate-up');
                this.textContent = 'Read Less';
            } else {
                targetElement.style.opacity = '0';
                setTimeout(() => {
                    targetElement.style.display = 'none';
                    this.textContent = 'Read More';
                }, 500);
            }
        });
    });
});


// bubble mouse move//
const ball = document.getElementById('ball');
document.addEventListener('mousemove', (e) => {
  const offsetX = -10; // half of width
  const offsetY = -10; // half of height
  ball.style.transform = `translate(${e.clientX + offsetX}px, ${e.clientY + offsetY}px)`;
});




  document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate only once
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });
  });



