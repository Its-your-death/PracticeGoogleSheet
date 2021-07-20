import { LOCALES } from "./locales";

export const messages = {
  [LOCALES.ENGLISH]: {
    name: `Name`,
    Surname: 'Second name',
    Phone: 'Phone number',
    Email: 'E-mail',
    Comm: 'Comment',
    click: 'Submit',
    languages: "Languages",
    Success: 'Success',
    e400: 'Invalid email address!',
    e403: 'Invalid Number!',
    e404: 'Page Not Found!'
  },
  [LOCALES.RUSSIAN]: {
    name: `Имя`,
    Surname: 'Фамилия',
    Phone: 'Номер телефона',
    Email: 'E-mail',
    Comm: 'Комментарий',
    click: 'Отправить',
    languages: "Язык сайта",
    Success: 'Успешно',
    e400: 'Некорректно введен email!',
    e403: 'Некорректный Номер!',
    e404: 'Страница Не Найдена!'
  },
  [LOCALES.FRENCH]: {
    name: `Nom`,
    Surname: 'Nom de famille',
    Phone: 'Numéro de téléphone',
    Email: 'E-mail',
    Comm: 'Commentaire',
    click: 'Envoyer',
    languages: "Langues",
    Success: 'Avec succès',
    e400: 'Email incorrect!',
    e403: 'Numéro incorrect!',
    e404: 'Page Non Trouvée!'
  },
};
