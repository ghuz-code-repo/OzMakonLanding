import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';

// Используем прокси для загрузки скрипта, как и договаривались
const MACRO_SCRIPT_URL = "/api/estate/embedjs/?domain=gh.uz";
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
         * Показывает виджет, используя самый надёжный метод.
         * @param {object} params - Параметры для виджета (type, locale и т.д.)
         */
        show(params) {
            if (!isSdkReady) {
                console.warn('SDK скрипт ещё не загружен.');
                return;
            }

            // КЛЮЧЕВОЕ ИЗМЕНЕНИЕ:
            // Мы вызываем только `macrocrm.initCatalogAndShow`, как в вашем HTML-файле.
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

    // ВАЖНО: Убираем все data-атрибуты, кроме data-type,
    // чтобы не вызывать автоматическую инициализацию, которая нам мешала.
    return (
        <div
            className="mcrm-inline-form"
            data-type="facades,floor,bigGrid,smallGrid,plans,list,objects,description"
        ></div>
    );
});

export default MacroWidget;