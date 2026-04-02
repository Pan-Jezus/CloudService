// js/utils/dataParser.js

// Функция создает карточку проекта из данных API
export const createProjectCard = (project, isOptimistic = false) => {
  const card = document.createElement('div');
  
  // Если это оптимистичное обновление, добавляем спец. класс для прозрачности
  card.className = `project-card ${isOptimistic ? 'optimistic' : ''}`;
  card.dataset.id = project.id; // Уникальный ID от сервера
  
  // Формируем внутренний HTML
  card.innerHTML = `
    <h3>${project.title}</h3>
    <p style="font-size: 0.8rem; color: #666; margin-top: 10px;">
      Статус: ${isOptimistic ? 'Синхронизация с сервером...' : 'Сохранено в облаке'}
    </p>
  `;
  
  return card;
};