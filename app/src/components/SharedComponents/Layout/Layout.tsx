import { Fragment } from "react";
import { Outlet, useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import GlobalStore from "../../../store/globalStore";
import { observer } from "mobx-react-lite";
import { useLocalization } from "../../../services/localization/reactLocalization";

export default observer(function Layout({
    store
}: {
    store: GlobalStore
}) {
    const { language, localization } = useLocalization();
    return (
        <Fragment>
            {(!store.app.isLoading && (
                <Fragment>
                    <Header user={store.app.user} currentLanguage={language} onChangeLanguage={(language) => store.localization.onChangeLanguage(language)} />
                    <Outlet />
                    <Footer />
                </Fragment>
            )) || <p>{localization.viewer.loading}</p>}
        </Fragment>
    )
});