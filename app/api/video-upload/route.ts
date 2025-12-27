// import { NextRequest , NextResponse } from 'next/server';
// import { v2 as cloudinary, UploadStream } from 'cloudinary';
// import { auth } from '@clerk/nextjs/server'; 
// // import { Prisma } from '@prisma/client';
// // import { PrismaClient } from '@prisma/client/extension';
// import { prisma } from '@/lib/prisma';

// // const prisma = new PrismaClient()

//  // Configuration
//     cloudinary.config({ 
//         cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
//         api_key: process.env.CLOUDINARY_API_KEY, 
//         api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
//     });

//     interface CloudinaryUploadResult{
//         public_id: string;
//         bytes:number;
//         duration?:number;
//         [key:string]:any
//     }

// // (async function() {


   
    
// //     // Upload an image
// //      const uploadResult = await cloudinary.uploader
// //        .upload(
// //            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
// //                public_id: 'shoes',
// //            }
// //        )
// //        .catch((error) => {
// //            console.log(error);
// //        });
    
// //     console.log(uploadResult);
    
// //     // Optimize delivery by resizing and applying auto-format and auto-quality
// //     const optimizeUrl = cloudinary.url('shoes', {
// //         fetch_format: 'auto',
// //         quality: 'auto'
// //     });
    
// //     console.log(optimizeUrl);
    
// //     // Transform the image: auto-crop to square aspect_ratio
// //     const autoCropUrl = cloudinary.url('shoes', {
// //         crop: 'auto',
// //         gravity: 'auto',
// //         width: 500,
// //         height: 500,
// //     });
    
// //     console.log(autoCropUrl);    
// // })();


// export async function POST(request:NextRequest){
    
//     try{
//         const{userId}= await auth()
//     if(!userId){
//         return NextResponse.json({error:"Unauthorized"},{status:401})
//     }

//         if(
//         !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
//         !process.env.CLOUDINARY_API_KEY||
//         !process.env.CLOUDINARY_API_SECRET
//     ){
//         return NextResponse.json({error:"Cloudinary credentials not found"},{status:500})
//     }



//         const formData = await request.formData();
//         const file= formData.get("file") as File | null;
//         const title = formData.get("title") as string;
//         const description = formData.get("description") as string;
//         const originalSize= formData.get("originalSize") as string;

//         if(!file){
//             return NextResponse.json({error:"File not found"},{status:400})
//         }

//         const bytes=await file.arrayBuffer()
//         const buffer = Buffer.from(bytes)

//        const result= await new Promise<CloudinaryUploadResult>(
//             (resolve, reject)=>{
//                 const uploadStream= cloudinary.uploader.upload_stream(
//                     {
//                         resource_type:"video",
//                         folder:"video-uploads", transformation: [
//                             {
//                                 quality:"auto",
//                                 fetch_format:"mp4"
//                             }
//                         ]},
                        

//                     (error,result)=>{
//                         if(error) reject(error);
//                         else resolve(result as CloudinaryUploadResult);
//                     }
//                 )

//                 uploadStream.end(buffer)

//             }
//         )
//         const video = await prisma.video.create({
//             data:{
//                 title,
//                 description,
//                 publicId:result.public_id,
//                 originalSize: file.size,
//                 compresedSize : result.bytes,
//                 duration: String(result.duration || 0),
//             }
//         })
//         return NextResponse.json(video)
//     }catch(error){
//         console.log("Upload video failed", error)
//         return NextResponse.json({error:"Upload video failed"},{status:500})
        

//     }
// }


// --------------

// import { NextRequest, NextResponse } from 'next/server';
// import { v2 as cloudinary } from 'cloudinary';
// import { auth } from '@clerk/nextjs/server';
// import { prisma } from '@/lib/prisma';

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// interface CloudinaryUploadResult {
//   public_id: string;
//   bytes: number;
//   duration?: number;
//   [key: string]: any;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const formData = await request.formData();
//     const file = formData.get("file") as File | null;
//     const title = formData.get("title") as string;
//     const description = formData.get("description") as string;
//     const originalSize = formData.get("originalSize") as string;

//     if (!file) {
//       return NextResponse.json({ error: "File not found" }, { status: 400 });
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());

//     const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           resource_type: "video",
//           folder: "video-uploads",
//           transformation: [{ quality: "auto", fetch_format: "mp4" }],
//         },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result as CloudinaryUploadResult);
//         }
//       );
//       uploadStream.end(buffer);
//     });

//     const video = await prisma.video.create({
//       data: {
//         title,
//         description,
//         publicId: result.public_id,
//         originalSize,
//         compresedSize: String(result.bytes),
//         duration: String(result.duration || 0),
//       },
//     });

//     return NextResponse.json(video);
//   } catch (error) {
//     console.log("Upload video failed", error);
//     return NextResponse.json({ error: "Upload video failed" }, { status: 500 });
//   }
// }















// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import { auth } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";

// // Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// interface CloudinaryUploadResult {
//   public_id: string;
//   bytes: number;
//   duration?: number;
//   [key: string]: any;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { userId } = await auth();
//     if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const formData = await request.formData();
//     const file = formData.get("file") as File | null;
//     const title = (formData.get("title") as string) || "Untitled";
//     const description = (formData.get("description") as string) || "";
//     const originalSizeStr = formData.get("originalSize") as string;

//     if (!file) return NextResponse.json({ error: "File not found" }, { status: 400 });

//     const originalSize = parseInt(originalSizeStr, 10);
//     if (isNaN(originalSize)) return NextResponse.json({ error: "Invalid original size" }, { status: 400 });

//     const buffer = Buffer.from(await file.arrayBuffer());

//     const result: CloudinaryUploadResult = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           resource_type: "video",
//           folder: "video-uploads",
//           transformation: [{ quality: "auto", fetch_format: "mp4" }],
//         },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result as CloudinaryUploadResult);
//         }
//       );
//       uploadStream.end(buffer);
//     });

//     // const video = await prisma.video.create({
//     //   data: {
//     //     title,
//     //     description,
//     //     publicId: result.public_id,
//     //     originalSize: String(originalSize),
//     //     compresedSize: result.bytes, // number
//     //     duration: String(result.duration || 0), // number
//     //   },
//     // });

// const video = await prisma.video.create({
//   data: {
//     title,
//     description,
//     publicId: result.public_id,
//     originalSize: originalSize,          // number ✅
//     compresedSize: result.bytes,      // number ✅
//     duration: result.duration ?? 0,   // number ✅
//   },
// });


//     return NextResponse.json(video, { status: 200 });
//   } catch (error) {
//     console.log("Upload video failed", error);
//     return NextResponse.json({ error: "Upload video failed" }, { status: 500 });
//   }
// }



import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  bytes: number;
  duration?: number;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string) || "Untitled";
    const description = (formData.get("description") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    // ✅ Always get size from file
    const originalSize = file.size;

    const buffer = Buffer.from(await file.arrayBuffer());

    const result: CloudinaryUploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "video-uploads",
          transformation: [
            {
              quality: "auto",
              fetch_format: "mp4",
            },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as CloudinaryUploadResult);
        }
      );

      uploadStream.end(buffer);
    });

   const video = await prisma.video.create({
  data: {
    title,
    description,
    publicId: result.public_id,
    originalSize: file.size,
    compresedSize: result.bytes,
    duration: result.duration ?? 0,
  },
});

    return NextResponse.json(video, { status: 200 });
  } catch (error) {
    console.error("Upload video failed", error);
    return NextResponse.json(
      { error: "Upload video failed" },
      { status: 500 }
    );
  }
}
