import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Event } from "@/database";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
if (process.env.CLOUDINARY_URL) {
    const matches = process.env.CLOUDINARY_URL.match(/cloudinary:\/\/(\d+):([^@]+)@(.+)/);
    if (matches) {
        cloudinary.config({
            cloud_name: matches[3],
            api_key: matches[1],
            api_secret: matches[2],
        });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();

        // Parse as form-data (since you're sending multipart/form-data)
        const formData = await request.formData();

        // Build event data object
        const eventData: any = {};

        // Handle all form fields
        for (const [key, value] of formData.entries()) {
            // Skip file fields for now
            if (key === 'image' && value instanceof File) continue;

            // Handle array fields (agenda and tags)
            if (key === 'agenda' || key === 'tags') {
                if (!eventData[key]) {
                    eventData[key] = [];
                }
                eventData[key].push(value.toString());
            } else {
                eventData[key] = value.toString();
            }
        }

        // Handle image upload if it's a file
        const imageFile = formData.get('image') as File | null;
        if (imageFile && imageFile.size > 0 && imageFile.type.startsWith('image/')) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadResult = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "DevEvent" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });

            eventData.image = uploadResult.secure_url;
        }

        // Validate mode (must be online, offline, or hybrid)
        const validModes = ['online', 'offline', 'hybrid'];
        if (!validModes.includes(eventData.mode?.toLowerCase())) {
            return NextResponse.json(
                {
                    message: "Event Creation Failed",
                    error: "Mode must be online, offline, or hybrid"
                },
                { status: 400 }
            );
        }




        // Create event in database
        const event = await Event.create(eventData);

        return NextResponse.json(
            {
                message: "Event Created Successfully",
                data: event
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Event creation error:", error);

        // Handle duplicate slug error
        if (error.code === 11000) {
            return NextResponse.json(
                {
                    message: "Event Creation Failed",
                    error: "An event with this title already exists"
                },
                { status: 409 }
            );
        }

        return NextResponse.json(
            {
                message: "Event Creation Failed",
                error: error.message || "Unknown error"
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();

        const events = await Event.find().sort({createdAt: -1});

        return NextResponse.json({message: 'Events fetched successfully', events}, {status: 200});
        //                                                              ^^^^^^ (not "ev
        //                                                              ent")
    } catch (e) {
        return NextResponse.json({message: 'Event fetching failed', error: e},{status:500});
    }

    
//
// import { NextResponse } from "next/server";
// import connectDB from "@/lib/mongodb";
// import { Event } from "@/database";
// import { v2 as cloudinary } from 'cloudinary';
//
// // Configure Cloudinary
// if (process.env.CLOUDINARY_URL) {
//     const matches = process.env.CLOUDINARY_URL.match(/cloudinary:\/\/(\d+):([^@]+)@(.+)/);
//     if (matches) {
//         cloudinary.config({
//             cloud_name: matches[3],
//             api_key: matches[1],
//             api_secret: matches[2],
//         });
//     }
// }
//
// // GET all events (no slug required)
// export async function GET() {
//     try {
//         await connectDB();
//
//         const events = await Event.find().sort({createdAt: -1});
//
//         return NextResponse.json(
//             { message: 'Events fetched successfully', events },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error("Error fetching events:", error);
//         return NextResponse.json(
//             { message: 'Event fetching failed', error: 'Failed to fetch events' },
//             { status: 500 }
//         );
//     }
// }
//
// // POST new event
// export async function POST(request: Request) {
//     try {
//         await connectDB();
//
//         // Parse as form-data
//         const formData = await request.formData();
//
//         // Build event data object
//         const eventData: any = {};
//
//         // Handle all form fields
//         for (const [key, value] of formData.entries()) {
//             if (key === 'image' && value instanceof File) continue;
//
//             if (key === 'agenda' || key === 'tags') {
//                 if (!eventData[key]) {
//                     eventData[key] = [];
//                 }
//                 eventData[key].push(value.toString());
//             } else {
//                 eventData[key] = value.toString();
//             }
//         }
//
//         // Handle image upload
//         const imageFile = formData.get('image') as File | null;
//         if (imageFile && imageFile.size > 0 && imageFile.type.startsWith('image/')) {
//             const bytes = await imageFile.arrayBuffer();
//             const buffer = Buffer.from(bytes);
//
//             const uploadResult = await new Promise<any>((resolve, reject) => {
//                 const uploadStream = cloudinary.uploader.upload_stream(
//                     { folder: "DevEvent" },
//                     (error, result) => {
//                         if (error) reject(error);
//                         else resolve(result);
//                     }
//                 );
//                 uploadStream.end(buffer);
//             });
//
//             eventData.image = uploadResult.secure_url;
//         }
//
//         // Validate mode
//         const validModes = ['online', 'offline', 'hybrid'];
//         if (!validModes.includes(eventData.mode?.toLowerCase())) {
//             return NextResponse.json(
//                 {
//                     message: "Event Creation Failed",
//                     error: "Mode must be online, offline, or hybrid"
//                 },
//                 { status: 400 }
//             );
//         }
//
//         // Create event in database
//         const event = await Event.create(eventData);
//
//         return NextResponse.json(
//             {
//                 message: "Event Created Successfully",
//                 data: event
//             },
//             { status: 201 }
//         );
//
//     } catch (error: any) {
//         console.error("Event creation error:", error);
//
//         if (error.code === 11000) {
//             return NextResponse.json(
//                 {
//                     message: "Event Creation Failed",
//                     error: "An event with this title already exists"
//                 },
//                 { status: 409 }
//             );
//         }
//
//         return NextResponse.json(
//             {
//                 message: "Event Creation Failed",
//                 error: error.message || "Unknown error"
//             },
//             { status: 500 }
//         );
//     }
}