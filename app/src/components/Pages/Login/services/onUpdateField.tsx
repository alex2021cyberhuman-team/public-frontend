import { loginStore } from "../store/loginStore";

export function onUpdateField(name: string, value: string) {
    loginStore.updateField(name, value);
}
