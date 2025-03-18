document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const openMenu = document.getElementById('openMenu');
  const closeMenu = document.getElementById('closeMenu');
  const navLinks = document.querySelector('.nav-links');
  
  if (openMenu && closeMenu && navLinks) {
    openMenu.addEventListener('click', function() {
      navLinks.classList.add('active');
    });
    
    closeMenu.addEventListener('click', function() {
      navLinks.classList.remove('active');
    });
  }
  
  // Page Navigation
  const pageLinks = document.querySelectorAll('[data-page]');
  const pages = document.querySelectorAll('.page');
  
  pageLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetPage = this.getAttribute('data-page');
      
      // Hide all pages
      pages.forEach(page => {
        page.classList.remove('active');
      });
      
      // Show target page
      const targetElement = document.getElementById(`${targetPage}-page`);
      if (targetElement) {
        targetElement.classList.add('active');
        window.scrollTo(0, 0);
      }
    });
  });
  
  // Tab Navigation
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabContainer = this.closest('.tabs-header').parentElement;
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all tabs and content
      tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      tabContainer.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Add active class to clicked tab and corresponding content
      this.classList.add('active');
      const targetContent = tabContainer.querySelector(`#${targetTab}-tab`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
  
  // Switch between login and register tabs
  const switchTabLinks = document.querySelectorAll('.switch-tab');
  
  switchTabLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetTab = this.getAttribute('data-tab');
      const tabContainer = document.querySelector('.auth-tabs');
      
      // Remove active class from all tabs and content
      tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      tabContainer.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Add active class to target tab and content
      const targetTabBtn = tabContainer.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
      if (targetTabBtn) {
        targetTabBtn.classList.add('active');
      }
      
      const targetContent = tabContainer.querySelector(`#${targetTab}-tab`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
  
  // Login and Signup buttons
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      // Hide all pages
      pages.forEach(page => {
        page.classList.remove('active');
      });
      
      // Show auth page with login tab active
      const authPage = document.getElementById('auth-page');
      if (authPage) {
        authPage.classList.add('active');
        
        // Set login tab as active
        const authTabs = authPage.querySelector('.auth-tabs');
        authTabs.querySelectorAll('.tab-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        
        authTabs.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        
        const loginTabBtn = authTabs.querySelector('.tab-btn[data-tab="login"]');
        if (loginTabBtn) {
          loginTabBtn.classList.add('active');
        }
        
        const loginContent = authTabs.querySelector('#login-tab');
        if (loginContent) {
          loginContent.classList.add('active');
        }
        
        window.scrollTo(0, 0);
      }
    });
  }
  
  if (signupBtn) {
    signupBtn.addEventListener('click', function() {
      // Hide all pages
      pages.forEach(page => {
        page.classList.remove('active');
      });
      
      // Show auth page with register tab active
      const authPage = document.getElementById('auth-page');
      if (authPage) {
        authPage.classList.add('active');
        
        // Set register tab as active
        const authTabs = authPage.querySelector('.auth-tabs');
        authTabs.querySelectorAll('.tab-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        
        authTabs.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        
        const registerTabBtn = authTabs.querySelector('.tab-btn[data-tab="register"]');
        if (registerTabBtn) {
          registerTabBtn.classList.add('active');
        }
        
        const registerContent = authTabs.querySelector('#register-tab');
        if (registerContent) {
          registerContent.classList.add('active');
        }
        
        window.scrollTo(0, 0);
      }
    });
  }
  
  // Login Form Submission
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      // Simple validation
      if (!email || !password) {
        showError(loginError, 'Please fill in all fields');
        return;
      }
      
      // Simulate API call
      simulateLoading(this.querySelector('button[type="submit"]'), 'Logging in...');
      
      setTimeout(() => {
        // Simulate successful login
        // In a real app, you would make an API call to your backend
        if (email === 'demo@example.com' && password === 'password') {
          // Redirect to home page
          pages.forEach(page => {
            page.classList.remove('active');
          });
          
          const homePage = document.getElementById('home-page');
          if (homePage) {
            homePage.classList.add('active');
            window.scrollTo(0, 0);
          }
          
          showToast('Login successful! Welcome back.');
        } else {
          showError(loginError, 'Invalid email or password');
        }
        
        resetButton(loginForm.querySelector('button[type="submit"]'), 'Login');
      }, 1500);
    });
  }
  
  // Register Form Submission
  const registerForm = document.getElementById('register-form');
  const registerError = document.getElementById('register-error');
  
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const terms = document.getElementById('terms').checked;
      
      // Simple validation
      if (!email || !password || !confirmPassword) {
        showError(registerError, 'Please fill in all fields');
        return;
      }
      
      if (password !== confirmPassword) {
        showError(registerError, 'Passwords do not match');
        return;
      }
      
      if (!terms) {
        showError(registerError, 'Please agree to the Terms of Service and Privacy Policy');
        return;
      }
      
      // Simulate API call
      simulateLoading(this.querySelector('button[type="submit"]'), 'Creating account...');
      
      setTimeout(() => {
        // Simulate successful registration
        // In a real app, you would make an API call to your backend
        
        // Switch to login tab
        const authTabs = document.querySelector('.auth-tabs');
        authTabs.querySelectorAll('.tab-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        
        authTabs.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        
        const loginTabBtn = authTabs.querySelector('.tab-btn[data-tab="login"]');
        if (loginTabBtn) {
          loginTabBtn.classList.add('active');
        }
        
        const loginContent = authTabs.querySelector('#login-tab');
        if (loginContent) {
          loginContent.classList.add('active');
        }
        
        showToast('Account created successfully! Please log in.');
        resetButton(registerForm.querySelector('button[type="submit"]'), 'Create Account');
        registerForm.reset();
      }, 1500);
    });
  }
  
  // Post Job Form
  const postJobForm = document.getElementById('post-job-form');
  const postJobError = document.querySelector('.post-job-error');
  const addSkillBtn = document.getElementById('add-skill-btn');
  const skillInput = document.getElementById('skill-input');
  const skillsList = document.getElementById('skills-list');
  let skills = [];
  
  if (addSkillBtn && skillInput && skillsList) {
    addSkillBtn.addEventListener('click', function() {
      const skill = skillInput.value.trim();
      
      if (skill && !skills.includes(skill)) {
        skills.push(skill);
        renderSkills();
        skillInput.value = '';
      }
    });
  }
  
  function renderSkills() {
    if (!skillsList) return;
    
    skillsList.innerHTML = '';
    
    if (skills.length > 0) {
      skillsList.style.display = 'flex';
      skillsList.classList.add('skills-list');
      skillsList.style.marginTop = '1rem';
      
      skills.forEach((skill, index) => {
        const skillTag = document.createElement('div');
        skillTag.classList.add('skill-tag');
        skillTag.style.position = 'relative';
        skillTag.style.paddingRight = '2rem';
        
        const skillText = document.createElement('span');
        skillText.textContent = skill;
        
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.innerHTML = '<i class="fas fa-times"></i>';
        removeBtn.style.position = 'absolute';
        removeBtn.style.right = '0.5rem';
        removeBtn.style.top = '50%';
        removeBtn.style.transform = 'translateY(-50%)';
        removeBtn.style.background = 'none';
        removeBtn.style.border = 'none';
        removeBtn.style.cursor = 'pointer';
        removeBtn.style.color = 'inherit';
        
        removeBtn.addEventListener('click', function() {
          skills = skills.filter((_, i) => i !== index);
          renderSkills();
        });
        
        skillTag.appendChild(skillText);
        skillTag.appendChild(removeBtn);
        
        skillsList.appendChild(skillTag);
      });
    } else {
      skillsList.style.display = 'none';
    }
  }
  
  if (postJobForm) {
    postJobForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const title = document.getElementById('job-title').value;
      const description = document.getElementById('job-description').value;
      const type = document.getElementById('job-type').value;
      const budget = document.getElementById('job-budget').value;
      
      // Simple validation
      if (!title || !description || !type || !budget) {
        showError(postJobError, 'Please fill in all required fields');
        return;
      }
      
      if (skills.length === 0) {
        showError(postJobError, 'Please add at least one skill');
        return;
      }
      
      // Simulate API call
      simulateLoading(this.querySelector('button[type="submit"]'), 'Posting job...');
      
      setTimeout(() => {
        // Simulate successful job posting
        // In a real app, you would make an API call to your backend
        
        // Redirect to jobs page
        pages.forEach(page => {
          page.classList.remove('active');
        });
        
        const jobsPage = document.getElementById('jobs-page');
        if (jobsPage) {
          jobsPage.classList.add('active');
          window.scrollTo(0, 0);
        }
        
        showToast('Job posted successfully!');
        resetButton(postJobForm.querySelector('button[type="submit"]'), 'Post Job');
        postJobForm.reset();
        skills = [];
        renderSkills();
      }, 1500);
    });
  }
  
  // Helper Functions
  function showError(element, message) {
    if (!element) return;
    
    element.style.display = 'flex';
    element.querySelector('p').textContent = message;
    
    setTimeout(() => {
      element.style.display = 'none';
    }, 5000);
  }
  
  function simulateLoading(button, loadingText) {
    if (!button) return;
    
    const originalText = button.textContent;
    button.textContent = loadingText;
    button.disabled = true;
  }
  
  function resetButton(button, text) {
    if (!button) return;
    
    button.textContent = text;
    button.disabled = false;
  }
  
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.querySelector('.toast-message').textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
  
  // Add hover animations to cards
  const cards = document.querySelectorAll('.category-card, .freelancer-card, .job-card, .portfolio-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
  
  // Add 3D tilt effect to cards
  const tiltCards = document.querySelectorAll('.freelancer-card, .portfolio-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const cardRect = this.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;
      
      const rotateX = (mouseY / (cardRect.height / 2)) * -5;
      const rotateY = (mouseX / (cardRect.width / 2)) * 5;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.transition = 'transform 0.5s ease';
    });
  });
  
  // Add floating animation to hero buttons
  const heroButtons = document.querySelectorAll('.hero-buttons .btn');
  
  heroButtons.forEach((button, index) => {
    button.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
  });
  
  // Add keyframe animation for floating effect
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes float {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
  
  // Add particle background to hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    const particles = document.createElement('div');
    particles.classList.add('particles');
    hero.appendChild(particles);
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = Math.random() * 10 + 5;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 10;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      
      particles.appendChild(particle);
    }
    
    // Add particle styles
    const particleStyle = document.createElement('style');
    particleStyle.innerHTML = `
      .particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
      }
      
      .particle {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        animation: particleFloat linear infinite;
      }
      
      @keyframes particleFloat {
        0% {
          transform: translateY(0) rotate(0);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(particleStyle);
    
    // Make hero content appear above particles
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.position = 'relative';
      heroContent.style.zIndex = '1';
    }
  }
});
