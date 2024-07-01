import React, { useEffect, useState, useCallback } from 'react'
import { NavLink, useLoaderData } from 'react-router-dom'
import { setCookie, getCookie } from './Login.jsx';

function Header() {

  const [isUserLoggedOut, setIsUserLoggedOut] = useState(false)

  // async function logout() {

  //   const response = await fetch("http://localhost:8000/api/v1/users/logout", {
  //     method: "POST",
  //     headers: {
  //       "Authorization": `Bearer ${getCookie()?.userResponse.data.accessToken}`,
  //       "Content-Type": "application/json"
  //     },
  //     credentials: "include"
  //   })

  //   const logoutDetails = await response.json()

  //   setCookie(logoutDetails)

  //   if (logoutDetails.success) {
  //     setIsUserLoggedOut(true)
  //   }

  // }

  // const optimizedLogout = useCallback(logout, [])


  // testing logout by expiring cookies

  async function logout() {

    const response = await fetch("http://localhost:8000/api/v1/users/logout", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getCookie()?.userResponse.data.accessToken}`,
        "Content-Type": "application/json"
      },
      credentials: "include"
    })

    const logoutDetails = await response.json()

    setLogoutCookie(logoutDetails)

    if (logoutDetails.success) {
      setIsUserLoggedOut(true)
    }

  }

  function setLogoutCookie(userResponse) {
    const userDetails = JSON.stringify({
      userResponse
    });
    document.cookie = `userCookie=${encodeURIComponent(userDetails)}; path = /; expires=Thu, 18 Dec 2013 12:00:00 UTC`;
    // document.cookie = `userCookie=${encodeURIComponent(userDetails)}; path = /users/profile; expires=Thu, 18 Dec 2013 12:00:00 UTC`;
    // document.cookie = `userCookie=${encodeURIComponent(userDetails)}; path = /users/history; expires=Thu, 18 Dec 2013 12:00:00 UTC`;
    // document.cookie = `userCookie=${encodeURIComponent(userDetails)}; path = /video/:videoId; expires=Thu, 18 Dec 2013 12:00:00 UTC`;
    // document.cookie = `userCookie=${encodeURIComponent(userDetails)}; path = /channel/:channelId; expires=Thu, 18 Dec 2013 12:00:00 UTC`;
  }

  const optimizedLogout = useCallback(logout, [])

  return (
    <div className="mainContainer sticky top-0 z-50">
      <div className='header text-white bg-zinc-900 w-full flex justify-between items-center py-4 px-5'>

        <div className="headerList flex items-center">

          <ul className='flex items-center gap-1 justify-center text-lg'>

            {/* Home Page */}

            <li>
              <NavLink
                to="/users/profile"

                className={({ isActive }) =>
                  `${isActive ? "bg-zinc-700" : "text-white"} rounded-sm hover:text-white hover:bg-zinc-700 px-3`
                }

              >
                Home
              </NavLink>
            </li>

            {/* History Page */}

            <li>
              <NavLink
                to="/users/history"

                className={({ isActive }) =>
                  `${isActive ? "bg-zinc-700" : "text-white"} rounded-sm hover:text-white hover:bg-zinc-700 px-3`
                }

              >
                History
              </NavLink>
            </li>

            {/* Explore Page */}

            <li>
              <NavLink
                to="/videos/explore"

                className={({ isActive }) =>
                  `${isActive ? "bg-zinc-700" : "text-white"} rounded-sm hover:text-white hover:bg-zinc-700 px-3`
                }

              >
                Explore
              </NavLink>
            </li>

            {/* Upload Page */}

            <li>
              <NavLink
                to="/upload"

                className={({ isActive }) =>
                  `${isActive ? "bg-zinc-700" : "text-white"} rounded-sm hover:text-white hover:bg-zinc-700 px-3`
                }

              >
                Upload
              </NavLink>
            </li>

          </ul>

        </div>

        <div className='w-[20vw] flex items-center justify-end gap-1'>

          {/* Register Route */}

          <NavLink
            to="/register"
            className={`registerButton hover:bg-zinc-100 hover:text-zinc-900 px-3 rounded-sm`}
          >
            Register
          </NavLink>

          {/* Logout Route */}

          <NavLink
            onClick={optimizedLogout}
            // to={`${isUserLoggedOut ? "/users/history" : "/"}`}
            to="/"
            className='logoutButton hover:bg-zinc-100 hover:text-zinc-900 px-3 rounded-sm'

          >
            Login / Logout
          </NavLink>

        </div>

      </div>

      <div className="divider bg-zinc-800 h-[1px] mx-5"></div>
    </div>
  )
}

export default Header