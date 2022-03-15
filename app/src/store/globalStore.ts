import { makeAutoObservable } from "mobx";
import AppStore, { appStore } from "../components/App/appStore";
import HomeStore, {homeStore} from "../components/Pages/Home/store/homeStore";

class GlobalStore {
    home: HomeStore = homeStore;
    app: AppStore = appStore;
    
    constructor() {
        makeAutoObservable(this);
    }
}

export const globalStore = new GlobalStore();