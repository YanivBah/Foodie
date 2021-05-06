const BasicInput = ({ id, label, values, setValues, whatToChange }) => {

  const handleChange = (e) => {
    const newValue = { ...values };
    newValue[whatToChange] = e.target.value;
    setValues(newValue);
  }

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} value={values[whatToChange]} onChange={handleChange} />
    </>
  );
};

export default BasicInput;
