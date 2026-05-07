import Select from "react-select";
import { languages } from "./languages";

const SelectLanguage = ({ onSelectChange, darkTheme }) => {
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
      placeholder={`Filter By Category`}
      options={languages}
      defaultValue={languages[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
      className="language"
      styles={CustomStyle}
    />
  );
};

export default SelectLanguage;