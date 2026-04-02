// js/storage/localStorage.js

export default class LocalStorageService {
  constructor() {
    this.storage = window.localStorage;
  }

  // Сохранение данных
  set(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      this.storage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error('Ошибка сохранения в localStorage:', error);
      return false;
    }
  }

  // Получение данных
  get(key, defaultValue = null) {
    try {
      const item = this.storage.getItem(key);
      if (!item) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error('Ошибка чтения из localStorage:', error);
      return defaultValue;
    }
  }
}