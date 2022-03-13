import React from 'react';
import {store} from '../../state/store';
import {useStore} from '../../state/storeHooks';
import {buildGenericFormField} from '../../types/genericFormField';
import {ContainerPage} from '../ContainerPage/ContainerPage';
import {GenericForm} from '../GenericForm/GenericForm';
import {addTag, EditorState, removeTag, updateField} from './ArticleEditor.slice';
import localizedStrings from '../../services/localization';

export function ArticleEditor({onSubmit}: { onSubmit: (ev: React.FormEvent) => void }) {
    const {article, submitting, tag, errors} = useStore(({editor}) => editor);

    return (
        <div className='editor-page'>
            <ContainerPage>
                <div className='col-md-10 offset-md-1 col-xs-12'>
                    <GenericForm
                        formObject={{...article, tag} as unknown as Record<string, string | null>}
                        disabled={submitting}
                        errors={errors}
                        onChange={onUpdateField}
                        onSubmit={onSubmit}
                        submitButtonText={localizedStrings.articleEditor.submitButtonText}
                        onAddItemToList={onAddTag}
                        onRemoveListItem={onRemoveTag}
                        fields={[
                            buildGenericFormField({
                                name: 'title',
                                placeholder: localizedStrings.articleEditor.title
                            }),
                            buildGenericFormField({
                                name: 'description',
                                placeholder: localizedStrings.articleEditor.description,
                                lg: false
                            }),
                            buildGenericFormField({
                                name: 'body',
                                placeholder: localizedStrings.articleEditor.body,
                                fieldType: 'textarea',
                                rows: 8,
                                lg: false,
                            }),
                            buildGenericFormField({
                                name: 'tag',
                                placeholder: localizedStrings.articleEditor.tag,
                                listName: 'tagList',
                                fieldType: 'list',
                                lg: false,
                            }),
                        ]}
                    />
                </div>
            </ContainerPage>
        </div>
    );
}

function onUpdateField(name: string, value: string) {
    store.dispatch(updateField({name: name as keyof EditorState['article'], value}));
}

function onAddTag() {
    store.dispatch(addTag());
}

function onRemoveTag(_: string, index: number) {
    store.dispatch(removeTag(index));
}
