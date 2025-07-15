/**
 * Утилиты для валидации имени
 */

/**
 * Валидирует и форматирует имя пользователя
 * @param {string} name - введенное имя
 * @returns {string} - отформатированное имя
 */
export const validateAndFormatName = (name) => {
  // Разрешенные символы: буквы (русские/английские), пробелы, апострофы (') и обратные кавычки (`)
  let formattedName = name.replace(/[^a-zA-Zа-яёА-ЯЁ\s'`]/g, '');
  
  // Ограничиваем до максимум 4 слов
  const words = formattedName.trim().split(/\s+/).filter(word => word.length > 0);
  if (words.length > 4) {
    formattedName = words.slice(0, 4).join(' ');
  }
  
  return formattedName;
};

/**
 * Проверяет валидность имени для отправки формы
 * @param {string} name - имя для проверки
 * @returns {boolean} - true если имя валидно
 */
export const isValidName = (name) => {
  const trimmedName = name.trim();
  
  // Имя должно содержать хотя бы 2 символа
  if (trimmedName.length < 2) return false;
  
  // Проверяем количество слов (максимум 4)
  const words = trimmedName.split(/\s+/).filter(word => word.length > 0);
  if (words.length > 4) return false;
  
  // Проверяем что каждое слово содержит только разрешенные символы
  const validPattern = /^[a-zA-Zа-яёА-ЯЁ'`\s]+$/;
  return validPattern.test(trimmedName);
};
