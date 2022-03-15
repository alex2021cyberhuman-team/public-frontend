import { makeAutoObservable } from "mobx";
import HomeStore, {homeStore} from "../components/Home/homeStore";

class GlobalStore {
    home: HomeStore = homeStore;
}

export const globalStore = new GlobalStore();
