import { makeAutoObservable } from "mobx";
import AppStore from "../components/App/appStore";
import HomeStore from "../components/Pages/Home/store/homeStore";
import LoginStore from "../components/Pages/Login/store/loginStore";
import LocalizationStore from "../services/localization/localizationStore";

class GlobalStore {
    home: HomeStore;
    app: AppStore;
    localization: LocalizationStore;
    login: LoginStore;

    constructor() {
        this.home = new HomeStore(this);
        this.app = new AppStore(this);
        this.localization = new LocalizationStore(this);
        this.login = new LoginStore(this);
        makeAutoObservable(this);
    }
}

export default GlobalStore;

export const globalStore = new GlobalStore();