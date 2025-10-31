import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pt_BR from "../locale/pt_BR.json";
import en_US from "../locale/en_US.json";
import es_ES from "../locale/es_ES.json";

const resources = {
  pt_BR: { translation: pt_BR },
  en_US: { translation: en_US },
  es_ES: { translation: es_ES },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en_US",
});

export default i18n;
