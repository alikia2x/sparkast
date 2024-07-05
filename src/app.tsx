import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "~react-pages";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import ICU from 'i18next-icu';
import * as en from "i18n/en.json"
import * as zh from "i18n/zh.json"
import * as ja from "i18n/ja.json"
import * as ar from "i18n/ar.json"
import * as de from "i18n/de.json"
import * as es from "i18n/es.json"
import * as fr from "i18n/fr.json"
import * as it from "i18n/it.json"
import * as ko from "i18n/ko.json"
import * as pt from "i18n/pt.json"
import * as ru from "i18n/ru.json"

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .use(ICU)
    .init({
        resources: {
            en: {
                translation: en
            },
            zh: {
                translation: zh
            },
            ja: {
                translation: ja
            },
            ar: {
                translation: ar
            },
            de: {
                translation: de
            },
            es: {
                translation: es
            },
            fr: {
                translation: fr
            },
            it: {
                translation: it
            },
            ko: {
                translation: ko
            },
            pt: {
                translation: pt
            },
            ru: {
                translation: ru
            }
        },
        fallbackLng: "en",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },

        detection: {
            order: ['navigator'],
            caches: []
        }
    });


export function App() {
    return <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>;
}
