import { FormattedMessage } from "react-intl";
import { LOCALES } from "../i18n/locales";

const Header = (props) => {
  

  // Languages
  const languages = [
    { name: 'Русский', code: LOCALES.RUSSIAN },
    { name: 'English', code: LOCALES.ENGLISH },
    { name: 'Français', code: LOCALES.FRENCH },
  ];

  return (
    <header>
      <div className="container header_content">
        <div className="spacer"></div>
        <div className="switcher">
          {/* Смена языка */}
          <FormattedMessage id="languages" />{" "}
          <select onChange={props.handleChange} value={props.currentLocale}>
            {languages.map(({ name, code }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
