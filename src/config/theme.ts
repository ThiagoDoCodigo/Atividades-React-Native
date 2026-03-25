import { Appearance } from 'react-native';

export const Theme = {
  light: {
    // Fundo e Superfícies
    background: '#f8fafc',
    surface: '#ffffff',
    surfaceHighlight: '#f1f5f9',
    
    // Bordas
    border: '#e2e8f0',
    borderFocus: '#cbd5e1',

    // Textos
    text: {
      primary: '#1e293b',
      secondary: '#475569',
      muted: '#94a3b8',
      inverse: '#ffffff',
    },

    // Cores Principais
    primary: {
      main: '#0ea5e9',
      light: '#e0f2fe',
      faded: '#f0f9ff',
    },

    // Feedback
    success: {
      main: '#10b981',
      light: '#d1fae5',
    },
    danger: {
      main: '#ef4444',
      light: '#fee2e2',
      faded: '#fef2f2',
    },
    warning: {
      main: '#f59e0b',
      light: '#fef3c7',
      faded: '#fffbeb',
    },
    info: {
      main: '#0ea5e9',
      light: '#e0f2fe',
    },
    
    // Específico
    special: {
      gold: '#eab308',
      goldLight: '#fef08a',
    }
  },

  dark: {
    // Fundo e Superfícies
    background: '#0f172a',
    surface: '#1e293b',
    surfaceHighlight: '#334155',
    
    // Bordas
    border: '#334155',
    borderFocus: '#475569',

    // Textos
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      muted: '#64748b',
      inverse: '#ffffff',
    },

    // Cores Principais
    primary: {
      main: '#38bdf8',
      light: '#0369a1',
      faded: '#0c4a6e',
    },

    // Feedback
    success: {
      main: '#34d399',
      light: '#065f46',
    },
    danger: {
      main: '#f87171',
      light: '#991b1b',
      faded: '#7f1d1d',
    },
    warning: {
      main: '#fbbf24',
      light: '#92400e',
      faded: '#78350f',
    },
    info: {
      main: '#38bdf8',
      light: '#0369a1',
    },

    special: {
      gold: '#facc15',
      goldLight: '#854d0e',
    }
  }
};

export type ThemeColors = typeof Theme.light;

const currentTheme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';

// const currentTheme = 'dark';

export const colors = Theme[currentTheme];