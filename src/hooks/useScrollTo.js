import { useCallback } from 'react';

/**
 * Хук для плавного скроллинга к элементам
 */
export function useScrollTo() {
  
  /**
   * Скроллит к элементу по селектору
   */
  const scrollToElement = useCallback((selector, options = {}) => {
    const element = document.querySelector(selector);
    
    if (!element) {
      console.warn(`Элемент с селектором "${selector}" не найден`);
      return false;
    }

    const defaultOptions = {
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    };

    element.scrollIntoView({ ...defaultOptions, ...options });
    return true;
  }, []);

  /**
   * Скроллит к элементу с дополнительным отступом
   */
  const scrollToElementWithOffset = useCallback((selector, offset = 100) => {
    const element = document.querySelector(selector);
    
    if (!element) {
      console.warn(`Элемент с селектором "${selector}" не найден`);
      return false;
    }

    const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetTop = elementTop - offset;

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });

    return true;
  }, []);

  /**
   * Скроллит к секции Callback
   */
  const scrollToCallback = useCallback(() => {
    // Пробуем разные возможные селекторы для секции обратной связи
    const selectors = [
      '[data-section="callback"]',
      '.callback-section',
      '#callback',
      '[class*="Callback"]',
      'section:has([class*="callback"])'
    ];

    for (const selector of selectors) {
      if (scrollToElementWithOffset(selector, 80)) {
        return true;
      }
    }

    // Если не нашли специфический селектор, ищем по содержимому
    const allSections = document.querySelectorAll('section, div[class*="section"]');
    
    for (const section of allSections) {
      const hasCallbackForm = section.querySelector('form, [class*="form"]');
      const hasCallbackText = section.textContent.toLowerCase().includes('обратн') || 
                             section.textContent.toLowerCase().includes('связ') ||
                             section.textContent.toLowerCase().includes('контакт');
      
      if (hasCallbackForm && hasCallbackText) {
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: sectionTop - 80,
          behavior: 'smooth'
        });
        return true;
      }
    }

    console.warn('Секция обратной связи не найдена');
    return false;
  }, [scrollToElementWithOffset]);

  return {
    scrollToElement,
    scrollToElementWithOffset,
    scrollToCallback
  };
}
