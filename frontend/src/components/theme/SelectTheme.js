import Select from "react-select";
import Themes from "monaco-themes/themes/themelist";

const SelectTheme = ({ changeTheme, theme, darkTheme }) => {
  const CustomStyle = {
    option: (base, state) => {
       let backgroundColor = darkTheme ? '#101010' : '#e5e2e2';
 
       if (state.isSelected) {
        darkTheme ? backgroundColor = "black" : backgroundColor = "#a5a5a5"
       }
 
       if (state.isFocused) {
         backgroundColor = "#8080804a";
       }
 
       return {
         ...base,
         backgroundColor
       };
     }
 }
  return (
    <Select
      placeholder={`Select Theme`}
      options={Object.entries(Themes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
      }))}
      value={theme}
      onChange={changeTheme}
      className = "monaco-themes"
      styles={CustomStyle}
    />
  );
};

export default SelectTheme;