import React from "react";
import { LanguageContext } from "./context";
import { czech } from "./czech";
import { english } from "./english";

export const LanguageProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = React.useState<"cz" | "en">("en");

  let languageData;
  if (language === "cz") {
    languageData = czech;
  } else {
    languageData = english;
  }

  return (
    <LanguageContext.Provider
      value={{ language, languageModel: languageData, setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
