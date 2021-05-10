import moment from 'moment';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import './CommentView.css';
import Context from "../../Context";

const momentConfig = {
  sameDay: "HH:mm",
  nextDay: "[Tomorrow]",
  nextWeek: "dddd",
  lastDay: "[Yesterday]",
  lastWeek: "[Last] dddd",
  sameElse: "DD/MM/YYYY",
};

export const CommentView = ({comment}) => {
  const { user } = useContext(Context);
  const getDate = () => {
    const timestamp = comment._id.toString().substring(0, 8);
    const date = new Date(parseInt(timestamp, 16) * 1000);
    return date;
  }

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
              <span className="material-icons red">delete</span>
              <span className="material-icons blue">edit</span>
            </div>
          )}
        </div>
        <div className="content">
          <p>{comment.content}</p>
        </div>
      </div>
    </div>
  );
}