/*
 * Client-side logic for the OTO portfolio site.
 * Handles scroll-triggered animations and dynamic QR code generation.
 */

// When the DOM loads, set up the intersection observer and draw the QR code.
document.addEventListener('DOMContentLoaded', () => {
  // Animate elements with the 'fade-in' class when they enter the viewport.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
  });
  document.querySelectorAll('.fade-in').forEach((el) => {
    observer.observe(el);
  });

  // Insert current year into the footer.
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // Draw the QR code onto the canvas using QRCode.js.
  const canvas = document.getElementById('qr-canvas');
  if (canvas && typeof QRCode !== 'undefined') {
    // URL for the GitHub Pages version of this site. Update if you change the repo name.
    const url = 'https://keem-tt.github.io/mechatronics-engineering-portfolio/';
    QRCode.toCanvas(canvas, url, { width: 120, margin: 1, color: { dark: '#000000', light: '#ffffff' } }, (err) => {
      if (err) {
        console.error('Error generating QR code:', err);
      }
    });
  }
});