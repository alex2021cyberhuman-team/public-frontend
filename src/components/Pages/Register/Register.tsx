import React from 'react';
import {dispatchOnCall, store} from '../../../state/store';
import {useStoreWithInitializer} from '../../../state/storeHooks';
import {buildGenericFormField} from '../../../types/genericFormField';
import {GenericForm} from '../../GenericForm/GenericForm';
import {initializeRegister, RegisterState, startSigningUp, updateErrors, updateField} from './Register.slice';
import {loadUserIntoApp, UserForRegistration} from '../../../types/user';
import {signUp} from '../../../services/conduit';
import {ContainerPage} from '../../ContainerPage/ContainerPage';
import localizedStrings from "../../../services/localization";

export function Register() {
    const {errors, signingUp, user} = useStoreWithInitializer(
        ({register}) => register,
        dispatchOnCall(initializeRegister())
    );

    return (
        <div className='auth-page'>
            <ContainerPage>
                <div className='col-md-6 offset-md-3 col-xs-12'>
                    <h1 className='text-xs-center'>{localizedStrings.register.pageHeader}</h1>
                    <p className='text-xs-center'>
                        <a href='/#/login'>{localizedStrings.register.loginOption}</a>
                    </p>

                    <GenericForm
                        disabled={signingUp}
                        formObject={user as unknown as Record<string, string>}
                        submitButtonText={localizedStrings.register.submit}
                        errors={errors}
                        onChange={onUpdateField}
                        onSubmit={onSignUp(user)}
                        fields={[
                            buildGenericFormField({name: 'username', placeholder: localizedStrings.register.username}),
                            buildGenericFormField({name: 'email', placeholder: localizedStrings.register.email}),
                            buildGenericFormField({name: 'password', placeholder: localizedStrings.register.password, type: 'password'}),
                        ]}
                    />
                </div>
            </ContainerPage>
        </div>
    );
}

function onUpdateField(name: string, value: string) {
    store.dispatch(updateField({name: name as keyof RegisterState['user'], value}));
}

function onSignUp(user: UserForRegistration) {
    return async (ev: React.FormEvent) => {
        ev.preventDefault();
        store.dispatch(startSigningUp());
        const result = await signUp(user);

        result.match({
            err: (e) => store.dispatch(updateErrors(e)),
            ok: (user) => {
                location.hash = '#/';
                loadUserIntoApp(user);
            },
        });
    };
}
