import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '@/i18n';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="bg-gray-800 text-white text-sm border border-gray-600 rounded px-2 py-1 outline-none focus:border-green-500"
    >
      {LANGUAGES.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
}
