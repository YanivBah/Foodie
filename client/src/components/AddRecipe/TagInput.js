const TagInput = ({values, setValues}) => {

  const addTag = () => {
    const newValue = { ...values };
    newValue.tags = [...newValue.tags, values.tagInput];
    newValue.tagInput = '';
    setValues(newValue);
  };

  const handleChange = (e) => {
    const newValue = { ...values };
    newValue.tagInput = e.target.value;
    setValues(newValue);
  }

  const addIcon = () => {
    if (values.tagInput.length >= 3 && values.tags.length < 3) {
      return (
        <span className="material-icons" onClick={addTag}>
          add_circle_outline
        </span>
      );
    }
    return null;
  }

  return (
    <>
      <label htmlFor="tags">Tags</label>
      <div className="tag-input">
        <input
          type="text"
          id="tags"
          value={values.tagInput}
          disabled={values.tags.length === 3 ? true : false}
          placeholder={values.tags.length === 3 ? "You can only add 3 tags" : ""}
          onChange={handleChange}
        />
        {addIcon()}
      </div>
    </>
  );
};

export default TagInput;
