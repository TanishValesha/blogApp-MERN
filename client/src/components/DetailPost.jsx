import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DetailPost = () => {
    const [postInfo, setPostInfo] = useState({});
    const {id} = useParams();
    useEffect(() => {
        fetch(`http://localhost:3000/posts/${id}`).then((response) => {
            response.json().then((detailPost) => {
                setPostInfo(detailPost);
            })
        })
        
    }, [])
  return (
    <div className='px-12 flex flex-col m-auto items-center min-h-full justify-center w-[60%] h-[60%]'>
        <h1 className='font-bold text-4xl text-center mb-5'>{postInfo.title}</h1>
        <div>
            <img className='rounded mb-10' src={`http://localhost:3000/${postInfo.cover}`} alt="Image" />
        </div>
        <p className='mb-10'><span className='font-bold text-2xl'>Summary:</span> {postInfo.summary}</p>
        <p dangerouslySetInnerHTML={{__html: postInfo.content}}></p>
    </div>
  )
}

export default DetailPost