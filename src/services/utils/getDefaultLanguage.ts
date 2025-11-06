import { LanguageType } from "services/business/BusinessContext";

export function getDefaultLanguage(): LanguageType {
  const supportedLanguages: LanguageType[] = ["pt_BR", "en_US", "es_ES"];

  const params = new URLSearchParams(window.location.search);
  const langByURL = params.get("lang")?.trim();

  if (langByURL) {
    const normalizedLang = langByURL.replace("-", "_");
    const match = supportedLanguages.find((l) => l.toLowerCase() === normalizedLang.toLowerCase());
    if (match) return match;
  }

  const browserLang =
    typeof navigator !== "undefined"
      ? navigator.languages?.[0] || navigator.language
      : "pt-BR";

  if (browserLang) {
    const normalizedBrowserLang = browserLang.replace("-", "_").toLowerCase();

    if (normalizedBrowserLang.startsWith("pt")) return "pt_BR";
    if (normalizedBrowserLang.startsWith("en")) return "en_US";
    if (normalizedBrowserLang.startsWith("es")) return "es_ES";
  }

  return "pt_BR";
}