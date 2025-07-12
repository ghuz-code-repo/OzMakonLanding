import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';

const MACRO_SCRIPT_URL = "https://api.macrocrm.gh.uz/estate/embedjs/?domain=gh.uz";
window.isMacroScriptInitiated = window.isMacroScriptInitiated || false;

const MacroWidget = forwardRef((props, ref) => {
  const [isSdkReady, setIsSdkReady] = useState(window.isMacroScriptInitiated);

  useEffect(() => {
    if (window.isMacroScriptInitiated) {
      if (!isSdkReady) setIsSdkReady(true);
      return;
    }
    window.isMacroScriptInitiated = true;

    const script = document.createElement('script');
    script.src = MACRO_SCRIPT_URL;
    script.async = true;
    script.type = 'text/javascript';

    script.onload = () => {
      console.log('MACRO Widget SDK has loaded successfully.');
      setIsSdkReady(true);
    };
    script.onerror = () => {
      console.error('Failed to load the MACRO Widget SDK script.');
      window.isMacroScriptInitiated = false;
    };
    
    document.body.appendChild(script);
  }, [isSdkReady]);

  useImperativeHandle(ref, () => ({
    /**
     * Показывает виджет.
     * @param {object} params - Параметры для виджета (type, locale и т.д.)
     */
    show(params) {
      if (!isSdkReady) {
        console.warn('SDK скрипт ещё не загружен.');
        return;
      }

      if (window.macrocrm && typeof window.macrocrm.initCatalogAndShow === 'function') {
        console.log('Вызываем macrocrm.initCatalogAndShow с параметрами:', params);
        window.macrocrm.initCatalogAndShow(params);
      } else {
        console.error('Базовый объект `macrocrm` или его метод `initCatalogAndShow` не найдены.');
      }
    },
    
    hide() {
        if (window.macroCatalogHide && typeof window.macroCatalogHide === 'function') {
            window.macroCatalogHide();
        } else {
            console.warn('Функция для скрытия виджета не найдена.');
        }
    }
  }));

  return (
    <div
      className="mcrm-inline-form"
      data-type="catalog"
      datanoagentbutton="true"
    ></div>
  );
});

export default MacroWidget;