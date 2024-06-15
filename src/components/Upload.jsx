import React, { useState } from 'react'
import { getCookie } from './Login'

function Upload() {

  const [videoFile, setVideoFile] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [uploadMessage, setUploadMessage] = useState("")
  const [isVideoUploading, setIsVideoUploading] = useState(false)

  function upload() {
    const formData = new FormData();

    formData.append("title", title)
    formData.append("description", description)
    formData.append("isPublished", true)
    formData.append("videoFile", videoFile)
    formData.append("thumbnail", thumbnail)

    setUploadMessage("Please Wait !")
    setIsVideoUploading(true)

    // console.log(getCookie()?.userResponse.data.accessToken)

    fetch("http://localhost:8000/api/v1/videos/upload", {
      headers: {
        "Authorization": `Bearer ${getCookie()?.userResponse.data.accessToken}`,
      },
      credentials: "include",
      method: "POST",
      body: formData
    })
      .then((res) => {
        if (res.success) {
          setUploadMessage("Video Uploaded successfully")
          setIsVideoUploading(false)
        }
        else {
          setUploadMessage("Upload failed")
          setIsVideoUploading(false)
        }
      })
      .catch((error) => {
        console.warn("error is ", error)
        setUploadMessage("Upload failed")
        setIsVideoUploading(false)
      })

  }

  return (
    <div className='mainContainer w-full bg-zinc-900 h-[50vh] text-white px-8 py-4'>

      <div className="videoContainer flex items-center gap-4 mb-3">
        <label htmlFor="video">Video</label>
        <input
          type="file"
          name="video"
          id="video"
          accept='video/*'
          onChange={(e) => setVideoFile(e.target.files[0])}
        />
      </div>

      <div className="thumbnailContainer flex items-center gap-4 mb-3">
        <label htmlFor="thumbnail">Thumbnail</label>
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          accept='image/*'
          onChange={(e) => setThumbnail(e.target.files[0])}
        />
      </div>

      <div className="titleContainer flex items-center gap-4 mb-3">
        <label htmlFor="title">Title</label>
        <input
          className='bg-zinc-700 px-3 py-1 focus:outline-none rounded-sm w-full'
          type="text"
          name="title"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="descriptionContainer flex items-center gap-4 mb-3">
        <label htmlFor="description">Description</label>
        <textarea
          className='bg-zinc-700 px-3 py-1 focus:outline-none rounded-sm w-full h-[20vh]'
          name="description"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="public flex items-center gap-4 mb-3">
        <label htmlFor="public">This video will be set to Public</label>
        <input
          className='h-4 w-4'
          type="checkbox"
          name="public"
          id="public"
          checked
          disabled
        />
      </div>

      <div className="terms flex items-center gap-4 mb-3">
        <label htmlFor="terms">I agree to terms and conditions</label>
        <input
          className='h-4 w-4'
          type="checkbox"
          name="terms"
          id="terms"
          checked
          disabled
        />
      </div>

      <div className={`${isVideoUploading ? "hidden" : ""} mb-3`}>
        <button
          className='bg-zinc-700 px-4 py-1 rounded-sm hover:bg-white hover:text-black'
          onClick={upload}
        >Upload</button>
      </div>

      <div className="uploadMessageContainer flex items-center">
        {uploadMessage}
        <img
          className={`w-20 invert ${uploadMessage === "Please Wait !" ? "inline" : "hidden"}`}
          src="https://s3.scoopwhoop.com/anj/loading/594155876.gif"
          alt=""
        />
      </div>

    </div>
  )
}

export default Upload