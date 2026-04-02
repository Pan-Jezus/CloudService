// js/script.js

// 1. Импорты старых компонентов (Лаба 5)
import { initStats } from './components/stats.js';
import { initPricingToggle } from './components/pricing.js';
import { initForm } from './components/form.js';

// 2. Импорты новых компонентов (Лаба 6)
import ApiService from './api/apiService.js';
import LocalStorageService from './storage/localStorage.js';
import { API_CONFIG } from './api/config.js';
import { createProjectCard } from './utils/dataParser.js';

class CloudServiceApp {
  constructor() {
    this.api = new ApiService(API_CONFIG.baseUrl);
    this.storage = new LocalStorageService();
    
    // Пытаемся достать кэш из LocalStorage, если он там есть
    this.projects = this.storage.get('cloud_projects', []); 
    
    this.container = document.getElementById('projects-container');
    this.form = document.getElementById('add-project-form');
    this.errorToast = document.getElementById('sync-error');
  }

  async init() {
    this.renderProjects(); // Сразу рисуем то, что есть в кэше
    this.setupEventListeners();
    await this.fetchInitialData(); // Затем идем на сервер за свежими данными
  }

  setupEventListeners() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleAddProject(e));
    }
  }

  // Получение данных с сервера (GET)
  async fetchInitialData() {
    try {
      // Запрашиваем 3 поста для примера
      const data = await this.api.get(`${API_CONFIG.endpoints.projects}?_limit=3`);
      
      // Преобразуем данные под наш формат
      this.projects = data.map(item => ({ id: item.id, title: item.title }));
      
      // Обновляем кэш
      this.storage.set('cloud_projects', this.projects);
      this.renderProjects();
      console.log('Данные успешно синхронизированы с сервером');
    } catch (error) {
      console.warn('Работа в офлайн режиме. Используются локальные данные.');
    }
  }

  // ОПТИМИСТИЧНОЕ ОБНОВЛЕНИЕ И ОБРАБОТКА КОНФЛИКТОВ (Вариант 14)
  async handleAddProject(e) {
    e.preventDefault();
    const titleInput = document.getElementById('project-title');
    const newTitle = titleInput.value.trim();
    if (!newTitle) return;

    this.errorToast.style.display = 'none';

    // 1. ОПТИМИСТИЧНЫЙ UI: Создаем временную карточку
    const tempId = 'temp_' + Date.now();
    const tempProject = { id: tempId, title: newTitle };
    
    // 2. Мгновенно отображаем на экране (до ответа сервера)
    const card = createProjectCard(tempProject, true);
    this.container.prepend(card); // Добавляем в начало списка
    titleInput.value = ''; // Очищаем поле ввода
    titleInput.disabled = true; // Блокируем поле от спама

    try {
      // 3. Отправляем реальный POST запрос на сервер
      const savedProject = await this.api.post(API_CONFIG.endpoints.projects, { 
        title: newTitle,
        userId: 1 
      });
      
      // 4. УСПЕХ: Обновляем статус карточки
      card.classList.remove('optimistic');
      card.querySelector('p').textContent = 'Статус: Сохранено в облаке';
      card.dataset.id = savedProject.id;
      
      // Сохраняем в локальный кэш
      this.projects.unshift({ id: savedProject.id, title: newTitle });
      this.storage.set('cloud_projects', this.projects);

    } catch (error) {
      // 5. ОБРАБОТКА КОНФЛИКТОВ (Сбой сети)
      card.remove(); // Откатываем интерфейс назад (удаляем карточку)
      this.showError('Ошибка синхронизации! Сервер недоступен. Проверьте подключение к интернету.');
      titleInput.value = newTitle; // Возвращаем текст, чтобы пользователь не печатал заново
    } finally {
      titleInput.disabled = false; // Разблокируем поле
      titleInput.focus();
    }
  }

  renderProjects() {
    if (!this.container) return;
    this.container.innerHTML = '';
    this.projects.forEach(project => {
      this.container.appendChild(createProjectCard(project, false));
    });
  }

  showError(message) {
    this.errorToast.textContent = message;
    this.errorToast.style.display = 'block';
  }
}

// Запуск всего приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  // Запускаем скрипты из 5 лабы
  initStats();
  initPricingToggle();
  initForm();
  
  // Запускаем логику 6 лабы
  const app = new CloudServiceApp();
  app.init();
});