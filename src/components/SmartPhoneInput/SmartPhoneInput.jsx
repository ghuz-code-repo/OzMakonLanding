import React, { useState, useCallback, useEffect } from 'react';
import { useSmartPhoneLogic } from './useSmartPhoneLogic';

/**
 * Умный компонент для ввода номера телефона с автоформатированием
 * и геолокацией
 * 
 * @param {Object} props - свойства компонента
 * @param {string} props.value - текущее значение поля
 * @param {function} props.onChange - обработчик изменения значения
 * @param {string} props.placeholder - начальный placeholder
 * @param {string} props.className - CSS класс для стилизации
 * @param {Object} props.config - конфигурация поведения
 * @param {string[]} props.config.allowedCountryCodes - разрешенные коды стран для отправки (по умолчанию ['998'])
 * @param {string} props.config.defaultCountryCode - код страны по умолчанию (по умолчанию '998')
 * @param {boolean} props.config.enableGeolocation - включить геолокацию (по умолчанию true)
 * @param {function} props.onValidationChange - обработчик изменения статуса валидации
 * @param {function} props.onCountryDetected - обработчик определения страны
 * @param {Object} props.inputProps - дополнительные свойства для input элемента
 * @returns {React.Component} Компонент умного поля ввода телефона
 */
export const SmartPhoneInput = ({
  value = '',
  onChange,
  placeholder: initialPlaceholder = '+998',
  className = '',
  config = {},
  onValidationChange,
  onCountryDetected,
  inputProps = {},
  ...restProps
}) => {
  const [placeholder, setPlaceholder] = useState(initialPlaceholder);
  const [isProcessing, setIsProcessing] = useState(false);

  // Конфигурация по умолчанию
  const defaultConfig = {
    allowedCountryCodes: ['998'],
    defaultCountryCode: '998',
    enableGeolocation: true,
    ...config
  };

  // Используем хук с умной логикой
  const {
    formatPhoneNumber,
    isCountryCodeAllowed,
    detectCountryCode,
    isOnlyCountryCode,
    getOptimalPlaceholder,
    getCountryByGeolocation
  } = useSmartPhoneLogic(defaultConfig);

  /**
   * Обработчик изменения значения поля
   */
  const handleChange = useCallback((event) => {
    const newValue = event.target.value;
    const formattedValue = formatPhoneNumber(newValue);
    
    // Уведомляем о изменении значения
    if (onChange) {
      onChange({
        ...event,
        target: {
          ...event.target,
          value: formattedValue
        }
      });
    }

    // Проверяем валидность и уведомляем о изменении статуса
    if (onValidationChange) {
      const isValid = formattedValue ? isCountryCodeAllowed(formattedValue) : false;
      const detectedCode = detectCountryCode(formattedValue);
      
      onValidationChange({
        isValid,
        countryCode: detectedCode,
        value: formattedValue,
        isComplete: formattedValue.length > (detectedCode?.length || 0) + 1
      });
    }

    // Уведомляем об определении страны
    if (onCountryDetected) {
      const detectedCode = detectCountryCode(formattedValue);
      if (detectedCode) {
        onCountryDetected({
          countryCode: detectedCode,
          isAllowed: defaultConfig.allowedCountryCodes.includes(detectedCode)
        });
      }
    }
  }, [formatPhoneNumber, isCountryCodeAllowed, detectCountryCode, onChange, onValidationChange, onCountryDetected, defaultConfig.allowedCountryCodes]);

  /**
   * Обработчик получения фокуса
   */
  const handleFocus = useCallback(async (event) => {
    // Если поле пустое, устанавливаем код страны по умолчанию
    if (!value.trim()) {
      const defaultCode = `+${defaultConfig.defaultCountryCode}`;
      const formattedValue = formatPhoneNumber(defaultCode);
      
      if (onChange) {
        onChange({
          ...event,
          target: {
            ...event.target,
            value: formattedValue
          }
        });
      }
    }

    // Вызываем оригинальный onFocus если есть
    if (inputProps.onFocus) {
      inputProps.onFocus(event);
    }
  }, [value, formatPhoneNumber, onChange, defaultConfig.defaultCountryCode, inputProps]);

  /**
   * Обработчик потери фокуса  
   */
  const handleBlur = useCallback(async (event) => {
    // Если в поле только код страны
    if (isOnlyCountryCode(value)) {
      setIsProcessing(true);
      
      try {
        // Получаем оптимальный placeholder
        const optimalPlaceholder = await getOptimalPlaceholder(
          defaultConfig.enableGeolocation ? getCountryByGeolocation : null,
          defaultConfig.defaultCountryCode
        );
        
        // Очищаем поле и устанавливаем новый placeholder
        if (onChange) {
          onChange({
            ...event,
            target: {
              ...event.target,
              value: ''
            }
          });
        }
        
        setPlaceholder(optimalPlaceholder);
        
      } catch (error) {
        console.warn('Ошибка при определении геолокации:', error);
        // Используем placeholder по умолчанию
        const defaultPlaceholder = await getOptimalPlaceholder(null, defaultConfig.defaultCountryCode);
        setPlaceholder(defaultPlaceholder);
      } finally {
        setIsProcessing(false);
      }
    }

    // Вызываем оригинальный onBlur если есть
    if (inputProps.onBlur) {
      inputProps.onBlur(event);
    }
  }, [value, isOnlyCountryCode, getOptimalPlaceholder, getCountryByGeolocation, onChange, defaultConfig, inputProps]);

  /**
   * Получение актуального placeholder с индикатором обработки
   */
  const getCurrentPlaceholder = useCallback(() => {
    if (isProcessing) {
      return 'Определяется...';
    }
    return placeholder;
  }, [placeholder, isProcessing]);

  return (
    <input
      type="tel"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={getCurrentPlaceholder()}
      className={className}
      {...inputProps}
      {...restProps}
    />
  );
};

export default SmartPhoneInput;
