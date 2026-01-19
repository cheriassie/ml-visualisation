export const theme = {
  colors: {
    primary: {
      default: '#a855f7',
      hover: '#c084fc',
      light: '#c084fc',
      dark: '#7e22ce',
    },
    background: {
      main: '#0f172a',
      card: 'rgba(30, 41, 59, 0.5)',
      cardHover: 'rgba(30, 41, 59, 0.7)',
      tooltip: '#1e293b',
      code: '#0f172a',
    },
    border: {
      default: '#475569',
      light: '#64748b',
      card: '#334155',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
      muted: '#64748b',
      code: '#f1f5f9',
    },
    chart: {
      grid: '#475569',
      axis: '#94a3b8',
      tooltip: {
        bg: '#1e293b',
        border: '#475569',
        text: '#f1f5f9',
      },
    },
    status: {
      available: '#10b981',
      comingSoon: '#a855f7',
      error: '#ef4444',
    },
    popularity: {
      high: '#10b981',
      medium: '#3b82f6',
      low: '#a855f7',
    },
  },
  styles: {
    card: 'bg-slate-800/50 rounded-lg p-6 border border-slate-700',
    cardInner: 'bg-slate-900/50 rounded-lg p-8 text-center border border-slate-700',
    spinner: 'animate-spin rounded-full border-b-2 border-purple-500',
  },
} as const
