// js/utils/helpers.js

// Проверка правильности написания email
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Функция показа ошибки под полем ввода
export const showError = (element, message) => {
  element.classList.add('error');
  const errorElement = document.createElement('span');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  element.parentNode.appendChild(errorElement);
};

// Очистка старых ошибок перед новой проверкой
export const clearErrors = (form) => {
  const errorMessages = form.querySelectorAll('.error-message');
  errorMessages.forEach(msg => msg.remove());
  
  const errorInputs = form.querySelectorAll('.error');
  errorInputs.forEach(input => input.classList.remove('error'));
};