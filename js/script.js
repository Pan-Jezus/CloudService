// js/script.js
import { initStats } from './components/stats.js';
import { initPricingToggle } from './components/pricing.js';
import { initForm } from './components/form.js';

// Запускаем скрипты только после полной загрузки HTML (DOM)
document.addEventListener('DOMContentLoaded', () => {
  initStats();
  initPricingToggle();
  initForm();
});