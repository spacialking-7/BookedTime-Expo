import React, { createContext, useState, useMemo } from "react";
import { colors, colorsLight } from "./colors";
import { spacing } from "./spacing";
import { theme as baseTheme } from "./theme";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(prev => !prev);

  const theme = useMemo(() => {
    return {
      ...baseTheme,
      colors: isDark ? colors : colorsLight,
      components: {
        ...baseTheme.components,
        card: {
          ...baseTheme.components.card,
          backgroundColor: isDark ? colors.card : colorsLight.card,
        },
        input: {
          ...baseTheme.components.input,
          backgroundColor: isDark ? colors.card : colorsLight.card,
        },
      },
    };
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}