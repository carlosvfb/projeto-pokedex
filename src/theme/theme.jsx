import { createContext, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

const lightTheme = {
  body: 'url(../../light-background-image.jpg)',
  opacity: 'rgba(255, 255, 255, 0.7)',
  text: '#000',
  toggleBorder: '#FFF',
  background: '#363537',
  colorType: '#a6aec1',
  colorMovements: 'rgba(0, 0, 0, 0.5)',
  urlImage: 'url(../../image-url-light.jpg)',
  opacityTransparent: 'rgba(255, 255, 255, 0.7)',
  backgroundMoviments: 'rgba(255, 255, 255, 0.8)',
  colorBack: '#a6aec1',
  opacityButton: 'rgba(255, 255, 255, 0.0)',
  opacityType: 'rgba(255, 255, 255, 0.2)'
};

const darkTheme = {
  body: 'url(../../dark-background-image.jpg)',
  opacity: 'rgba(0, 0, 0, 0.7)',
  text: '#FFF',
  toggleBorder: '#000',
  background: '#999',
  colorType: '#a6aec1',
  colorMovements: 'rgba(255, 255, 255, 0.5)',
  urlImage: 'url(../../image-url-dark.jpg)',
  opacityTransparent: 'rgba(0, 0, 0, 0.7)',
  backgroundMoviments: 'rgba(255, 255, 255, 0.5)',
  colorBack: '#FFF',
  opacityButton: 'rgba(255, 255, 255, 0.0)',
  opacityType: 'rgba(0, 0, 0, 0.2)'
};

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, setDarkMode, toggleDarkMode }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ThemeProvider, ThemeContext };
