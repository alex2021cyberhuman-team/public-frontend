import { format } from "date-fns";
import { enGB, ru } from "date-fns/locale";
import { globalStore } from "../../store/globalStore";


export function getLocalDate(date: Date) {
    const newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    const locale = dateFnsLocales.get(globalStore.localization.language);
    return format(newDate, 'PPPP', { locale: locale });
}

export const dateFnsLocales = new Map<string, Locale>([
    ['ru', ru],
    ['en', enGB]
]);