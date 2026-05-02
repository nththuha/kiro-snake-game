import { useTranslation } from 'react-i18next';

export function HowToPlay() {
  const { t } = useTranslation();

  const items = [
    { keys: ['↑', '↓', '←', '→'], label: t('guideMove') },
    { keys: ['␣'], label: t('guidePause') },
  ];

  return (
    <div className="flex w-full items-center justify-center gap-4 flex-wrap">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {item.keys.map((k) => (
              <kbd
                key={k}
                className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1 rounded text-[10px] font-bold text-slate-400"
                style={{
                  background: 'var(--surface-subtle)',
                  border: '1px solid var(--surface-subtle-border)',
                  boxShadow: 'var(--shadow-kbd)',
                }}
              >
                {k}
              </kbd>
            ))}
          </div>
          <span className="text-[11px] text-slate-500">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
