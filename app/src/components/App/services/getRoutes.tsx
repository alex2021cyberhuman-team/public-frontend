import { Navigate, RouteObject } from "react-router-dom";
import Layout from "../../SharedComponents/Layout/Layout";
import GlobalStore from '../../../store/globalStore';
import Home from '../../Pages/Home/Home';
import Login from "../../Pages/Login/Login";
import { globalFeedTab, yourFeedTab } from "../../Pages/Home/services/getHomePageTabs";
import { LanguageNavigate } from "../../SharedComponents/Languages/Languages";

export function getRoutes({ store }: { store: GlobalStore; }) {
    let items: RouteObject[] = [
        {
            path: "/",
            element: (<Layout store={store}/>),
            children: [
                { index: true, element: <LanguageNavigate to={`/${globalFeedTab}`} /> },
                { path: '/:language/login', element: <Login store={store}/> },
                { path: "/:language/:tab/:tag", element: <Home store={store}/> },
                { path: "/:language/:tab", element: <Home store={store}/> },
                { path: "*", element: <LanguageNavigate to={`/${globalFeedTab}`} /> }
            ]
        }
    ];
    if (store.app.user.isSome()) {
        // @ts-ignore Replace tab
        items[0]!.children[0]! = { index: true, element: <LanguageNavigate to={`/${yourFeedTab}`} /> }
    }

    return items;
}
