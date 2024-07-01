import React, { useCallback, useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function setCookie(userResponse) {

  console.log(userResponse)

  const userDetails = JSON.stringify({
    userResponse
  });
  console.log(userDetails)
  console.log("before ",document.cookie)

  document.cookie = `userCookie=${encodeURIComponent(userDetails)}; path = /`;

  console.log("after ",document.cookie)
  console.log(decodeURIComponent(document.cookie))
  // document.cookie = `userCookie=${encodeURIComponent(userDetails)}; path = /users/profile`;
  // document.cookie = `userCookie=${encodeURIComponent(userDetails)}; path = /users/history`;
  // document.cookie = `userCookie=${encodeURIComponent(userDetails)}; path = /video/:videoId`;
  // document.cookie = `userCookie=${encodeURIComponent(userDetails)}; path = /channel/:channelId`;
}

function getCookie() {

  const cookieName = "userCookie=";
  const decodedCookie = decodeURIComponent(document.cookie);

  const cookieData = decodedCookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith(cookieName));

  if (cookieData) {

    const userData = JSON.parse(cookieData.substring(cookieName.length));

    return userData;

  }
  return null;
}

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isUserValid, setIsUserValid] = useState(false)

  async function loginUser() {

    await fetch("http://localhost:8000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          username: username,
          password: password
        }
      )
    })
      .then((res) => res.json())
      .then((res) => {
        setCookie(res)
        if (res?.success) {
          setIsUserValid(true)
        }
        console.log(res);
      })
      .catch((error) => {
        console.warn("error is ", error)
      })

  }

  const optimizedLogin = useCallback(loginUser, [username, password])

  useEffect(() => {
    optimizedLogin()
    console.log(getCookie());
  }, [username, password])

  return (
    <div className='w-full h-[90vh] bg-zinc-900 flex items-center justify-center'>
      <div className="loginForm w-[30vw] h-[40vh] bg-zinc-800 flex flex-col gap-5 items-center justify-center rounded-lg">

        <div className="usernameContainer flex justify-center gap-4 items-center w-[80%]">
          <label className='text-white text-[3vh]' htmlFor="username">Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className='bg-zinc-700 rounded text-white text-[2.5vh] px-3 py-1 focus:outline-none'
            type="text"
            name="username"
            id="username"
            required
          />
        </div>

        <div className="passwordContainer flex justify-center gap-4 items-center w-[80%]">
          <label className='text-white text-[3vh]' htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='bg-zinc-700 rounded text-white text-[2.5vh] px-3 py-1 focus:outline-none'
            type="password"
            name="password"
            id="password"
            required
          />
        </div>

        <NavLink
          onClick={optimizedLogin}
          to={`${isUserValid ? "/users/profile" : "/"}`}
          className="submitButton w-[10vw] h-[5vh] bg-zinc-900 text-white mt-[5vh] flex items-center justify-center rounded hover:bg-white hover:text-black"
        >
          <h1 className='text-[3vh]'>Submit</h1>
        </NavLink>

      </div>
    </div>
  )
}

export default Login

export {
  setCookie,
  getCookie
}