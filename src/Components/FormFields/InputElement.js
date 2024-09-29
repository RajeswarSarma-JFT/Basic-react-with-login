import React, { useState } from 'react';
import { Input, FormFeedback } from 'reactstrap';

const InputElement = (props) => {
  const {
    id,
    placeholder,
    className,
    readonly,
    email,
    type,
    disabled,
    isTouched,
    onChange,
    onBlur,
    invalid,
    mandatory,
    hidden,
    name,
    value,
    errormessage,
    accept,
  } = props;

  const [fileName, setFileName] = useState('Choose file*');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange(event);
    } else {
      setFileName('Choose file*');
    }
  };

  return (
    <div className="mb-2">
      {type === 'file' ? (
        <>
          <div className="multiple-file-field d-flex">
            <Input
              id={id}
              type={type}
              name={name}
              className={className}
              invalid={invalid}
              accept={accept}
              onChange={handleFileChange}
              onBlur={onBlur}
              placeholder={placeholder}
              readOnly={readonly}
              mandatory={mandatory ? 'true' : 'false'}
              autoComplete="off"
              istouched={isTouched}
              hidden={hidden}
              style={{ opacity: '0' }}
            />
            <label className={`d-flex custom-file-label text-muted`} id="fileName">
              {fileName}
            </label>
            <label htmlFor="fileInput" className="multiple-file-field-label">
              Browse Files
            </label>
          </div>
          <FormFeedback>{errormessage}</FormFeedback>
        </>
      ) : (
        <>
          <Input
            id={id}
            type={type}
            email={email ? 'true' : 'false'}
            invalid={invalid}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
            readOnly={readonly}
            mandatory={mandatory ? 'true' : 'false'}
            autoComplete="off"
            istouched={isTouched}
            hidden={hidden}
            disabled={disabled}
            className={`opacity-${disabled ? '50' : '100'}`}
          />
          <FormFeedback>{errormessage}</FormFeedback>
        </>
      )}
    </div>
  );
};
export default InputElement;
