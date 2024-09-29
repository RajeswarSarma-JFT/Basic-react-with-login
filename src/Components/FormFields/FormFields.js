import React from 'react';

import { FormGroup, Label } from 'reactstrap';

import WorkspaceElement from './WorkspaceElement';
import DatePickerFormElement from './DatePickerFormElement';
import InputElement from './InputElement';
import PasswordElement from './PasswordElement';
import SelectFormElement from './SelectFormElement';
import TextEditorElement from './TextEditorElement';
import TextareaElement from './TextareaElement';
import RangeDatePickerElement from './RangeDatePickerElement';

const FormFields = ({ field }) => {
  return (
    <React.Fragment>
      {!field.hidden && (
        <FormGroup>
          {field.label && !field.hideLabel && (
            <Label className={`form-label ${field.labelClass ? field.labelClass : ''}`}>
              {field.label} {field.mandatory ? <span style={{ color: '#f06548' }}>*</span> : null}
            </Label>
          )}
          {field.type === 'workspace' && <WorkspaceElement {...field} />}
          {field.type === 'rangedatepicker' && <RangeDatePickerElement {...field} />}
          {field.type === 'datepicker' && <DatePickerFormElement {...field} />}
          {(field.type === 'text' || field.type === 'number' || field.type === 'file') && <InputElement {...field} />}
          {field.type === 'password' && <PasswordElement {...field} />}
          {field.type === 'select' && <SelectFormElement {...field} />}
          {field.type === 'textarea' && <TextareaElement {...field} />}
          {field.type === 'texteditor' && <TextEditorElement {...field} />}
        </FormGroup>
      )}
    </React.Fragment>
  );
};

export default FormFields;
