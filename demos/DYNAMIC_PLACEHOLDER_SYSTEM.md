# Документация: Динамический Placeholder для телефонных полей

## Обзор

Система автоматического управления placeholder в полях ввода телефона. Интеллектуально определяет оптимальный код страны на основе пользовательского ввода, геолокации и разрешенных кодов.

## Логика работы

### 1. При фокусе на пустое поле
- Система определяет оптимальный placeholder через `getOptimalPlaceholder()`
- Подставляет его как значение поля

### 2. При потере фокуса с только кодом страны

#### Если код разрешен для отправки:
```javascript
input: "+998" → blur → placeholder="+998", value=""
```

#### Если код не разрешен:
```javascript
input: "+7" → blur → 
  1. Проверка геолокации
  2. Если геолокация = "UZ" → код "998" → placeholder="+998"
  3. Если геолокация = "RU" → код "7" → не разрешен → placeholder="+998"
  4. Если геолокация недоступна → placeholder="+998"
```

### 3. При потере фокуса с полным номером
- Номер сохраняется в поле
- Placeholder не изменяется

## Техническая реализация

### Новые функции в useInputValidation:

#### `getCountryByGeolocation()`
```javascript
// Незаметно определяет страну пользователя через IP
const response = await fetch('https://ipapi.co/json/');
return data.country_code; // "UZ", "RU", etc.
```

#### `getOptimalPlaceholder(currentValue)`
```javascript
// Умная логика выбора placeholder:
// 1. Проверяет разрешенность введенного кода
// 2. При неудаче - геолокация
// 3. При неудаче - первый из ALLOWED_COUNTRY_CODES
```

#### `isOnlyCountryCode(value)`
```javascript
// Определяет, содержит ли поле только код страны
isOnlyCountryCode("+7") → true
isOnlyCountryCode("+7999") → false
```

#### `handlePhoneBlur(value, setPlaceholder)`
```javascript
// Новая логика обработки потери фокуса
// Управляет placeholder через callback setPlaceholder
```

### Новый хук usePhonePlaceholder:

```javascript
const { placeholder, setPlaceholder } = usePhonePlaceholder('+998');
// Управляет состоянием placeholder в компоненте
```

## Использование в компонентах

### CallbackMini и Callback:
```jsx
// Импорт
import { usePhonePlaceholder } from '../../hooks/usePhonePlaceholder';

// Инициализация
const { placeholder, setPlaceholder } = usePhonePlaceholder();
const { handlePhoneFocus, handlePhoneBlur } = useInputValidation();

// Обработчики
const handlePhoneFocusEvent = async (e) => {
  const value = await handlePhoneFocus(e.target.value, setPlaceholder);
  // обновление состояния
};

const handlePhoneBlurEvent = async (e) => {
  const value = await handlePhoneBlur(e.target.value, setPlaceholder);
  // обновление состояния
};

// JSX
<input 
  placeholder={placeholder}
  onFocus={handlePhoneFocusEvent}
  onBlur={handlePhoneBlurEvent}
/>
```

## Конфигурация

### Маппинг стран:
```javascript
const COUNTRY_ISO_TO_PHONE_CODE = {
  'UZ': '998', // Узбекистан
  'RU': '7',   // Россия
  'KZ': '7',   // Казахстан
  'KG': '996', // Кыргызстан
  'TJ': '992', // Таджикистан
  'TM': '993', // Туркменистан
};
```

### Разрешенные коды:
```javascript
const ALLOWED_COUNTRY_CODES = ['998']; // Только Узбекистан
```

## Примеры работы

### Сценарий 1: Разрешенный код
```
1. Пользователь кликает в поле → "+998"
2. Стирает и вводит "+998"
3. Кликает вне поля
4. Результат: placeholder="+998", поле пустое
```

### Сценарий 2: Неразрешенный код + геолокация помогает
```
1. Пользователь вводит "+7"
2. Кликает вне поля
3. Геолокация определяет "UZ" → код "998"
4. Результат: placeholder="+998", поле пустое
```

### Сценарий 3: Неразрешенный код + геолокация не помогает
```
1. Пользователь вводит "+380" (Украина)
2. Кликает вне поля
3. Геолокация определяет "UA" → код "380" → не разрешен
4. Результат: placeholder="+998", поле пустое
```

### Сценарий 4: Полный номер
```
1. Пользователь вводит "+79991234567"
2. Кликает вне поля
3. Результат: поле содержит "+7 999 123 45 67", placeholder не меняется
```

## Безопасность и производительность

- **Геолокация**: Использует публичный API ipapi.co
- **Асинхронность**: Все функции не блокируют UI
- **Fallback**: При любых ошибках возвращается к "+998"
- **Конфиденциальность**: Геолокация незаметна для пользователя
- **Кэширование**: Геолокация вызывается только при необходимости

## Тестирование

Используйте `test-phone.html`:
1. Кликните в поле ввода
2. Введите различные коды (+7, +996, +992, +993)
3. Кликните вне поля
4. Наблюдайте изменение placeholder
5. Введите полный номер и проверьте сохранение
