export function Redirect({to}: { to: string }) {
    let location = new URL(window.location.toString());
    location.pathname = to;
    window.history.pushState({}, '', location);
    return null;
}