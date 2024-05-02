/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Post from "../../Post";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/post").then(response => {
      response.json().then(posts => {
        setPosts(posts);
        console.log(posts);
      });
    });
  }, []);

  window.addEventListener("load", ev => {
    alert("page fully loaded");
  });
  // eslint-disable-next-line react/jsx-key
  return <>{posts.length > 0 && posts.map(post => <Post {...post} />)}</>;
}
