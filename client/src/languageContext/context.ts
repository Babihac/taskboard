import LanguageModel from "./languageModel";
import { english } from "./english";
import React from "react";
type Context = {
  language: "cz" | "en";
  languageModel: LanguageModel;
  setLanguage: (lang: "cz" | "en") => void;
};

export const LanguageContext = React.createContext<Context>({
  language: "en",
  languageModel: english,
  setLanguage: () => undefined,
});
