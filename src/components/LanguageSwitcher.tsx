import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '@/i18n';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
      style={{
        background: 'rgba(30, 41, 59, 0.5)',
        border: '1px solid rgba(148, 163, 184, 0.1)',
      }}
    >
      <Globe className="w-3.5 h-3.5 text-slate-500" />
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="bg-transparent text-xs text-slate-400 outline-none cursor-pointer appearance-none pr-3"
        style={{ backgroundImage: 'none' }}
      >
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code} className="bg-[#1e293b] text-slate-300">
            {label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-2 text-slate-500">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
