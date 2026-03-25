// Custom Cursor Interaction
const cursorDot = document.querySelector('.cursor-dot');
const cursorGlow = document.querySelector('.cursor-glow');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  // Faster dot movement
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // Slower glow movement for lag effect
  cursorGlow.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

// Hover effects for clickable elements
const interactionElements = document.querySelectorAll('a, button, .glass-card');

interactionElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursorGlow.style.width = '60px';
    cursorGlow.style.height = '60px';
    cursorGlow.style.borderColor = 'var(--accent-secondary)';
    cursorGlow.style.background = 'rgba(139, 92, 246, 0.2)';
  });
  
  el.addEventListener('mouseleave', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorGlow.style.width = '40px';
    cursorGlow.style.height = '40px';
    cursorGlow.style.borderColor = 'var(--accent-glow)';
    cursorGlow.style.background = 'rgba(99, 102, 241, 0.1)';
  });
});

// Scroll Animations (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Sticky Nav styling on scroll
const nav = document.querySelector('.glass-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Showcase Filtering Setup
const filterBtns = document.querySelectorAll('.filter-btn');
const showcaseItems = document.querySelectorAll('.showcase-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filterValue = btn.getAttribute('data-filter');
    
    showcaseItems.forEach(item => {
      // Start fast fade out
      item.style.opacity = '0';
      item.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'flex';
          // Slight delay to allow display flex to apply before transitioning opacity
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1) translateY(0)';
          }, 20);
        } else {
          item.style.display = 'none';
        }
      }, 150); // 150ms fast transition time
    });
  });
});

// Role Toggle Logic
const roleToggle = document.getElementById('roleToggle');
const webDevView = document.getElementById('web-dev-view');
const videoEditorView = document.getElementById('video-editor-view');

if (roleToggle) {
  roleToggle.addEventListener('change', () => {
    if (roleToggle.checked) {
      // Show Video Editor
      webDevView.classList.remove('active-view');
      videoEditorView.classList.add('active-view');
    } else {
      // Show Web Dev
      videoEditorView.classList.remove('active-view');
      webDevView.classList.add('active-view');
    }
    
    // Re-observe elements in the new active view so scroll animations trigger
    setTimeout(() => {
      const activeHiddenElements = document.querySelectorAll('.active-view .hidden');
      activeHiddenElements.forEach(el => {
        el.classList.remove('show');
        observer.observe(el);
      });
    }, 50);
  });
}


