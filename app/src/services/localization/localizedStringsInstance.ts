import LocalizedStrings from "react-localization";
import enStrings from "./enStrings";
import ruStrings from "./ruStrings";

const localizedStrings = new LocalizedStrings({
    ru: ruStrings,
    en: enStrings
});

export default localizedStrings;
