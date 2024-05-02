/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";
import { usercontext } from "../UserContextProvider";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

function Editpost() {
  const { setuserInfo, userInfo } = useContext(usercontext);
  const { id } = useParams();
  const [title, settitle] = useState("");
  const [summary, setsummary] = useState("");
  const [file, setfiles] = useState("");
  const [content, setcontent] = useState("");
  const [redirect, setredirect] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`).then(response => {
      response.json().then(postInfo => {
        settitle(postInfo.title);
        setsummary(postInfo.summary);
        setfiles(postInfo.file);
        setcontent(postInfo.content);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function updatePost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (data.set("file", file?.[0])) {
      data.set("file", file?.[0]);
    }
    ev.preventDefault();
    const response = await fetch("http://localhost:3000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    await response.json();
    if (response.status !== 200) {
      alert(`Unathorized request!`);
    } else {
      setredirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  
  return (
    <form onSubmit={updatePost} className="create w-100 h-100">
      <h1 id="h1"> Update The Post</h1>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={ev => {
          settitle(ev.target.value);
        }}
        className="form-control"
      />
      <input
        type="summary"
        placeholder="Summary"
        className="form-control"
        value={summary}
        onChange={ev => {
          setsummary(ev.target.value);
        }}
      />
      <input
        type="file"
        placeholder="image"
        onChange={ev => {
          setfiles(ev.target.files);
        }}
        className="input-form"
      />
      <ReactQuill
        value={content}
        onChange={ev => {
          setcontent(ev); //if not work then use ev only
        }}
        modules={modules}
        formats={formats}
      />
      <button className="mt-4 btn btn-success"> Tap To Update Post </button>
    </form>
  );
}

export default Editpost;
