export function objectToQueryString<T, V>(object: Partial<Record<keyof T, V>>): string {
    return Object.entries(object)
        .filter(([key, value]) => value && key)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
}
