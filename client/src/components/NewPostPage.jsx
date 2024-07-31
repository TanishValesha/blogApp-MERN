import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom';


const NewPostPage = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState();
    const [redirect, setRedirect] = useState(false);
    async function createPost(e){
      const formData = new FormData();
      formData.set('title', title)
      formData.set('summary', summary)
      formData.set('content', content)
      formData.set('file', files[0])
      e.preventDefault();
      console.log(files)
      const response = await fetch("https://blogapp-mern-server2.onrender.com/posts", {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })
      if(response.ok){
        setRedirect(true);
      }
    }

    if(redirect){
      return <Navigate to={'/'} />
    }


  return (
    <form onSubmit={createPost} className='px-12'>
        <input type="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='mb-4 rounded border-2 py-1 text w-[100%]'/>
        <input type="summary" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder='Summary' className='mb-4 rounded border-2 py-1 w-[100%]'/>
        <input type="file" onChange={(e) => setFiles(e.target.files)} placeholder='Summary' className='mb-4 rounded border-2 py-1 w-[100%]'/>
        <ReactQuill value={content} onChange={(newValue) => setContent(newValue)}/>
        <button className='mt-4 px-24 py-2 bg-slate-600 text-white rounded w-[100%]'>Create Post</button>
    </form>
  )
}

export default NewPostPage
