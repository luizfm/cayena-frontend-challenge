import { createContext, useCallback, useEffect, useState } from 'react'

const themeContextInitialState = {
  theme: '',
  onThemeChange: () => {},
}

export const ThemeContext = createContext(themeContextInitialState)

type ThemeContextProviderProps = {
  children: React.ReactNode
}

function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState('light')

  const onThemeChange = useCallback(() => {
    setTheme((prevValue) => {
      const htmlTag = document.querySelector('html')

      const newTheme = prevValue === 'light' ? 'dark' : 'light'

      htmlTag?.classList.remove(prevValue)
      htmlTag?.classList.add(newTheme)

      return newTheme
    })
  }, [])

  useEffect(() => {
    const htmlTag = document.querySelector('html')

    htmlTag?.classList.add(theme)
  })

  return (
    <ThemeContext.Provider value={{ theme, onThemeChange }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
