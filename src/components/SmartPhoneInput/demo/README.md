# 📁 Demo & Examples

Эта папка содержит демонстрационные материалы и примеры использования компонента **SmartPhoneInput**.

## 📋 Содержимое папки

### 📚 Документация
- **`CHEATSHEET.md`** - шпаргалка по быстрому использованию компонента
- **`QUICK_START.md`** - быстрый старт для разработчиков

### 🎨 HTML Демо-страницы
- **`smart-phone-input-demo.html`** - интерактивная демонстрация компонента
- **`cheatsheet-demo.html`** - демо-страница шпаргалки с подсветкой синтаксиса

### 💻 React Примеры
- **`CallbackMiniExample.jsx`** - пример интеграции в форму обратной связи

## 🚀 Как использовать

### Просмотр HTML демо
Откройте HTML файлы в браузере для интерактивного тестирования:
```bash
# Откройте в браузере
./smart-phone-input-demo.html
./cheatsheet-demo.html
```

### Изучение React примеров
Посмотрите на `CallbackMiniExample.jsx` для понимания интеграции:
```jsx
import { SmartPhoneInput } from '../SmartPhoneInput';

// Простое использование
<SmartPhoneInput
  value={phone}
  onChange={handlePhoneChange}
  onValidationChange={handleValidation}
/>
```

### Документация
- `CHEATSHEET.md` - для быстрого понимания API
- `QUICK_START.md` - для пошагового внедрения

## 📦 Основной компонент

Основные файлы компонента находятся в родительской папке:
- `SmartPhoneInput.jsx` - главный компонент
- `useSmartPhoneLogic.js` - хук с логикой
- `README.md` - основная документация

---

> **Примечание:** Все демо-материалы предназначены только для демонстрации и обучения. В продакшене используйте только основные файлы компонента.
