# 📝 SmartPhoneInput - Шпаргалка

## 🚀 Основные сценарии использования

### 1. Самый простой вариант
```jsx
import { SmartPhoneInput } from './components/SmartPhoneInput';

function MyForm() {
  const [phone, setPhone] = useState('');
  
  return (
    <SmartPhoneInput
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
    />
  );
}
```

### 2. Управление кнопкой отправки
```jsx
function FormWithSubmit() {
  const [phone, setPhone] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  return (
    <div>
      <SmartPhoneInput
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        onValidationChange={(status) => {
          setCanSubmit(status.isValid && status.isComplete);
        }}
      />
      <button disabled={!canSubmit}>Отправить</button>
    </div>
  );
}
```

### 3. Только Узбекистан (+998)
```jsx
<SmartPhoneInput
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  config={{
    allowedCountryCodes: ['998']  // Только +998
  }}
/>
```

### 4. Узбекистан + Россия
```jsx
<SmartPhoneInput
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  config={{
    allowedCountryCodes: ['998', '7']  // +998 и +7
  }}
/>
```

### 5. Все поддерживаемые страны
```jsx
<SmartPhoneInput
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  config={{
    allowedCountryCodes: ['7', '998', '996', '992', '993']
  }}
/>
```

### 6. Отключить геолокацию
```jsx
<SmartPhoneInput
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  config={{
    enableGeolocation: false,  // Не определять страну автоматически
    defaultCountryCode: '998'  // Всегда показывать +998
  }}
/>
```

### 7. Показать ошибки валидации
```jsx
function FormWithErrors() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  return (
    <div>
      <SmartPhoneInput
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        onValidationChange={(status) => {
          if (status.value && !status.isValid) {
            setError('Номер не поддерживается');
          } else {
            setError('');
          }
        }}
        config={{
          allowedCountryCodes: ['998']
        }}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
}
```

### 8. Определение страны
```jsx
function FormWithCountryInfo() {
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');

  const countryNames = {
    '7': 'Россия/Казахстан',
    '998': 'Узбекистан',
    '996': 'Кыргызстан',
    '992': 'Таджикистан',
    '993': 'Туркменистан'
  };

  return (
    <div>
      <SmartPhoneInput
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        onCountryDetected={(detected) => {
          setCountry(countryNames[detected.countryCode] || 'Неизвестная');
        }}
      />
      {country && <small>Страна: {country}</small>}
    </div>
  );
}
```

## 🎨 Стилизация

```css
/* Обычное состояние */
.phone-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* При фокусе */
.phone-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

/* Валидный номер */
.phone-input.valid {
  border-color: #28a745;
}

/* Ошибка */
.phone-input.error {
  border-color: #dc3545;
}
```

## 🔧 Поддерживаемые форматы

| Страна | Код | Формат |
|--------|-----|--------|
| Россия/Казахстан | +7 | +7 999 999 99 99|
| Узбекистан | +998 | +998 99 999 99 99 |
| Кыргызстан | +996 | +996 999 999 999 |
| Таджикистан | +992 | +992 99 999 9999 |
| Туркменистан | +993 | +993 99 999 999 |

## ❓ Частые вопросы

**В: Как добавить новую страну?**  
О: Отредактируйте `COUNTRY_PHONE_CONFIG` в `useSmartPhoneLogic.js`

**В: Как отключить автоформатирование?**  
О: Используйте обычный `input`, а логику форматирования подключайте через хук `useSmartPhoneLogic`

**В: Работает ли с TypeScript?**  
О: Да, типы находятся в `types.d.ts`

**В: Можно ли использовать без React?**  
О: Нет, это React компонент. Логику можно портировать на другие фреймворки.
