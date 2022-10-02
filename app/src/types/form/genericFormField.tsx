export interface GenericFormField {
    name: string;
    type: string;
    placeholder: string;
    rows?: number;
    fieldType: 'input' | 'textarea' | 'list' | 'custom';
    listName?: string;
    lg: boolean;
    customElement?: any | undefined;
}

export function buildGenericFormField(data: Partial<GenericFormField> & { name: string }): GenericFormField {
    return {
        type: 'text',
        placeholder: '',
        fieldType: 'input',
        lg: true,
        ...data,
    };
}
