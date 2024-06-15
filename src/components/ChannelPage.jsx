import React, { useEffect, useState } from 'react'
import { NavLink, useLoaderData, useParams } from 'react-router-dom';
import { getCookie } from './Login';

function ChannelPage() {

  const channelId = useParams().channelName
  const [channelDetails, setChannelDetails] = useState({})
  const [isChannelSubscribed, setIsChannelSubscribed] = useState(false)
  const [isUserOwnerOfChannel, setIsUserOwnerOfChannel] = useState(false)

  function subscribe() {

    fetch(`http://localhost:8000/api/v1/subscriptions/channel/${channelDetails?.data?._id}/subscribe`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getCookie()?.userResponse.data.accessToken}`,
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        setIsChannelSubscribed(!isChannelSubscribed)
      })
  }

  function checkIfUserIsOwnerOfChannel(channelName) {
    fetch(`http://localhost:8000/api/v1/users/current-user`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getCookie()?.userResponse.data.accessToken}`,
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        if (channelName === res?.data?.username) {
          setIsUserOwnerOfChannel(true)
        }
      })
  }

  useEffect(() => {

    fetch(`http://localhost:8000/api/v1/users/channel/${channelId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getCookie()?.userResponse.data.accessToken}`,
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        setChannelDetails(res)
        checkIfUserIsOwnerOfChannel(res?.data?.username)
        return res
      })
      .then((res) => {
        fetch(`http://localhost:8000/api/v1/subscriptions/channel/${res?.data?._id}/isSubscribed`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${getCookie()?.userResponse.data.accessToken}`,
            "Content-Type": "application/json"
          },
          credentials: "include"
        })
          .then((res) => res.json())
          .then((res) => {
            setIsChannelSubscribed(res.subscribed)
          })
      })

  }, [])

  return (
    <div className='mainContainer w-full bg-zinc-900 h-screen'>

      <div className="coverImage w-full h-[30vh] bg-zinc-800 object-fill object-top overflow-hidden">
        <img src={channelDetails?.data?.coverImage} alt="" />
      </div>

      <div className='flex items-center justify-between px-2 pt-2'>

        <div className='flex items-center gap-3'>
          <div className={`avatar w-[7vw] h-[7vw] bg-zinc-600 rounded-full flex object-center overflow-hidden`}>
            <img src={channelDetails?.data?.avatar} alt="" />
          </div>

          {/* Channel Details - Name and Subscribers */}

          <div className='text-white'>
            <span className='font-bolder text-[5vh]'>{channelDetails?.data?.username}</span> <br />
            <span className='text-zinc-300'>{channelDetails?.data?.subscribersCount} Subscribers</span>
          </div>
        </div>


        {/* Subscribe Button */}

        <button
          onClick={subscribe}
          className={`px-3 py-1 mt-3 rounded-sm text-white ${isChannelSubscribed ? "border-zinc-500 border-[1px]" : "bg-red-600 hover:bg-red-700 active:bg-red-900"} ${isUserOwnerOfChannel ? "hidden" : ""}`}
        >
          {
            isChannelSubscribed ? "Subscribed" : "Subscribe"
          }
        </button>

      </div>

      {/* Channel Details - Videos */}

      <div className='w-full p-2 flex gap-4'>
        {
          channelDetails?.data?.videos?.map((videoDetails, index) => (
            <NavLink
              to={`/video/${videoDetails?._id}`}
              key={index}
              className="h-full rounded p-2 hover:bg-zinc-800"
            >

              <div className="thumbnailContainer w-[17vw]">
                <div className="thumbnail object-cover object-top overflow-hidden rounded">
                  <img src={videoDetails?.thumbnail} alt="thumbnail" />
                </div>
              </div>

              <div className="videoInfo text-white">
                <span className='text-sm'>{videoDetails?.title}</span><br />
                {/* <span className='text-sm'>{(videoDetails?.description).substring(0, 14)}...</span> */}
                <span className='text-sm'>{videoDetails?.views} views</span>&nbsp;&bull;&nbsp;
                <span className='text-sm'>{(videoDetails?.createdAt).replaceAll("-", "/").substring(0, 10)}</span>
              </div>

            </NavLink>
          ))
        }
      </div>

    </div>
  )
}

export default ChannelPage