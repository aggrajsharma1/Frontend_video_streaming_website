import React, { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom';
import { getCookie } from './Login.jsx';

function Profile() {

  const userDetails = useLoaderData()

  return (
    <div className='mainContainer w-full bg-zinc-900 h-[90vh] flex justify-center items-center'>
      <div className="profilePage w-[40vw] h-[50vh] bg-zinc-800 text-white p-6 rounded-xl">

        Username : {userDetails?.data?.username} <br />
        Email : {userDetails?.data?.email} <br />
        Full Name : {userDetails?.data?.fullName} <br />
        Created At : {(userDetails?.data?.createdAt).substring(0, 10)} <br />

      </div>
    </div>
  )
}

export default Profile

export const userInfoLoader = async function () {

  const username = getCookie()?.userResponse?.data.user.username

  const response = await fetch(`http://localhost:8000/api/v1/users/current-user`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${getCookie()?.userResponse.data.accessToken}`,
      "Content-Type": "application/json"
    },
    credentials: "include"
  })

  const userInfo = await response.json()

  return userInfo
}