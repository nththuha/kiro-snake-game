import { useTranslation } from 'react-i18next';

export function HowToPlay() {
  const { t } = useTranslation();

  const items = [
    { icon: '⬆⬇⬅➡', text: t('guideMove') },
    { icon: '␣', text: t('guidePause') },
    { icon: '🔴', text: t('guideFood') },
    { icon: '💀', text: t('guideWalls') },
  ];

  return (
    <div className="w-full rounded-lg bg-gray-800/60 px-4 py-3">
      <h3 className="text-sm font-semibold text-gray-300 mb-2">{t('howToPlay')}</h3>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-6 text-center shrink-0">{item.icon}</span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
