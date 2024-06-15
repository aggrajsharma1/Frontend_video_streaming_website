import React, { useState } from 'react'

function Register() {

  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const [registerMessage, setRegisterMessage] = useState("")

  async function submit() {

    const formData = new FormData();

    formData.append('username', username);
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);
    formData.append('coverImage', coverImage);

    setRegisterMessage("Please Wait !")

    await fetch("http://localhost:8000/api/v1/users/register", {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((res) => {
        setRegisterMessage("User registered successfully")
      })
      .catch((error) => {
        console.warn("error is ", error)
        setRegisterMessage("username already exists")
      })
  }

  console.log(avatar)

  return (
    <div className='mainContainer w-full h-[80vh] bg-zinc-900 text-white p-10'>
      {/* <div className="registerBox w-[40%] h-[60%] bg-slate-400 rounded-lg flex flex-col items-center justify-center"> */}

      <div className="usernameContainer m-4">
        <label htmlFor="username">Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className='ml-5 bg-zinc-700 py-1 px-3 rounded-sm focus:outline-none'
          type="text"
          name="username"
          id="username"
        />
      </div>

      <div className="fullNameContainer m-4">
        <label htmlFor="fullName">Full Name</label>
        <input
          onChange={(e) => setFullName(e.target.value)}
          className='ml-5 bg-zinc-700 py-1 px-3 rounded-sm focus:outline-none'
          type="text"
          name="fullName"
          id="fullName"
        />
      </div>

      <div className="emailContainer m-4">
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className='ml-5 bg-zinc-700 py-1 px-3 rounded-sm focus:outline-none'
          type="email"
          name="email"
          id="email"
        />
      </div>

      <div className="passwordContainer m-4">
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className='ml-5 bg-zinc-700 py-1 px-3 rounded-sm focus:outline-none'
          type="password"
          name="password"
          id="password"
        />
      </div>

      <div className="avatarContainer m-4">
        <label htmlFor="avatar">Avatar</label>
        <input
          onChange={(e) => setAvatar(e.target.files[0])}
          className='ml-5'
          type="file"
          name="avatar"
          id="avatar"
          accept="image/*"
        />
      </div>

      <div className="coverImageContainer m-4">
        <label htmlFor="coverImage">Cover Image</label>
        <input
          onChange={(e) => setCoverImage(e.target.files[0])}
          className='ml-5'
          type="file"
          name="coverImage"
          id="coverImage"
          accept="image/*"
        />
      </div>

      <div className="submitButton m-4">
        <button className='bg-zinc-700 px-4 py-2 rounded-sm hover:bg-white hover:text-black' onClick={submit}>Register</button>
      </div>

      <div className="registerMessageContainer flex items-center">
        {registerMessage}
        <img className={`w-20 invert ${registerMessage === "Please Wait !" ? "inline" : "hidden"}`} src="https://s3.scoopwhoop.com/anj/loading/594155876.gif" alt="" />
      </div>

      {/* </div> */}
    </div>
  )
}

export default Register