import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext';

const Header = () => {
  const {setUserInfo, userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('https://blogapp-mern-server2.onrender.com/profile', {
      credentials: 'include'
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })
  }, [])

  function logOut(){
    fetch('http://localhost:3000/logOut', {
      credentials: 'include',
      method: 'POST'
    })
    setUserInfo(null);
  }

  const userName = userInfo?.userName
  return (
    <header className="px-12 py-4 mb-10">
        <nav className="flex justify-between">
          <div>
            <Link to="/" className="font-bold text-lg">
              MyBlogs
            </Link>
          </div>
          <div className="space-x-8">
          {userName ? 
            <>
              <Link to="/create" className="text-lg font-medium">Create New Post</Link>
            </>:
            <Link to="/login" className="text-lg font-medium">
              Login
            </Link>
        }
        {userName ? 
            <>
              <Link onClick={logOut} className="text-lg font-medium">LogOut</Link>
            </>:
            <Link to="/register" className="text-lg font-medium">
            Register
          </Link>
        }
          </div>
        </nav>
      </header>
  )
}

export default Header
