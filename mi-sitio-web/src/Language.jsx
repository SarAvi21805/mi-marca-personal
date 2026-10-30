import { useEffect, useState } from 'react';
import { readSetting, saveSetting } from './components/experience-state';

import { LanguageContext, useLanguage } from './locale-context';
export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const saved = readSetting('language', 'es');
        return ['es', 'en', 'fr'].includes(saved) ? saved : 'es';
    });
    useEffect(() => {
        document.documentElement.lang = language;
        saveSetting('language', language);
    }, [language]);
    const tx = (es, en, fr) => ({ es, en, fr }[language]);
    return <LanguageContext.Provider value={{ language, setLanguage, tx }}>{children}</LanguageContext.Provider>;
}
export function LanguageSelector() {
    const { language, setLanguage, tx } = useLanguage();
    return <label className="language-select">{tx('Idioma', 'Language', 'Langue')}
        <select value={language} onChange={event => setLanguage(event.target.value)}>
            <option value="es" lang="es">Español</option>
            <option value="en" lang="en">English</option>
            <option value="fr" lang="fr">Français</option>
        </select>
    </label>;
}
