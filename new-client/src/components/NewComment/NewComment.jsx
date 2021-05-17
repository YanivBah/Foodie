import axios from 'axios';
import React, { useContext, useState } from 'react'
  import Context from "../../Context";
import { Button } from '../Button/Button';
import { Textarea } from '../Textarea/Textarea'
import './NewComment.css';

export const NewComment = ({ recipeID, setComments, setCommentsLength }) => {
  const { user } = useContext(Context);
  const [value, setValue] = useState({textarea: ""});

  const addComment = async () => {
    const body = { id: recipeID ,content: value.textarea };
    try {
      const { data } = await axios.post("/api/comment/add", body);
      setComments((prev) => {
        const newComment = [...prev];
        newComment.unshift(data);
        return newComment;
      });
      setCommentsLength((prev) => prev+1);
    } catch (e) {
      
    }
  };

  return (
    <div className="new-comment">
      <h4>Add a new comment</h4>
      <Textarea
        name="newcomment"
        label=""
        placeholder="Type your comment"
        values={value}
        onChange={setValue}
        whatToChange="textarea"
        maxLength="100"
        rows="3"
      />
      <Button text="Send" onClick={addComment} />
    </div>
  );
};