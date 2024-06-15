import React, { useEffect, useRef, useState } from 'react'
import { useParams, NavLink, useLoaderData } from 'react-router-dom';
import { getCookie } from './Login.jsx'
import MenuButton from './MenuButton/MenuButton.jsx'


import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { GiShare } from "react-icons/gi";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";


function WatchPage() {

  const [videoDetails, setVideoDetails] = useState({})
  const [channelDetails, setChannelDetails] = useState({})
  const [isVideoLiked, setIsVideoLiked] = useState(false)
  const [isChannelSubscribed, setIsChannelSubscribed] = useState(false)
  const [isUserOwnerOfChannel, setIsUserOwnerOfChannel] = useState(false)
  const [shareText, setShareText] = useState("Share")
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const videoId = useParams().videoId
  const videosToExplore = useLoaderData()?.data

  function like() {
    fetch(`http://localhost:8000/api/v1/video/${videoId}/like`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getCookie()?.userResponse.data.accessToken}`,
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(() => {
        setIsVideoLiked(!isVideoLiked)
      })

  }

  function subscribe() {

    fetch(`http://localhost:8000/api/v1/subscriptions/channel/${videoDetails?.data?.video?.owner}/subscribe`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getCookie()?.userResponse.data.accessToken}`,
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then((res) => res.json())
      .then(() => {
        setIsChannelSubscribed(!isChannelSubscribed)
      })

  }

  function share() {
    navigator.clipboard.writeText(`http://localhost:5173/video/${videoDetails?.data?.video?._id}`)
    setShareText("Copied !")
    setTimeout(() => {
      setShareText("Share")
    }, 3000)
  }

  function fetchChannelDetails(channelId) {

    fetch(`http://localhost:8000/api/v1/users/channel/${channelId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getCookie()?.userResponse.data.accessToken}`,
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => setChannelDetails(res))
  }

  function handlePlayAndPause() {
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
    else {
      videoRef.current.play()
      setIsPlaying(true)
    }
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

    // checking if video is liked

    fetch(`http://localhost:8000/api/v1/video/${videoId}/isVideoLiked`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getCookie()?.userResponse.data.accessToken}`,
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        setIsVideoLiked(res.liked)
      })

    // fetching video details

    fetch(`http://localhost:8000/api/v1/videos/watch/${videoId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getCookie()?.userResponse.data.accessToken}`,
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        setVideoDetails(res)
        // fetching channelDetails

        fetchChannelDetails(res?.data?.video?.owner)

        // checking if the user and channel are same

        checkIfUserIsOwnerOfChannel(res?.data?.owner)

        // checking if channel is subscribed

        fetch(`http://localhost:8000/api/v1/subscriptions/channel/${res?.data?.video?.owner}/isSubscribed`, {
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
    <>
      {/* <MenuButton /> */}
      <div className='mainContainer w-full bg-zinc-900 min-h-screen flex gap-7 justify-center pt-6'>

        <div className="videoInfoContainer w-[60vw] h-full text-white rounded overflow-hidden ">

          <div className="videoContainer relative w-full h-full rounded overflow-hidden">
            <div className="videoPlayer w-full h-full rounded overflow-hidden">
              <video
                className='w-full'
                src={videoDetails?.data?.video?.videoFile}
                ref={videoRef}
                autoPlay
                loop
              // onClick={handlePlayAndPause}
              />
              <div
                className="absolute top-0 w-full h-full"
                onClick={handlePlayAndPause}
              >
              </div>
            </div>
          </div>

          <div className="videoTitle px-4 py-2 flex items-center justify-between">

            {videoDetails?.data?.video?.title}

          </div>

          <div className="divider bg-zinc-800 h-[1px]"></div>

          <div className="videoDetails flex items-center justify-between px-4 gap-4 py-1">

            <div className="channelDetails flex items-center gap-4">
              <NavLink className="flex items-center gap-4"
                to={`/channel/${videoDetails?.data?.video?.owner}`}
              >

                <div className={`avatar w-[3vw] h-[3vw] bg-zinc-600 rounded-full flex object-center overflow-hidden`}>
                  <img src={channelDetails?.data?.avatar} alt="" />
                </div>

                <span className='hover:text-zinc-300'>
                  {videoDetails?.data?.owner} <br />
                  <span className='text-sm text-zinc-400'>{channelDetails?.data?.subscribersCount} subscribers</span>
                </span>

              </NavLink>

              <div className="subscribeButton cursor-pointer w-fit" onClick={subscribe}>
                <button
                  className={`px-3 py-1 rounded-sm ${isUserOwnerOfChannel ? "hidden" : ""} ${isChannelSubscribed ? "border-zinc-500 border-[1px]" : "bg-red-600 hover:bg-red-700 active:bg-red-900"}`}
                >
                  {
                    isChannelSubscribed ? "Subscribed" : "Subscribe"
                  }
                </button>
              </div>
            </div>

            <div className="likeAndShareButton flex items-center gap-4">

              {/* <div className="likeButton cursor-pointer w-fit text-xl flex items-center gap-2 border-zinc-300 border-[1px] p-1 rounded-sm" onClick={like}>
                {
                  isVideoLiked ? <GoHeartFill className='text-white' /> : <GoHeart />
                }
                <div className='text-sm'>
                  {
                    isVideoLiked ? "Liked" : "Like"
                  }
                </div>
              </div> */}

              <div className="likeButton cursor-pointer w-fit text-xl flex items-center gap-2 py-2 px-3 rounded-sm border-[1px] border-zinc-600 hover:bg-zinc-700 active:bg-zinc-800" onClick={like}>
                {
                  isVideoLiked ? <FaThumbsUp className='text-white' /> : <FaRegThumbsUp />
                }
                <div className='text-sm'>
                  {
                    isVideoLiked ? "Liked" : "Like"
                  }
                </div>
              </div>

              <div className="shareButton cursor-pointer w-fit text-xl flex items-center gap-2 py-2 px-3 rounded-sm border-[1px] border-zinc-600 hover:bg-zinc-700 active:bg-zinc-800" onClick={share}>
                <GiShare />
                <div className='text-sm'>{shareText}</div>
              </div>

            </div>

          </div>

          <div className="divider bg-zinc-800 h-[1px]"></div>

          <div className="videoDescription px-4 py-2">
            <div className='text'>
              {Number(videoDetails?.data?.video?.views) - 1} views | Published on {(videoDetails?.data?.video?.createdAt)?.substring(0, 10)} <br />
            </div>
            <div className='descriptionText'>
              {videoDetails?.data?.video?.description}
            </div>
          </div>

        </div>

        <div className="videoSuggestions w-[25vw] h-full flex flex-col gap-2">
          {
            videosToExplore.map((videoDetails, index) => (
              <NavLink
                to={`/video/${videoDetails?._id}`}
                target='_blank'
                key={index}
                className="videoInfo text-white flex h-full p-2 gap-3 rounded hover:bg-zinc-800"
              >

                <div className="thumbnailContainer w-1/2">
                  <div className="thumbnail object-cover object-top overflow-hidden rounded">
                    <img src={videoDetails?.thumbnail} alt="thumbnail" />
                  </div>
                </div>

                <div className="videoInfo flex flex-col justify-center gap-3">
                  <span>{videoDetails?.title}</span>
                  {/* <span className='text-sm'>{(videoDetails?.description).substring(0, 14)}...</span> */}
                  <span className='text-sm'>{videoDetails?.views} views</span>
                  <span className='text-sm'>Published on {(videoDetails?.createdAt).replaceAll("-", "/").substring(0, 10)}</span>
                </div>

              </NavLink>
            ))
          }
        </div>

      </div>
    </>
  )
}

export default WatchPage
