# Places Around - Блок "Места рядом"

## Обзор

Блок "Места рядом" теперь использует полностью независимые слайды для каждого типа мест. Каждый слайд имеет собственную верстку, изображения и тексты, что позволяет легко изменять их индивидуально.

## Структура компонентов

```
PlacesAround/
├── PlacesAround.jsx           # Главный компонент
├── PlacesAround.module.css    # Стили главного компонента
├── TypeChanger/               # Переключатель типов
│   ├── TypeChanger.jsx
│   └── TypeChanger.module.css
└── Slides/                    # Независимые слайды
    ├── index.js               # Экспорт всех слайдов
    ├── ShoppingCenters/       # Торговые центры
    │   ├── ShoppingCenters.jsx
    │   └── ShoppingCenters.module.css
    ├── Parks/                 # Парки
    │   ├── Parks.jsx
    │   └── Parks.module.css
    ├── Markets/               # Рынки
    │   ├── Markets.jsx
    │   └── Markets.module.css
    ├── Schools/               # Школы
    │   ├── Schools.jsx
    │   └── Schools.module.css
    └── Entertainment/         # Досуг
        ├── Entertainment.jsx
        └── Entertainment.module.css
```

## Типы слайдов

1. **Shopping Centers** (Торговые центры) - `shopping`
2. **Parks** (Парки) - `parks`
3. **Markets** (Рынки) - `markets`
4. **Schools** (Школы) - `schools`
5. **Entertainment** (Досуг) - `entertainment`

## Верстка слайдов

Каждый слайд использует CSS Grid с макетом:
- Главное изображение (левая часть, занимает 2 строки)
- Текстовый блок (правая часть, верхняя строка)
- Дополнительные изображения (правая часть, нижняя строка)

## Переводы

Переводы организованы в структуре:
```json
{
  "places": {
    "sectionTitle": "Места рядом",
    "shopping": "Торговые центры",
    "parks": "Парки",
    "markets": "Рынки", 
    "schools": "Школы",
    "entertainment": "Досуг",
    "shoppingCenters": {
      "title": "...",
      "description": "..."
    },
    "parksDetail": {
      "title": "...",
      "description": "..."
    }
    // ... остальные детальные переводы
  }
}
```

## Адаптивность

Все слайды адаптивны:
- **Desktop**: Grid 2x2 (главное изображение + текст + доп. изображения)
- **Tablet**: Вертикальный стек (главное изображение → текст → доп. изображения)
- **Mobile**: Полностью вертикальный макет

## Анимации

- Плавный переход между слайдами (fade + transform)
- Hover эффекты на изображениях (scale)
- Анимация появления при загрузке

## Изображения

Изображения организованы в папках:
- `/src/assets/webp/ЛЭНДИНГ/` - для слайдов торговых центров, парков, школ
- `/src/assets/webp/рынки/` - для слайда рынков
- `/src/assets/webp/досуг/` - для слайда досуга

## Добавление новых слайдов

1. Создать новую папку в `Slides/`
2. Создать компонент с аналогичной структурой
3. Добавить в `Slides/index.js`
4. Добавить в `slideComponents` объект в `PlacesAround.jsx`
5. Добавить новый тип в `TypeChanger.jsx`
6. Добавить переводы
