// "use client"
// import React,  {useState} from 'react'
// import axios from 'axios'
// import { useRouter } from 'next/navigation'

// function VideoUpload() {

//   const [file, setFile] = useState<File | null>(null)
//   const [title, setTitle] = useState('')ß
//   const [description, setDescription] = useState('')
//   const [isUploading, setIsUploading] = useState(false)

//   const router = useRouter()
//   //max file size of 70MB
//   const MAX_FILE_SIZE = 70 * 1024 * 1024

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!file) return;

//     if (file.size > MAX_FILE_SIZE) {
//       //todo add notification system

//       alert('File size exceeds the maximum limit of 70MB.')
//       return;
//     }
//     setIsUploading(true)
//     const formData = new FormData()
//     formData.append('video', file)
//     formData.append('title', title)
//     formData.append('description', description)
//     formData.append("originalSize", file.size.toString())

//     try{
//       const response=await axios.post('/api/video-upload', formData)
//       //check for 200 response
//       if(response.status===200){
//         router.push('/')
//       }else{
//         //todo add notification system
//         alert('Upload failed. Please try again.')
//       }

//     }catch(error){
//       console.log('Upload error:',error)

//     }finally{
//       setIsUploading(false)
//     }

//   }

//   return (
//     <div className='container mx-auto p-4'>
//       <h1 className='text-2xl font-bold mb-4'>Upload Video</h1>
//       <form onSubmit={handleSubmit} className='space-y-4'>
//         <div>
//           <label className='label'>
//             <span className='label-text'>Title</span>
//           </label>
//           <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className='input input-bordered w-full'
//           required
//           />

//         </div>
//         <div>
//           <label className='label'>
//             <span className='label-text'>Description</span>
//           </label>
//           <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className='textarea textarea-bordered w-full'
//           />
//         </div>
//         <label className='label'>
//           <span className='label-text'>Video File</span>
//         </label>
//         <div>
//           <input
//             type="file"
//             accept="video/*"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className='file-input file-input-bordered w-full'
//           />
//         </div>
//         <button type="submit" className='btn btn-primary' disabled={isUploading}>
//           {isUploading ? 'Uploading...' : 'Upload Video'}
//         </button>
//       </form>

//     </div>
//   )
// }

// export default VideoUpload

"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  const MAX_FILE_SIZE = 70 * 1024 * 1024; // 70MB

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File size exceeds 70MB.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file); // ✅ FIXED
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await axios.post("/api/video-upload", formData);
      if (response.status === 200) {
        router.push("/");
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.log("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full"
        />

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="file-input file-input-bordered w-full"
          required
        />

        <button className="btn btn-primary" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}

export default VideoUpload;
