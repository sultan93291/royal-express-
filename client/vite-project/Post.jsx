/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line no-empty-pattern, react/prop-types
export default function Post({
  _id,
  title,
  summary,
  file,
  createdAt,
  author,
}) {
  return (
    <div className="Post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:3000/" + file.replace("uploads", "")} />
        </Link>
      </div>

      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2> {title} </h2>
        </Link>
        <p className="info">
          <a className="author"> {author.username} </a>
          <time> {format(new Date(createdAt), "MMM , d , yyy HH:mm")} </time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
