import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const options = {
  // order and from where user language should be detected
  order: [
    "navigator",
    "querystring",
    "cookie",
    "localStorage",
    "sessionStorage",
    "htmlTag",
    "path",
    "subdomain",
  ],
};

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    lng: "ja",
    supportedLngs: ["en", "ja"],
    nonExplicitSupportedLngs: true, // https://stackoverflow.com/questions/71665807/i18next-not-detecting-language-variation-eg-en-us
    detection: options,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
