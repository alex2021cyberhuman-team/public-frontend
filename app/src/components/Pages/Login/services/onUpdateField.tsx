import LoginStore from "../store/loginStore";

export function onUpdateField(name: string, value: string, loginStore: LoginStore) {
    loginStore.updateField(name, value);
}
