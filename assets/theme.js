document.addEventListener('scroll', function() {
  const parallaxBackground = document.querySelector('.parallax-background');
  if (parallaxBackground) {
    const scrollPosition = window.pageYOffset;
    parallaxBackground.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
  }
});

(() => {
  // Position lights in 3D sphere
  function positionLights() {
      const lights = document.querySelectorAll('.light');
      const radius = 180;
      
      lights.forEach((light, i) => {
          const phi = Math.acos(-1 + (2 * i) / lights.length);
          const theta = Math.sqrt(lights.length * Math.PI) * phi;
          
          const x = radius * Math.cos(theta) * Math.sin(phi);
          const y = radius * Math.sin(theta) * Math.sin(phi);
          const z = radius * Math.cos(phi);
          
          light.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
      });
  }
  
  // Create floating particles
  function createParticles() {
      const container = document.getElementById('particles');
      if (!container) return;
      const particleCount = window.innerWidth > 768 ? 50 : 25;
      
      for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 6 + 's';
          particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
          
          // Random colors
          const colors = ['#00d4ff', '#ff0080', '#8000ff', '#00ff80'];
          particle.style.background = colors[Math.floor(Math.random() * colors.length)];
          
          container.appendChild(particle);
      }
  }
  
  // Parallax effect
  function handleScroll() {
      const scrollY = window.pageYOffset;
      const sphereContainer = document.getElementById('sphereContainer');
      const content = document.querySelector('.content');

      if (!sphereContainer || !content) return;
      
      // Expand sphere on scroll
      const scale = 1 + (scrollY * 0.002);
      sphereContainer.style.transform = `translate(-50%, -50%) scale(${scale})`;
      
      // Move content with parallax
      content.style.transform = `translateY(${scrollY * 0.5}px)`;
      
      // Adjust opacity
      const opacity = Math.max(0, 1 - (scrollY * 0.003));
      sphereContainer.style.opacity = opacity;
      content.style.opacity = opacity;
  }
  
  // Mouse interaction
  function handleMouseMove(e) {
      const sphereContainer = document.getElementById('sphereContainer');
      if (!sphereContainer) return;
      const rect = sphereContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / window.innerHeight) * 20;
      const rotateY = (mouseX / window.innerWidth) * 20;
      
      const sphere = document.getElementById('sphere');
      if (sphere) {
        sphere.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
  }
  
  // Touch interaction for mobile
  function handleTouchMove(e) {
      e.preventDefault();
      const touch = e.touches[0];
      handleMouseMove(touch);
  }
  
  // Initialize
  document.addEventListener('DOMContentLoaded', function() {
      positionLights();
      createParticles();
      
      // Event listeners
      window.addEventListener('scroll', handleScroll, { passive: true });
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      
      // Light hover effects
      const lights = document.querySelectorAll('.light');
      lights.forEach(light => {
          light.addEventListener('mouseenter', function() {
              this.style.animationPlayState = 'paused';
          });
          
          light.addEventListener('mouseleave', function() {
              this.style.animationPlayState = 'running';
          });
      });
  });
  
  // Resize handler
  window.addEventListener('resize', function() {
      // Recreate particles for mobile optimization
      const container = document.getElementById('particles');
      if (container) {
        container.innerHTML = '';
        createParticles();
      }
  });
})();