# MacroCRM Integration

Модуль для интеграции с MacroCRM API для отправки заявок.

## Настройка

1. **Настройте конфигурацию** в файле `src/config/macroConfig.js`:
   ```javascript
   export const MACRO_CONFIGS = {
     development: {
       DOMAIN: 'your-domain.ru',           // Ваш домен
       APP_SECRET: 'your-secret-key',      // Секретный ключ из MacroCRM
       API_URL: 'https://app.macrocrm.online/system/api/request/add'
     },
     production: {
       DOMAIN: 'your-domain.ru',           // Ваш домен для продакшена
       APP_SECRET: 'your-production-secret', // Продакшн секретный ключ
       API_URL: 'https://app.macrocrm.online/system/api/request/add'
     }
   };
   ```

2. **Установите зависимости**:
   ```bash
   npm install crypto-js
   ```

## Использование

### Отправка заявки

```javascript
import { sendLeadToMacroCRM, showFlashMessage } from '../utils/macroCRM.js';

// Пример отправки заявки
const handleSubmit = async (formData) => {
  const leadData = {
    name: formData.name,           // Обязательное поле
    phone: formData.phone,         // Обязательное поле если нет email
    email: formData.email,         // Обязательное поле если нет phone
    message: formData.message,     // Опционально
    action: 'callback',            // Тип заявки
    channelMedium: 'landing_form'  // Метка источника
  };
  
  const result = await sendLeadToMacroCRM(leadData);
  
  if (result.success) {
    showFlashMessage('Заявка успешно отправлена!', 'success');
    console.log('ID заявки:', result.estate_id);
  } else {
    showFlashMessage(result.error || 'Ошибка отправки заявки', 'error');
  }
};
```

### Flash уведомления

```javascript
import { showFlashMessage } from '../utils/macroCRM.js';

// Показать уведомление об успехе
showFlashMessage('Операция выполнена успешно!', 'success');

// Показать ошибку
showFlashMessage('Произошла ошибка', 'error');

// Показать предупреждение
showFlashMessage('Внимание!', 'warning');

// Показать информацию
showFlashMessage('Информация', 'info');

// С кастомным временем показа (10 секунд)
showFlashMessage('Сообщение', 'info', 10000);
```

### Валидация данных

```javascript
import { validatePhone, validateEmail, formatPhone } from '../utils/macroCRM.js';

// Валидация телефона
const phone = '+7 (900) 123-45-67';
if (validatePhone(phone)) {
  const formattedPhone = formatPhone(phone); // '+79001234567'
  console.log('Телефон корректный:', formattedPhone);
}

// Валидация email
const email = 'user@example.com';
if (validateEmail(email)) {
  console.log('Email корректный');
}
```

## Структура данных заявки

```javascript
const leadData = {
  // Обязательные поля
  name: 'Иван Иванов',                    // Имя клиента

  // Один из контактов обязателен
  phone: '+7 (900) 123-45-67',           // Телефон
  email: 'ivan@example.com',             // Email

  // Опциональные поля
  message: 'Комментарий к заявке',       // Сообщение
  action: 'callback',                    // Тип заявки (по умолчанию 'callback')
  channelMedium: 'landing_form'          // Метка источника заявки
};
```

## Автоматические данные

Модуль автоматически собирает и отправляет:

- **UTM метки** из URL (utm_source, utm_medium, utm_campaign и т.д.)
- **Cookies** в base64 формате для аналитики
- **Timestamp** и **токен аутентификации**

## Обработка ошибок

```javascript
const result = await sendLeadToMacroCRM(leadData);

if (!result.success) {
  console.error('Ошибка:', result.error);
  
  switch (result.error) {
    case 'Имя клиента обязательно для заполнения':
      // Подсветить поле имени
      break;
    case 'Необходимо указать телефон или email':
      // Подсветить поля контактов
      break;
    case 'Введите корректный номер телефона':
      // Подсветить поле телефона
      break;
    default:
      // Общая обработка ошибки
      showFlashMessage('Произошла ошибка при отправке заявки', 'error');
  }
}
```

## Отладка

Для отладки включите консольные логи. Модуль выводит подробную информацию о:
- Отправляемых данных
- Токенах аутентификации
- Ответах сервера
- Ошибках

```javascript
// В консоли браузера вы увидите:
// 📤 Отправка заявки в MacroCRM: {...}
// 📥 Ответ от MacroCRM: 200 OK
// 📄 Результат от MacroCRM: {...}
// ✅ Заявка успешно создана в MacroCRM, ID: 12345
```

## Безопасность

- ✅ Токены генерируются динамически для каждого запроса
- ✅ Секретные ключи не передаются в запросах
- ✅ Входящие данные валидируются и экранируются
- ✅ HTTPS обязателен для API запросов

## Требования MacroCRM

Убедитесь, что в настройках MacroCRM:
1. Включен API доступ
2. Настроен корректный домен
3. Сгенерирован секретный ключ
4. Разрешены CORS запросы с вашего домена

## Troubleshooting

### Ошибка "Не настроен секретный ключ"
Проверьте файл `src/config/macroConfig.js` и убедитесь, что указан реальный секретный ключ.

### Ошибка "HTTP Error: 403"
Проверьте правильность домена и секретного ключа в конфигурации.

### Ошибка "HTTP Error: 404"
Проверьте URL API в конфигурации.

### Заявки не приходят в MacroCRM
1. Проверьте логи в консоли браузера
2. Убедитесь, что домен в конфигурации совпадает с доменом в MacroCRM
3. Проверьте правильность секретного ключа
