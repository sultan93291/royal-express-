// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

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

function CreatePost() {
  const [title, settitle] = useState("");
  const [summary, setsummary] = useState("");
  const [file, setfiles] = useState("");
  const [content, setcontent] = useState("");
  const [redirect, setredirect] = useState(false);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("file", file[0]);
    data.set("content", content);
    ev.preventDefault();
    const response = await fetch("http://localhost:3000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    await response.json();
    if (response.status !== 200) {
      alert("Please Provide all requested parameters");
    } else {
      setredirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={createNewPost} className="create w-100 h-100">
      <h1 id="h1">Create A Post</h1>
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
      <button className="mt-4 btn btn-success"> Tap To Create A Post </button>
    </form>
  );
}

export default CreatePost;
