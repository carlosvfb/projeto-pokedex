import { createContext, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

const lightTheme = {
  body: 'url(https://i.pinimg.com/originals/09/86/2f/09862f723ae85ceec2693c901415b98d.jpg)',
  opacity: 'rgba(255, 255, 255, 0.7)',
  text: '#000',
  toggleBorder: '#FFF',
  background: '#363537',
  colorType: '#a6aec1',
  colorMovements: 'rgba(0, 0, 0, 0.5)',
  urlImage: 'url(https://images.hdqwalls.com/wallpapers/pokemon-go-do.jpg)',
  opacityTransparent: 'rgba(255, 255, 255, 0.7)',
  backgroundMoviments: 'rgba(255, 255, 255, 0.8)',
  colorBack: '#a6aec1',
  opacityButton: 'rgba(255, 255, 255, 0.0)',
  opacityType: 'rgba(255, 255, 255, 0.2)'
};

const darkTheme = {
  body: 'url(http://www.pixelstalk.net/wp-content/uploads/2016/06/Pictures-Pokemon-iPhone-Wallpaper.jpg)',
  opacity: 'rgba(0, 0, 0, 0.7)',
  text: '#FFF',
  toggleBorder: '#000',
  background: '#999',
  colorType: '#a6aec1',
  colorMovements: 'rgba(255, 255, 255, 0.5)',
  urlImage: 'url(https://wallpapercave.com/wp/wp2828048.jpg)',
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
