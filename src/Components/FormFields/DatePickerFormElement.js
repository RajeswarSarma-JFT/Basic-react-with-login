import DatePickerElement from 'Components/Common/DatePickerElement';

const DatePickerFormElement = (props) => {
  const { invalid, errormessage } = props;

  return (
    <div>
      <DatePickerElement {...props} />
      {invalid && <span className="invalid-feedback d-block">{errormessage}</span>}
    </div>
  );
};
export default DatePickerFormElement;
