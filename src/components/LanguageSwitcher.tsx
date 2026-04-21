import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '@/i18n';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="bg-secondary text-secondary-foreground text-sm border border-border rounded px-2 py-1 outline-none focus:border-green-500"
    >
      {LANGUAGES.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
}
