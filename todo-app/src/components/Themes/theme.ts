export const lightTheme = {
    background: '#fff',
    text: '#000',
    borderInput: "#666666",
    applyStyles: () => "",
    InputborderColorHover: '#fff',
    InputborderColorFocus: '#1976d2',
    borderUnderLineInput: '1px solid #fff',
    backgroundColorBody: '#f0f0f0',
  };
  
  export const darkTheme = {
    background: '#121212',
    text: '#fff',
    borderInput: "#666666",
    applyStyles: () => '',
    InputborderColorHover: '#fff',
    InputborderColorFocus: '#1976d2',
    borderUnderLineInput: '1px solid #fff',
    backgroundColorBody: '#1f1f1f',
  };

  export type ThemeType = typeof lightTheme;