import moment from 'moment';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import './CommentView.css';
import Context from "../../Context";
import axios from 'axios';
import { Textarea } from '../Textarea/Textarea';

const momentConfig = {
  sameDay: "HH:mm",
  nextDay: "[Tomorrow]",
  nextWeek: "dddd",
  lastDay: "[Yesterday]",
  lastWeek: "[Last] dddd",
  sameElse: "DD/MM/YYYY",
};

export const CommentView = ({ comment, setComments, setCommentsLength }) => {
  const { user } = useContext(Context);
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState({ textarea: comment.content });
  const getDate = () => {
    const timestamp = comment._id.toString().substring(0, 8);
    const date = new Date(parseInt(timestamp, 16) * 1000);
    return date;
  };

  const handleEdit = () => {
    setEditable((prev) => !prev);
    setValue(prev => {
      const oldValue = {...prev};
      oldValue.textarea = comment.content;
      return oldValue;
    });
  };

  const saveEdit = async () => {
    const body = {id: comment._id, content: value.textarea};
    console.log(body);
    try {
      await axios.patch("/api/comment/edit", body, {
        headers: { Authorization: `Bearer ${user.get.token}` }
      });
      setComments(prev => {
        const comments = [...prev];
        const currentComment = comments.find(com => com._id === comment._id);
        currentComment.content = value.textarea;
        return comments;
      });
      setEditable((prev) => !prev);
    } catch (e) {
      
    }
  }

  const deleteComment = async () => {
    const body = {
      id: comment._id,
    };
    try {
      await axios.delete("/api/comment/delete", {
        headers: { Authorization: `Bearer ${user.get.token}` },
        data: body
      });
      setComments(prev => {
        return prev.filter(com => com !== comment)
      });
      setCommentsLength(prev => prev-1);

    } catch (e) {

    }
  };

  return (
    <div className="comment">
      <img
        src="https://yt3.ggpht.com/ytc/AAUvwngw35YY8vYI86RTOoEGafSxEjghjzTcKw3LbMyZ=s900-c-k-c0x00ffffff-no-rj"
        alt="Literally avatar"
      />
      <div className="details">
        <div className="meta">
          <p>
            <Link to={`/profile/${comment.user.username}`}>
              {comment.user.username}
            </Link>
            <span>{moment().calendar(getDate(), momentConfig)}</span>
          </p>
          {comment.user._id === user.get?.user?._id && (
            <div className="controls">
              {!editable && (
                <>
                  <span className="material-icons red" onClick={deleteComment}>
                    delete
                  </span>
                  <span className="material-icons blue" onClick={handleEdit}>
                    edit
                  </span>
                </>
              )}
              {editable && (
                <>
                  <span className="material-icons blue" onClick={saveEdit}>
                    save
                  </span>
                  <span className="material-icons red" onClick={handleEdit}>
                    cancel
                  </span>
                </>
              )}
            </div>
          )}
        </div>
        <div className="content">
          {!editable && <p>{comment.content}</p>}
          {editable && (
            <Textarea
              name="editcomment"
              label="Edit your comment"
              placeholder="Type your comment"
              values={value}
              onChange={setValue}
              whatToChange="textarea"
              maxLength="100"
              rows="2"
            />
          )}
        </div>
      </div>
    </div>
  );
};