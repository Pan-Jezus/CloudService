// js/api/config.js

// Конфигурация для нашего "Custom REST API" (используем тестовый JSONPlaceholder)
export const API_CONFIG = {
  // В реальном проекте мы бы писали: baseUrl: process.env.API_BASE_URL
  baseUrl: 'https://jsonplaceholder.typicode.com',
  endpoints: {
    projects: '/posts', // Будем использовать "посты" как "проекты" нашей SaaS платформы
  }
};