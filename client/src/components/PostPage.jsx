import React, { useEffect, useState } from 'react'
import Post from './Post'

const PostPage = () => {
  const[posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('https://blogapp-mern-server2.onrender.com/posts').then(response => {
      response.json().then(posts => {
        setPosts(posts);
        console.log(posts)
      })
    })
  }, [])
  return (
    <div>
        {
          posts.length > 0 && posts.map(post => {
            return (
              <Post key={post._id} title={post.title} summary={post.summary} author={post.author} cover={post.cover} id={post._id}/>
            )
          })
        }
    </div>
  )
}

export default PostPage
