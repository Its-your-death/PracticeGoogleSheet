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
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
      <div className="container header_content">
        <div className="spacer"></div>
        <div class="breadcrumb">
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
