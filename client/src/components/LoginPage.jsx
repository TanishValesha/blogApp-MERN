import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const LoginPage = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState();
  const {setUserInfo} = useContext(UserContext)

  async function login(e){
    e.preventDefault();
    const response = await fetch("http://localhost:3000/login", {
      method: 'POST',
      body: JSON.stringify({userName, password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    if(response.status === 200){
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
        setRedirect(true);
      })
    } else {
      alert('Wrong Credentials')
      setRedirect(false);
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <>
    <h1 className="flex justify-center items-center text-[50px] font-bold">Login</h1>
    <form onSubmit={login} className='m-auto block flex flex-col px-36 py-24'>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Username' className='mb-4 rounded border-2 py-1 text-left max-w-400 '/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='mb-4 rounded border-2 py-1 text-left max-w-400 '/>
        <button className='mt-4 px-24 py-2 bg-slate-600 text-white rounded'>Login</button>
    </form>
    </>
  )
}

export default LoginPage