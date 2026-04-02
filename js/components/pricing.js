// js/components/pricing.js

export const initPricingToggle = () => {
  const toggle = document.getElementById('pricing-toggle');
  const priceValue = document.getElementById('price-value');
  const pricePeriod = document.getElementById('price-period');
  const labelMonth = document.getElementById('label-month');
  const labelYear = document.getElementById('label-year');

  if (!toggle || !priceValue) return;

  toggle.addEventListener('change', (e) => {
    if (e.target.checked) {
      // Выбран "Год" (со скидкой 20%)
      priceValue.textContent = '28700'; 
      pricePeriod.textContent = '/ год';
      labelYear.classList.add('active');
      labelMonth.classList.remove('active');
    } else {
      // Выбран "Месяц"
      priceValue.textContent = '2990';
      pricePeriod.textContent = '/ месяц';
      labelMonth.classList.add('active');
      labelYear.classList.remove('active');
    }
  });
};