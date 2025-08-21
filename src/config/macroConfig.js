
export const MACRO_CONFIGS = {
  development: {
    API_URL: 'https://api.macrocrm.gh.uz/estate/request/',
    DOMAIN: 'oz-makon-business.gh.uz',
    APP_SECRET: '26x5th9fbtc2vUvQWsh83mYSwHPNf5vlm2mg',
  },
  
  production: {
    API_URL: 'https://api.macrocrm.gh.uz/estate/request/',
    DOMAIN: 'oz-makon-business.gh.uz',
    APP_SECRET: '26x5th9fbtc2vUvQWsh83mYSwHPNf5vlm2mg',
  }
};

// Определение текущего окружения
const isDevelopment = process.env.NODE_ENV === 'development';
export const CURRENT_CONFIG = isDevelopment ? MACRO_CONFIGS.development : MACRO_CONFIGS.production;
async function P3(f) {
    try {
        if (!f.name || !f.name.trim())
            throw new Error("Имя клиента обязательно для заполнения");
        if (!f.phone && !f.email)
            throw new Error("Необходимо указать телефон или email");
        if (f.phone && (f.phone = J3(f.phone),
        !W3(f.phone)))
            throw new Error("Некорректный номер телефона");
        const s = Math.floor(Date.now() / 1e3)
          , r = Z3(is.DOMAIN, s, is.APP_SECRET)
          , i = new FormData;
        i.append("domain", is.DOMAIN),
        i.append("time", s.toString()),
        i.append("token", r),
        i.append("action", f.action || "callback"),
        i.append("name", f.name.trim()),
        f.phone && i.append("phone", f.phone),
        f.email && i.append("email", f.email),
        f.message && i.append("message", f.message),
        f.channelMedium && i.append("channel_medium", f.channelMedium);
        const u = Q3();
        Object.keys(u).length > 0 && i.append("utm", JSON.stringify(u));
        const d = K3();
        d && i.append("cookie_base64", d);
        const p = await fetch(is.API_URL, {
            method: "POST",
            body: i,
            headers: {}
        });
        if (!p.ok)
            throw new Error(`HTTP Error: ${p.status} ${p.statusText}`);
        const m = await p.json();
        if (m.error)
            throw new Error(m.message || "Неизвестная ошибка от сервера MacroCRM");
        if (m.success)
            return {
                success: !0,
                estate_id: m.estate_id,
                message: "Заявка успешно отправлена"
            };
        throw new Error("Неожиданный формат ответа от сервера")
    } catch (s) {
        return console.error("Ошибка отправки заявки в MacroCRM:", s),
        {
            success: !1,
            error: s.message,
            message: "Ошибка при отправке заявки"
        }
    }
}