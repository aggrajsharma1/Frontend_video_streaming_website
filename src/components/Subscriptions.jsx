import React from 'react'
import Header from './Header.jsx'

function Subscriptions() {
  return (
    <>
      <Header />

      <div className="mainContainer w-full bg-zinc-800 flex justify-evenly items-start flex-wrap">
        <div className="channelContainer w-[30vw] h-[25vh] bg-zinc-900 mt-[1.5%] rounded-xl flex items-center justify-center gap-3">
          <div className="avatarImageContainer w-28 h-28 bg-red-400 rounded-full"></div>
          <div className="channelDetailsContainer w-60 h-28 flex flex-col justify-center gap-2 px-5 text-white">
            <span>Channel_Name</span>
            <span>Subscribers</span>
            <span>Created_On</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Subscriptions