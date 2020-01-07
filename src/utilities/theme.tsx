import React, { useState } from 'react';

interface Theme {
  colors: {
    primary: string;
    secondary: string;
    link: string;
    background: string;
  };
  sizing: {
    base: number;
  };
}

interface ThemeApi extends Theme {
  swap: () => void;
}

const ThemeBase = {
  sizing: {
    base: 16,
  },
};

const Light: Theme = {
  ...ThemeBase,
  colors: {
    primary: '#cf6e15',
    secondary: '#bbbbbb',
    link: '#9e530e',
    background: '#eeeeee',
  },
};

const Dark: Theme = {
  ...ThemeBase,
  colors: {
    primary: '#eb7f1a',
    secondary: '#cccccc',
    link: '#cf9259',
    background: '#5c5c5c',
  },
};

interface Props {
  children: React.ReactNode;
}

export const ThemeContext = React.createContext<ThemeApi | undefined>(undefined);

export const ThemeProvider: React.FC<Props> = ({ children }: Props) => {
  const [dark, setDark] = useState<boolean>(false);

  return (
    <ThemeContext.Provider
      value={dark ? { ...Dark, swap: () => setDark(!dark) } : { ...Light, swap: () => setDark(!dark) }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
