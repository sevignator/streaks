import clsx from 'clsx';
import { useEffect, useState, type ReactNode } from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';

const ICONS_PATH: Record<ThemeMode, ReactNode> = {
  auto: (
    <>
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </>
  ),
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </>
  ),
  dark: (
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
  ),
};

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode | null>(null);

  useEffect(() => {
    const initialMode = getInitialMode();
    setMode(initialMode);
  }, []);

  useEffect(() => {
    if (!mode) return;
    applyThemeMode(mode);
  }, [mode]);

  useEffect(() => {
    if (mode !== 'auto') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyThemeMode('auto');

    media.addEventListener('change', onChange);

    return () => {
      media.removeEventListener('change', onChange);
    };
  }, [mode]);

  return (
    <div className="flex gap-1 rounded-full border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-950">
      <ThemeOption
        mode="auto"
        activeMode={mode}
        setMode={() => setMode('auto')}
      />
      <ThemeOption
        mode="light"
        activeMode={mode}
        setMode={() => setMode('light')}
      />
      <ThemeOption
        mode="dark"
        activeMode={mode}
        setMode={() => setMode('dark')}
      />
    </div>
  );
}

function ThemeOption({
  mode,
  activeMode,
  setMode,
}: {
  mode: ThemeMode;
  activeMode: ThemeMode | null;
  setMode: () => void;
}) {
  return (
    <button
      onClick={() => setMode()}
      className={clsx(
        'inline-grid aspect-square w-9.5 cursor-pointer place-items-center rounded-full text-violet-900 dark:text-violet-200',
        mode === activeMode && 'bg-(--clr-accent) text-white dark:text-white',
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6"
      >
        {ICONS_PATH[mode]}
      </svg>

      <span className="visually-hidden">{mode}</span>
    </button>
  );
}

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'auto';
  }

  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored;
  }

  return 'auto';
}

function resolveMode(mode: ThemeMode) {
  if (mode !== 'auto') return mode;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function applyThemeMode(mode: ThemeMode) {
  const resolvedMode = resolveMode(mode);

  document.documentElement.dataset.theme = resolvedMode;
  document.documentElement.style.colorScheme = resolvedMode;

  window.localStorage.setItem('theme', mode);
}
