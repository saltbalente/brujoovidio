// Defensive lazy-load fix: prevents srcset="undefined" and applies sizes when present.
// Runs after DOMContentLoaded and on scroll/resize/orientationchange.

document.addEventListener('DOMContentLoaded', () => {
  const fixLazyImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      const ds = img.dataset || {};

      // If srcset is falsy or literal "undefined", fix or remove it
      const srcsetVal = img.getAttribute('srcset');
      if (!srcsetVal || srcsetVal === 'undefined') {
        if (ds.srcset && ds.srcset.trim() !== '') {
          img.srcset = ds.srcset;
        } else {
          img.removeAttribute('srcset');
        }
      }

      // If data-sizes exists, ensure sizes is set
      if (ds.sizes && ds.sizes.trim() !== '') {
        img.sizes = ds.sizes;
      }
    });
  };

  // Initial pass once DOM is ready
  fixLazyImages();

  // Re-run on typical lazy-load triggers
  ['scroll', 'resize', 'orientationchange'].forEach((evt) => {
    window.addEventListener(evt, fixLazyImages, { passive: true });
  });
});