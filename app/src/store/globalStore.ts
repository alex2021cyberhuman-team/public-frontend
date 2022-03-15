import { makeAutoObservable } from "mobx";
import AppStore, { appStore } from "../components/App/appStore";
import HomeStore, {homeStore} from "../components/Home/homeStore";

class GlobalStore {
    home: HomeStore = homeStore;
    app: AppStore = appStore;
}

export const globalStore = new GlobalStore();
