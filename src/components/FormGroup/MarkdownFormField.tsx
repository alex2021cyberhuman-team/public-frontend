import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import rehypeSanitize from 'rehype-sanitize';
import { FormFieldProps } from '../../types/genericFormField';
import { getCommands } from './getCommands';
import { getExtraCommands } from './getExtraCommands';

export function MarkdownFormField({
  disabled,
  value,
  onChange,
  placeholder,
}: FormFieldProps & { placeholder?: string | undefined }) {
  function onChangeIfNotDisabled(value: string | undefined): void {
    if (!disabled) {
      onChange(value);
    }
  }
  return (
    <fieldset className='form-group'>
      <div className='form-control' data-color-mode='light'>
        <MDEditor
          value={value}
          placeholder={placeholder}
          height={300}
          onChange={(value) => onChangeIfNotDisabled(value)}
          commands={getCommands()}
          extraCommands={getExtraCommands()}
          previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
        />
      </div>
    </fieldset>
  );
}
