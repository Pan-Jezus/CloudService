// js/components/stats.js

export const initStats = () => {
  const statNumbers = document.querySelectorAll('.stat-card__number');
  if (statNumbers.length === 0) return;

  const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateValue(entry.target, 0, target, 2000); // 2000ms = 2 секунды анимации
        observer.unobserve(entry.target); // Анимируем только 1 раз
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));
};