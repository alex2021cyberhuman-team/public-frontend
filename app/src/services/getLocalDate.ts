import { format } from "date-fns";
import { dateFnsLocales, localizedStrings } from './localization';


export function getLocalDate(date: Date) {
    const newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    const locale = dateFnsLocales.get(localizedStrings.getLanguage());
    return format(newDate, 'PPPP', { locale: locale });
}
