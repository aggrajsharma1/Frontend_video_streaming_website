import React, { useState } from 'react'
import { redirect, useLoaderData } from 'react-router-dom'

function TestProfile() {

    const [username, setUsername] = useState("")

    fetch("http://localhost:8000/api/v1/users/current-user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
        .then(res => res.json())
        .then(res => setUsername(res.data.username))

    return (
        <div className='text-white'>{username}</div>
    )
}

export default TestProfile

export const testloader = async () => {
    return await fetch("http://localhost:8000/api/v1/users/current-user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
        .then(res => res.json())
        .catch(() => redirect("/test"))
    
    return null
}