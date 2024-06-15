import React, { useEffect } from 'react'
import { NavLink, useLoaderData } from 'react-router-dom';
import { getCookie } from './Login.jsx'

function History() {

  const userWatchHistory = useLoaderData()

  const watchHistoryArray = userWatchHistory?.data

  return (
    <div className='mainContainer w-full bg-zinc-900 h-[90vh] flex items-start gap-6 px-5 text-white'>

      {
        watchHistoryArray.map((video, index) => (
          <div className="videoInfoContainer rounded hover:bg-zinc-800 p-2" key={index}>

            <NavLink
              to={`/video/${video?._id}`}
            >

              <img
                className='w-[18vw] rounded'
                src={video?.thumbnail}
                alt={video?.title}
              />
              <span>{video?.title}</span> <br />
              <span>{video?.views} views</span>

            </NavLink>

          </div>
        ))
      }

    </div>
  )
}

export default History

export const watchHistoryInfoLoader = async function () {

  const response = await fetch(`http://localhost:8000/api/v1/users/history`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${getCookie()?.userResponse.data.accessToken}`,
      "Content-Type": "application/json"
    },
    credentials: "include"
  })

  const watchHistoryInfo = await response.json()

  return watchHistoryInfo
}