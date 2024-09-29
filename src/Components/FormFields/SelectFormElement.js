import SelectElement from 'Components/Common/SelectComponents/SelectElement';

const SelectFormElement = (props) => {
  const { invalid, errormessage } = props;

  return (
    <div>
      <SelectElement {...props} />
      {invalid && <span className="invalid-feedback d-block">{errormessage}</span>}
    </div>
  );
};
export default SelectFormElement;
