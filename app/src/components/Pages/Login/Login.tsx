import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import localizedStrings from "../../../services/localization";
import { buildGenericFormField } from "../../../types/form/genericFormField";
import { ContainerPage } from "../../SharedComponents/ContainerPage/ContainerPage";
import { GenericForm } from "../../SharedComponents/GenericForm/GenericForm";
import { onUpdateField } from "./services/onUpdateField";
import { signIn } from "./services/signIn";
import { loginStore } from "./store/loginStore";

export default observer(() => {
    const navigate = useNavigate();
    return (
        <div className='auth-page'>
            <ContainerPage>
                <div className='col-md-6 offset-md-3 col-xs-12'>
                    <h1 className='text-xs-center'>{localizedStrings.login.pageHeader}</h1>
                    <p className='text-xs-center'>
                        <a href='/#/register'>{localizedStrings.login.registerOption}</a>
                    </p>

                    <GenericForm
                        disabled={loginStore.loggingIn}
                        formObject={loginStore.user}
                        submitButtonText='Sign in'
                        errors={loginStore.errors}
                        onChange={onUpdateField}
                        onSubmit={(ev) => signIn(ev, navigate, loginStore)}
                        fields={[
                            buildGenericFormField({name: 'email', placeholder: localizedStrings.login.email, type: 'email'}),
                            buildGenericFormField({name: 'password', placeholder: localizedStrings.login.password, type: 'password'}),
                        ]}
                    />
                </div>
            </ContainerPage>
        </div>
    );
});


