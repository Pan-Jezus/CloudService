// js/api/apiService.js

export default class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  // Метод для получения данных с сервера
  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('GET request failed:', error);
      throw error; // Пробрасываем ошибку дальше
    }
  }

  // Метод для отправки новых данных на сервер
  async post(endpoint, data) {
    try {
      // Искусственная задержка в 1 секунду, чтобы увидеть Оптимистичный UI
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('POST request failed:', error);
      throw error; // Важно для "Обработки конфликтов" по 14 варианту
    }
  }
}