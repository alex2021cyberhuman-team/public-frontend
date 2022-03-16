import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
import {useLocalization} from "../../../services/localization/reactLocalization";
import GlobalStore from "../../../store/globalStore";
import { buildGenericFormField } from "../../../types/form/genericFormField";
import { ContainerPage } from "../../SharedComponents/ContainerPage/ContainerPage";
import { GenericForm } from "../../SharedComponents/GenericForm/GenericForm";
import { NavItem } from "../../SharedComponents/NavItem/NavItem";
import { onUpdateField } from "./services/onUpdateField";
import { signIn } from "./services/signIn";

export default observer(function Login({
    store
}: {
    store: GlobalStore;
}) {
    const {localization} = useLocalization();
    const navigate = useNavigate();
    return (
        <div className='auth-page'>
            <ContainerPage>
                <div className='col-md-6 offset-md-3 col-xs-12'>
                    <h1 className='text-xs-center'>{localization.login.pageHeader}</h1>
                    <p className='text-xs-center'>
                        <NavItem href='/register' text={localization.login.registerOption}/>
                    </p>

                    <GenericForm
                        disabled={store.login.loggingIn}
                        formObject={store.login.user}
                        submitButtonText={localization.login.pageHeader}
                        errors={store.login.errors}
                        onChange={(name, value) => onUpdateField(name, value, store.login)}
                        onSubmit={(ev) => signIn(ev, navigate, store.login)}
                        fields={[
                            buildGenericFormField({ name: 'email', placeholder: localization.login.email, type: 'email' }),
                            buildGenericFormField({ name: 'password', placeholder: localization.login.password, type: 'password' }),
                        ]}
                    />
                </div>
            </ContainerPage>
        </div>
    );
});


