import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSmartPhoneLogic, DEFAULT_ALLOWED_CODES, DEFAULT_COUNTRY_CODE } from './useSmartPhoneLogic';
import { UnsupportedCountryNotification } from './UnsupportedCountryNotification';
import './UnsupportedCountryNotification.css';

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
 * @param {string[]} props.config.allowedCountryCodes - разрешенные коды стран для отправки (по умолчанию из phoneConfig.json)
 * @param {string} props.config.defaultCountryCode - код страны по умолчанию (по умолчанию из phoneConfig.json)
 * @param {boolean} props.config.enableGeolocation - включить геолокацию (по умолчанию true)
 * @param {function} props.onValidationChange - обработчик изменения статуса валидации
 * @param {function} props.onCountryDetected - обработчик определения страны
 * @param {Object} props.inputProps - дополнительные свойства для input элемента
 * @returns {React.Component} Компонент умного поля ввода телефона
 */
export const SmartPhoneInput = ({
  value = '',
  onChange,
  placeholder: initialPlaceholder = `+${DEFAULT_COUNTRY_CODE}`,
  className = '',
  config = {},
  onValidationChange,
  onCountryDetected,
  inputProps = {},
  ...restProps
}) => {
  const [placeholder, setPlaceholder] = useState(initialPlaceholder);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUnsupportedNotification, setShowUnsupportedNotification] = useState(false);
  const [unsupportedCode, setUnsupportedCode] = useState(null);
  const [unsupportedType, setUnsupportedType] = useState(null); // 'forbidden' или 'unknown'
  const [isFocused, setIsFocused] = useState(false);
  
  // Ref для прямого доступа к input элементу
  const inputRef = useRef(null);

  // Конфигурация по умолчанию
  const defaultConfig = {
    allowedCountryCodes: DEFAULT_ALLOWED_CODES,
    defaultCountryCode: DEFAULT_COUNTRY_CODE,
    enableGeolocation: true,
    ...config
  };

  // Используем хук с умной логикой
  const {
    formatPhoneNumber,
    isCountryCodeAllowed,
    detectCountryCode,
    analyzeCountryCode,
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

    // Анализируем код страны для прогрессивной проверки
    const codeAnalysis = analyzeCountryCode(formattedValue);
    // console.log('handleChange - code analysis:', { 
    //   formattedValue, 
    //   analysis: codeAnalysis,
    //   isFocused
    // });
    
    // Логика показа уведомлений
    if (isFocused) {
      if (codeAnalysis.status === 'found' && !codeAnalysis.isAllowed) {
        // Найден точный код, но он не разрешен (известный, но запрещенный)
        // console.log('Showing notification: forbidden code found:', codeAnalysis.code);
        setUnsupportedCode(codeAnalysis.code);
        setUnsupportedType('forbidden');
        setShowUnsupportedNotification(true);
      } else if (codeAnalysis.status === 'impossible') {
        // Введенные цифры не могут быть началом ни одного кода (неизвестный)
        // console.log('Showing notification: unknown code:', codeAnalysis.code);
        setUnsupportedCode(codeAnalysis.code);
        setUnsupportedType('unknown');
        setShowUnsupportedNotification(true);
      } else {
        // Код поддерживается или еще вводится (частичное совпадение)
        // console.log('Hiding notification: code is valid or partial');
        setShowUnsupportedNotification(false);
        setUnsupportedCode(null);
        setUnsupportedType(null);
      }
    } else {
      // Поле не в фокусе - скрываем уведомления
      setShowUnsupportedNotification(false);
      setUnsupportedCode(null);
      setUnsupportedType(null);
    }

    // Проверяем валидность и уведомляем о изменении статуса
    if (onValidationChange) {
      const isValid = formattedValue ? isCountryCodeAllowed(formattedValue) : false;
      
      onValidationChange({
        isValid,
        countryCode: detectedCode,
        value: formattedValue,
        isComplete: formattedValue.length > (detectedCode?.length || 0) + 1
      });
    }

    // Уведомляем об определении страны
    if (onCountryDetected) {
      if (detectedCode) {
        onCountryDetected({
          countryCode: detectedCode,
          isAllowed: defaultConfig.allowedCountryCodes.includes(detectedCode)
        });
      }
    }
  }, [formatPhoneNumber, isCountryCodeAllowed, detectCountryCode, onChange, onValidationChange, onCountryDetected, defaultConfig.allowedCountryCodes, isFocused]);

  /**
   * Обработчик получения фокуса
   */
  const handleFocus = useCallback(async (event) => {
    // console.log('handleFocus called, setting isFocused to true');
    setIsFocused(true);
    
    // Если поле пустое, устанавливаем код страны из placeholder или по умолчанию
    if (!value.trim()) {
      // Извлекаем код из placeholder (например, из "+7" получаем "7")
      let codeToUse = defaultConfig.defaultCountryCode;
      
      if (placeholder && placeholder.startsWith('+')) {
        const placeholderCode = placeholder.substring(1);
        // Проверяем, что код из placeholder разрешен
        if (defaultConfig.allowedCountryCodes.includes(placeholderCode)) {
          codeToUse = placeholderCode;
        }
      }
      
      const defaultCode = `+${codeToUse}`;
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
    } else {
      // Проверяем текущий код для показа уведомления
      const codeAnalysis = analyzeCountryCode(value);
      // console.log('handleFocus - checking existing value:', { value, analysis: codeAnalysis });
      
      if (codeAnalysis.status === 'found' && !codeAnalysis.isAllowed) {
        // console.log('handleFocus - showing notification for forbidden code:', codeAnalysis.code);
        setUnsupportedCode(codeAnalysis.code);
        setUnsupportedType('forbidden');
        setShowUnsupportedNotification(true);
      } else if (codeAnalysis.status === 'impossible') {
        // console.log('handleFocus - showing notification for unknown code:', codeAnalysis.code);
        setUnsupportedCode(codeAnalysis.code);
        setUnsupportedType('unknown');
        setShowUnsupportedNotification(true);
      }
    }

    // Вызываем оригинальный onFocus если есть
    if (inputProps.onFocus) {
      inputProps.onFocus(event);
    }
  }, [value, placeholder, formatPhoneNumber, onChange, defaultConfig, inputProps, analyzeCountryCode]);

  /**
   * Обработчик потери фокуса  
   */
  const handleBlur = useCallback(async (event) => {
    // Добавляем небольшую задержку, чтобы клик по кнопке уведомления успел сработать
    setTimeout(() => {
      setIsFocused(false);
      setShowUnsupportedNotification(false);
      setUnsupportedCode(null);
      setUnsupportedType(null);
    }, 150);
    
    // Если в поле только код страны
    if (isOnlyCountryCode(value)) {
      const detectedCode = detectCountryCode(value);
      
      // Если введенный код разрешен, убираем его в placeholder
      if (detectedCode && defaultConfig.allowedCountryCodes.includes(detectedCode)) {
        // Код разрешен - очищаем поле и устанавливаем как placeholder
        if (onChange) {
          onChange({
            ...event,
            target: {
              ...event.target,
              value: ''
            }
          });
        }
        setPlaceholder(`+${detectedCode}`);
      } else {
        // Код не разрешен - заменяем на оптимальный
        setIsProcessing(true);
        
        try {
          // Получаем оптимальный placeholder через геолокацию
          const optimalPlaceholder = await getOptimalPlaceholder();
          
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
          setPlaceholder(`+${defaultConfig.defaultCountryCode}`);
        } finally {
          setIsProcessing(false);
        }
      }
    }

    // Вызываем оригинальный onBlur если есть
    if (inputProps.onBlur) {
      inputProps.onBlur(event);
    }
  }, [value, isOnlyCountryCode, detectCountryCode, getOptimalPlaceholder, onChange, defaultConfig, inputProps]);

  /**
   * Получение актуального placeholder с индикатором обработки
   */
  const getCurrentPlaceholder = useCallback(() => {
    if (isProcessing) {
      return 'Определяется...';
    }
    return placeholder;
  }, [placeholder, isProcessing]);

  /**
   * Обработчик кнопки "Подставить код по геолокации"
   * Принудительно заменяет всё введённое на код страны по геолокации
   */
  const handleUseGeolocation = useCallback(async () => {
    setIsProcessing(true);
    setShowUnsupportedNotification(false);
    setUnsupportedCode(null);
    setUnsupportedType(null);
    
    try {
      const optimalPlaceholder = await getOptimalPlaceholder();
      // console.log('🌍 Geolocation result:', optimalPlaceholder);
      
      // Принудительно заменяем ВСЁ содержимое поля на код по геолокации
      if (onChange) {
        onChange({
          target: {
            value: optimalPlaceholder
          }
        });
      }
      
      setPlaceholder(optimalPlaceholder);
      
    } catch (error) {
      console.warn('Ошибка при определении геолокации:', error);
      // Используем код по умолчанию
      const defaultCode = `+${defaultConfig.defaultCountryCode}`;
      // console.log('🌍 Using default code:', defaultCode);
      
      if (onChange) {
        onChange({
          target: {
            value: defaultCode
          }
        });
      }
      setPlaceholder(defaultCode);
    } finally {
      setIsProcessing(false);
    }
  }, [getOptimalPlaceholder, onChange, defaultConfig.defaultCountryCode]);

  /**
   * Обработчик кнопки "Очистить поле"
   * Полностью очищает поле ввода
   */
  const handleClearField = useCallback(() => {
    // console.log('🗑️ Clearing field - START');
    // console.log('🗑️ Current value:', value);
    setShowUnsupportedNotification(false);
    setUnsupportedCode(null);
    setUnsupportedType(null);
    
    // Подход 1: Очищаем через onChange
    if (onChange) {
      // console.log('🗑️ Calling onChange with empty value');
      const syntheticEvent = {
        target: {
          value: '',
          name: 'phone'
        },
        type: 'change',
        preventDefault: () => {},
        stopPropagation: () => {}
      };
      onChange(syntheticEvent);
    } else {
      // console.log('🗑️ onChange not available');
    }
    
    // Подход 2: Очищаем через прямое обращение к DOM
    if (inputRef.current) {
      // console.log('🗑️ Clearing via DOM ref');
      inputRef.current.value = '';
      
      // Создаем событие input для срабатывания всех обработчиков
      const inputEvent = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(inputEvent);
      
      const changeEvent = new Event('change', { bubbles: true });
      inputRef.current.dispatchEvent(changeEvent);
    }
    
    // Восстанавливаем изначальный placeholder
    // console.log('🗑️ Setting placeholder to:', initialPlaceholder);
    setPlaceholder(initialPlaceholder);
    // console.log('🗑️ Clearing field - END');
  }, [onChange, initialPlaceholder, value]);

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      <input
        ref={inputRef}
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
      
      {showUnsupportedNotification && (
        <UnsupportedCountryNotification
          unsupportedCode={unsupportedCode}
          unsupportedType={unsupportedType}
          allowedCountryCodes={defaultConfig.allowedCountryCodes}
          onUseGeolocation={handleUseGeolocation}
          onKeepCurrentCode={handleClearField}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
};

export default SmartPhoneInput;
