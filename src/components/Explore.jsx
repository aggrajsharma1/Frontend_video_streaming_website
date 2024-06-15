import React, { useEffect, useState } from 'react'
import { getCookie } from './Login.jsx'
import { NavLink, useLoaderData } from 'react-router-dom'

async function fetchOwnerName(channelId) {

  const response = await fetch(`http://localhost:8000/api/v1/users/channel/${channelId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${getCookie()?.userResponse.data.accessToken}`,
      "Content-Type": "application/json"
    },
    credentials: "include"
  })

  const channelDetails = await response.json()

  return await channelDetails?.data?.username

}

function Explore() {

  const videosToExplore = useLoaderData()?.data
  // console.log(videosToExplore);

  return (
    <>
      <div className='w-full flex flex-wrap gap-4 px-5'>
        {
          videosToExplore.map((videoDetails, index) => (
            <NavLink to={`/video/${videoDetails?._id}`} key={index} className="video text-white p-2 w-[18vw] rounded hover:bg-zinc-800">
              <div className="thumbnail object-cover object-top overflow-hidden rounded">
                <img src={videoDetails?.thumbnail} alt="thumbnail" />
              </div>

              {videoDetails?.title}<br />
              {/* {videoDetails?.owner} <br />' */}
              <span className='text-sm text-zinc-400'>
                {videoDetails?.views} views&nbsp;&bull;&nbsp;
                {(videoDetails?.createdAt).replaceAll("-", "/").substring(0, 10)}
              </span>
            </NavLink>
          ))
        }
      </div>
    </>
  )
}

export default Explore

export const exploreSectionLoader = async function () {
  const response = await fetch("http://localhost:8000/api/v1/videos/explore", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${getCookie()?.userResponse?.data?.accessToken}`,
      "Content-type": "application/json"
    }
  })

  const videos = await response.json()

  // const videosToExplore = videos?.data

  // await videosToExplore.map(async (videoDetails) =>
  //   videoDetails.owner = await fetchOwnerName(videoDetails.owner)
  // )

  // console.log(videosToExplore);

  return await videos

}