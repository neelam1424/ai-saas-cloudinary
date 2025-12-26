// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET() {
//   try {
//     const videos = await prisma.video.findMany({
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json(videos);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Error fetching videos" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch videos safely, only selecting known columns
    const videos = await prisma.video.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        publicId: true,
        originalSize: true,
        // compresedSize: true,
        duration: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);

    // If it's a Prisma P2022 error, provide a more descriptive message
    // if (error.code === "P2022") {
    //   return NextResponse.json(
    //     { error: "Database table or column mismatch. Run prisma migrate reset." },
    //     { status: 500 }
    //   );
    // }

    return NextResponse.json({ error: "Error fetching videos" }, { status: 500 });
  }
}
