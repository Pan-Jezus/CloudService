// js/components/form.js
import { validateEmail, showError, clearErrors } from '../utils/helpers.js';

export const initForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Останавливаем перезагрузку страницы
    clearErrors(form);

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    let isValid = true;

    if (nameInput.value.trim() === '') {
      showError(nameInput, 'Пожалуйста, введите ваше имя');
      isValid = false;
    }

    if (emailInput.value.trim() === '') {
      showError(emailInput, 'Пожалуйста, введите ваш Email');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Введите корректный Email');
      isValid = false;
    }

    if (messageInput.value.trim() === '') {
      showError(messageInput, 'Пожалуйста, введите текст сообщения');
      isValid = false;
    }

    // Если всё верно, сохраняем и отправляем
    if (isValid) {
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        date: new Date().toISOString()
      };
      
      console.log('Отправленные данные формы:', formData);
      
      // Сохраняем в LocalStorage
      localStorage.setItem('lastContactRequest', JSON.stringify(formData));

      alert('Спасибо! Ваша заявка успешно отправлена.');
      form.reset(); // Очищаем форму
    }
  });
};