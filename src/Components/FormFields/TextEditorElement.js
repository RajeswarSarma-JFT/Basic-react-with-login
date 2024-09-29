import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditorElement = (props) => {
  const { name, errormessage, invalid, isTouched, onReady, mandatory, hidden, onChange, value, placeholder } = props;

  return (
    <div>
      <ReactQuill
        theme="snow"
        id={name}
        value={value}
        hidden={hidden}
        onChange={onChange}
        onReady={onReady}
        istouched={isTouched}
        mandatory={mandatory ? 'true' : 'false'}
        placeholder={placeholder}
      />
      {invalid && <span className="invalid-feedback d-block">{errormessage}</span>}
    </div>
  );
};
export default TextEditorElement;
