/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import { format } from "date-fns";
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { usercontext } from "../UserContextProvider";

function PostPage() {
  // eslint-disable-next-line no-unused-vars
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  const { userInfo } = useContext(usercontext);

  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`).then(response => {
      response.json().then(postInfo => {
        setPostInfo(postInfo);
      });
    });
  }, []);
  if (!postInfo) return "";

  const userid = userInfo?.id;
  return (
    <div className="Post-page">
      <h1> {postInfo.title} </h1>
      <div className="userInfo">
        <a className="author"> Posted by @{postInfo.author.username} </a>

        <time>
          {" "}
          {format(new Date(postInfo.createdAt), "MMM , d , yyy HH:mm")}{" "}
        </time>
      </div>

      {postInfo.author._id === userid && (
        <div className="edit-row">
          <Link className="btn " to={`/edit/${postInfo._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>{" "}
            Edit This Post{" "}
          </Link>
        </div>
      )}
      <div className="image">
        <img
          src={`http://localhost:3000/${postInfo.file.replace("uploads", "")}`}
        />
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
    </div>
  );
}

export default PostPage;
