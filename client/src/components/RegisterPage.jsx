import React, { useState } from "react";

const RegisterPage = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  async function register(e){
    e.preventDefault();
    const response = await fetch("https://blogapp-mern-server2.onrender.com/register", {
      method: 'POST',
      body: JSON.stringify({userName, password}),
      headers: {'Content-Type': 'application/json'},
    })
    if(response.status === 501){
      alert("Registration Succesfully");
    } else {
      alert("Registration Unsuccesfully");
    }
  }
  return (
    <>
      <h1 className="flex justify-center items-center text-[50px] font-bold">Register</h1>
      <form onSubmit={register} className="m-auto block flex flex-col  px-36 py-24">
        <input
          type="text"
          placeholder="Username"
          className="mb-4 rounded border-2 py-1 text-left max-w-400 "
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 rounded border-2 py-1 text-left max-w-400 "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="mt-4 px-24 py-2 bg-slate-600 text-white rounded">
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterPage;
