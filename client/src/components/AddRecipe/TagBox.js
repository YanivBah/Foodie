const TagBox = ({ values, setValues, tag }) => {
  const removeTag = () => {
    const newValue = { ...values };
    newValue.tags = newValue.tags.filter((newTag) => newTag !== tag);
    setValues(newValue);
  };

  return (
    <div className="tag">
      <p>{tag}</p>
      <span className="material-icons" onClick={removeTag}>
        clear
      </span>
    </div>
  );
};

export default TagBox;
