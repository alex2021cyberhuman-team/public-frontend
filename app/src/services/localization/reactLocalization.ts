import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { globalStore } from "../../store/globalStore";
import { Language } from "./Language";
import localizedStrings from "./localizedStringsInstance";

interface LocalizationContextInterface {
  localization: typeof localizedStrings;
  language: Language;
}

export function useLocalization() {
  const { language: languageParam } = useParams();
  const { language, localization } = useMemo<LocalizationContextInterface>(
    () => globalStore.localization,
    [globalStore.localization.language,
    globalStore.localization.localization]);
  console.log(language, globalStore.localization.language, languageParam);
  if (languageParam && languageParam !== globalStore.localization.language) {
    globalStore.localization.setLanguage(languageParam);
  }
  return { language, localization };
}

export const languagesTranslates = new Map<string, string>([
  ['en', 'English'],
  ['ru', 'Русский']
]);