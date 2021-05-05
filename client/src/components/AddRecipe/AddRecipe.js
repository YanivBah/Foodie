import { useEffect, useRef, useState } from "react";
import './AddRecipe.css';

const AddRecipe = () => {
  const [tags, setTags] = useState([]);
  const [instructions, setInstructions] = useState(['']);
  const [ingredients, setIngredients] = useState([]);
  const [tagsValue, setTagsValue] = useState('');

  const stepsRef = useRef({});

  const addTag = () => {
    setTags((prevTags) => [...prevTags, tagsValue]);
    setTagsValue('');
  };
  const addStep = () => setInstructions(prev => [...prev, '']);

  const viewTags = () => {
    if (tags.length > 0) {
      return tags.map((tag, index) => {
        return (
          <div className="tag" key={index}>
            <p>{tag}</p>
            <span className="material-icons" 
            onClick={() => {
              const splicedArray = [...tags];
              splicedArray.splice(index,1);
              setTags(splicedArray);
            }}>
              clear</span>
          </div>
        );
      })
    }
  }

  useEffect(() => {
    if (tags.length === 3) {
      setTagsValue('');
    }
  },[tags])

  return (
    <div className="add-recipe">
      <h1>Add new recipe</h1>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" />
      <label htmlFor="description">Description</label>
      <textarea id="description" />
      <h3>Instructions</h3>
      <span>Add new step</span>
      <span className="material-icons" onClick={addStep}>
        add_circle_outline
      </span>
      {instructions.map((step, index) => {
        // refs[`step${index + 1}`] = useRef(null);
        return (
          <div className="step" key={index}>
            <label htmlFor={`step${index + 1}`}>Step {index + 1}</label>
            <textarea
              id={`step${index + 1}`}
              ref={(e) => (stepsRef.current[`step${index + 1}`] = e)}
            ></textarea>
          </div>
        );
      })}
      <label htmlFor="tags">Tags</label>
      <div className="tag-input">
        <input
          type="text"
          id="tags"
          value={tagsValue}
          onChange={(e) => setTagsValue(e.target.value)}
          disabled={tags.length === 3 ? true : false}
          placeholder={tags.length === 3 ? "You can only add 3 tags" : ""}
        />
        {tagsValue?.length >= 3 && tags.length < 3 ? (
          <span className="material-icons" onClick={addTag}>
            add_circle_outline
          </span>
        ) : null}
      </div>
      <div className="tags">{viewTags()}</div>
    </div>
  );
}

export default AddRecipe;
