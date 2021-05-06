const Step = ({ number, values, setValues }) => {

  const deleteStep = () => {
    const newSteps = {...values};
    delete newSteps.steps[`step${number}`];
    setValues(newSteps);
  }

  const createDeleteIcon = () => {
    const length = Object.keys(values.steps).length;
    if (number === length && number !== 1) {
      return (
        <span className="material-icons" onClick={deleteStep}>
          delete_forever
        </span>
      );
    }
    return null;
  };

  const handleChange = (e) => {
    const newValue = { ...values };
    values.steps[`step${number}`] = e.target.value;
    setValues(newValue);
  }

  return (
    <div className="step">
      <details>
        <summary>
          Step {number}
          {createDeleteIcon()}
        </summary>
        {/* <label htmlFor={`step${number}`}> */}
        {/* <span>Step {number}</span> */}
        {/* {createDeleteIcon()} */}
        {/* </label> */}
        <textarea
          id={`step${number}`}
          value={values.steps[`step${number}`]}
          onChange={handleChange}
        ></textarea>
      </details>
    </div>
  );
};

export default Step;
