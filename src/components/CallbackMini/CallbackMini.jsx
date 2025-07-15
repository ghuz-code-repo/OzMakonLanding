import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './CallbackMini.module.css';
import { sendLeadToMacroCRM, showFlashMessage } from '../../utils/macroCRM';
import { formSync } from '../../hooks/useFormSync';
import { SmartPhoneInput } from '../SmartPhoneInput';
import { useScrollTo } from '../../hooks/useScrollTo';
import { validateAndFormatName, isValidName } from '../../utils/nameValidation';

const CallbackMini = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  
  // Хук для скроллинга
  const { scrollToCallback } = useScrollTo();

  // Синхронизация с Callback
  useEffect(() => {
    const unsubscribe = formSync.subscribe((syncData) => {
      setFormData(prev => ({
        ...prev,
        name: syncData.name || '',
        phone: syncData.phone || ''
      }));
      
      // Синхронизируем валидность телефона
      setIsPhoneValid(syncData.isPhoneValid || false);
    });

    // Загружаем начальные данные
    const initialData = formSync.getData();
    if (initialData.name || initialData.phone) {
      setFormData(prev => ({
        ...prev,
        name: initialData.name || '',
        phone: initialData.phone || ''
      }));
      setIsPhoneValid(initialData.isPhoneValid || false);
    }

    return unsubscribe;
  }, []);

  // Обработчик изменения поля имени
  const handleNameChange = (e) => {
    const value = validateAndFormatName(e.target.value);
    setFormData(prev => ({ ...prev, name: value }));
    
    // Синхронизируем с глобальным состоянием
    formSync.updateData('name', value);
  };

  // Обработчик изменения поля телефона
  const handlePhoneChange = (e) => {
    setFormData(prev => ({ ...prev, phone: e.target.value }));
    
    // Синхронизируем с глобальным состоянием
    formSync.updateData('phone', e.target.value);
  };

  // Обработчик валидации телефона
  const handlePhoneValidation = (status) => {
    const isValid = status.isValid && status.isComplete;
    setIsPhoneValid(isValid);
    
    // Синхронизируем статус валидации
    formSync.updateValidation('phone', isValid);
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showFlashMessage('Пожалуйста, введите ваше имя', 'warning');
      return;
    }

    if (!isPhoneValid) {
      showFlashMessage('Пожалуйста, введите корректный номер телефона', 'warning');
      return;
    }

    // Скроллим к основной форме обратной связи
    const scrolled = scrollToCallback();
    
    if (scrolled) {
      showFlashMessage('Данные перенесены в форму обратной связи ниже', 'info', 3000);
    } else {
      // Если не удалось найти основную форму, отправляем заявку напрямую
      setIsSubmitting(true);

      try {
        const leadData = {
          name: formData.name,
          phone: formData.phone,
          action: 'callback',
          channelMedium: 'Форма быстрой связи',
          message: `Быстрая заявка с сайта OzMakon. Имя: ${formData.name}, Телефон: ${formData.phone}`
        };

        const result = await sendLeadToMacroCRM(leadData);

        if (result.success) {
          showFlashMessage('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success', 7000);
          
          // Очищаем форму после успешной отправки
          setFormData({ name: '', phone: '' });
          formSync.clearData();
        } else {
          showFlashMessage(`Ошибка при отправке заявки: ${result.error || result.message}`, 'error');
        }
      } catch (error) {
        console.error('Ошибка отправки формы:', error);
        showFlashMessage('Произошла ошибка при отправке заявки. Попробуйте еще раз.', 'error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles["CallbackMini__overlay"]}>
      <div className={styles["CallbackMini__content"]}>
        <div className={styles["CallbackMini__left"]}>
          <h3 className={styles["CallbackMini__title"]}>{t('conception.helpTitle')}</h3>
        </div>
        <div className={styles["CallbackMini__right"]}>
          <p className={styles["CallbackMini__subtitle"]}>{t('conception.helpSubtitle')}</p>
          <form className={styles["CallbackMini__form"]} onSubmit={handleSubmit}>
            <input
              type="text"
              className={styles["CallbackMini__input"] + ' ' + styles["urbanist"]}
              placeholder={t('conception.form.namePlaceholder')}
              name="name"
              value={formData.name}
              onChange={handleNameChange}
              disabled={isSubmitting}
              autoComplete="off"
              required
              maxLength="50"
            />
            <SmartPhoneInput
              value={formData.phone}
              onChange={handlePhoneChange}
              onValidationChange={handlePhoneValidation}
              className={styles["CallbackMini__input"] + ' ' + styles["urbanist"]}
              disabled={isSubmitting}
              name="phone"
              autoComplete="off"
              required
            />
            <button 
              className={styles["CallbackMini__button"]} 
              type="submit"
              disabled={isSubmitting || !isValidName(formData.name) || !isPhoneValid}
            >
              {isSubmitting ? 'Отправка...' : t('conception.form.button')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CallbackMini;