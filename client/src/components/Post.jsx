import React from "react";
import { Link } from "react-router-dom";

const Post = ({ title, summary, author, content, cover, id }) => {
  return (
    <div className="px-12">
      <div className="grid grid-cols-2 gap-10 mb-16">
        <div>
          <Link to={`/post/${id}`}>
            <img
              className="rounded"
              src={"http://localhost:3000/" + cover}
              alt="Image"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <Link to={`/posts/${id}`}>
            <h2 className="font-bold text-2xl">{title}</h2>
          </Link>
          <div className="flex gap-2 text-sm text-slate-700	">
            <p className="font-bold">{author.userName}</p>
            <time className="font-normal">2023-01-06 16:45</time>
          </div>
          <p className="text-base">{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
