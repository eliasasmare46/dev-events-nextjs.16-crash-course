// // import { notFound } from "next/navigation";
// // import Image from "next/image";
// //
// // const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// //
// // const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
// //     const { slug } = await params;
// //
// //     try {
// //         const request = await fetch(`${BASE_URL}/api/events/${slug}`);
// //         const data = await request.json();
// //
// //         // Check if request was successful
// //         if (!request.ok) {
// //             console.log('API returned error:', data);
// //             return notFound();
// //         }
// //
// //         // Get the event from the response (it's "event", not "events")
// //         const event = data.event;
// //
// //         if (!event) {
// //             return notFound();
// //         }
// //
// //         return (
// //             <section id={"event"}>
// //                 <div className={"header"}>
// //                     <h1>{event.title || "Event Description"}</h1>
// //                     <p className={"mt-2"}>{event.description}</p>
// //                 </div>
// //
// //                 <div className={"details"}>
// //                     {/* Left Side - Event Content */}
// //                     <div className={"content"}>
// //                         <Image
// //                             src={event.image || "/placeholder.jpg"}
// //                             alt={event.title || "Event Banner"}
// //                             width={800}
// //                             height={800}
// //                             className="banner"
// //                         />
// //                     </div>
// //
// //                     <section className={"flex-col-gap-2"}>
// //                         <h2>Overview</h2>
// //                         <p>{event.overview || event.description || "No overview available"}</p>
// //                     </section>
// //
// //                     <section className={"flex-col-gap-2"}>
// //                         <h2>Event Details</h2>
// //                         <div className={"event-details"}>
// //                             <p><strong>Date:</strong> {event.date}</p>
// //                             <p><strong>Time:</strong> {event.time}</p>
// //                             <p><strong>Location:</strong> {event.location}</p>
// //                             {event.price && <p><strong>Price:</strong> ${event.price}</p>}
// //                             {event.capacity && <p><strong>Capacity:</strong> {event.capacity}</p>}
// //                         </div>
// //                     </section>
// //
// //                     {/* Right side - Booking Forms */}
// //                     <aside className={"booking"}>
// //                         <p className={"text-lg font-semibold"}>Book Event</p>
// //                         {/* Add your booking form here */}
// //                         <button className="book-button">
// //                             Reserve Your Spot
// //                         </button>
// //                     </aside>
// //                 </div>
// //             </section>
// //         );
// //     } catch (error) {
// //         console.error('Error fetching event:', error);
// //         return notFound();
// //     }
// // }
// //
// // export default EventDetailsPage;
//
// import { notFound } from "next/navigation";
// import Image from "next/image";
//
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
//
// const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
//     const { slug } = await params;
//
//     // Debug: Log the slug
//     console.log('Fetching event with slug:', slug);
//
//     try {
//         const request = await fetch(`${BASE_URL}/api/events/${slug}`);
//
//         // Debug: Log the response status
//         console.log('Response status:', request.status);
//
//         if (!request.ok) {
//             console.log('Event not found, returning 404');
//             return notFound();
//         }
//
//         const data = await request.json();
//
//         // Debug: Log the data structure
//         console.log('API response data:', data);
//
//         // Check different possible data structures
//         const events = data.events || data.event || data;
//
//         if (!events) {
//             console.log('No event data found in response');
//             return notFound();
//         }
//
//         return (
//             <section id={"event"}>
//                 <div className={"header"}>
//                     <h1>{events.title || "Event Description"}</h1>
//                     <p className={"mt-2"}>{events.description}</p>
//                 </div>
//
//                 <div className={"details"}>
//                     {/* Left Side - Event Content */}
//                     <div className={"content"}>
//                         <Image
//                             src={events.image || "/placeholder.jpg"}
//                             alt={"Event Banner"}
//                             width={800}
//                             height={800}
//                             className="banner"
//                         />
//                     </div>
//                     <section className={"flex-col-gap-2"}>
//                         <h2>Overview</h2>
//                         <p>{events.overview || events.description || "No overview available"}</p>
//                     </section>
//
//                     <section className={"flex-col-gap-2"}>
//                         <h2>Event Details</h2>
//                         {events.date && <p><strong>Date:</strong> {new Date(events.date).toLocaleDateString()}</p>}
//                         {events.location && <p><strong>Location:</strong> {events.location}</p>}
//                         {events.price && <p><strong>Price:</strong> ${events.price}</p>}
//                         {events.capacity && <p><strong>Capacity:</strong> {events.capacity} people</p>}
//                     </section>
//
//                     {/* Right side - Booking Forms */}
//                     <aside className={"booking"}>
//                         <p className={"text-lg font-semibold"}>Book Event</p>
//                         {/* Add booking form here */}
//                     </aside>
//                 </div>
//             </section>
//         );
//     } catch (error) {
//         console.error('Error fetching event:', error);
//         return notFound();
//     }
// }
//
// export default EventDetailsPage;



import {notFound} from "next/navigation";
import Image from "next/image";
import EventCard from "@/components/EventCard";
import {getSimilarEventsBySlug} from "@/lib/actions/event.actions";
import {IEvent} from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailsPage = async ({params}: {params: Promise<{slug:string}>}) => {
    const {slug} = await params;
     const request = await fetch (`${BASE_URL}/api/events/${slug}`);
     const {events} = await request.json();

    if(!events) return notFound();

     const bookings = 10;
    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

    return (
        <section id={"event"}>
           <div className={"header"}>
               <h1>Event Description</h1>
               <p className={"mt-2"}>{events.description}</p>
           </div>

            <div className={"details"}>
                {/* Left Side - Event Content */}
                <div className={"content"}>
                    <Image
                        src={events.image || "/placeholder.jpg"}
                        alt={"Event Banner"}
                        width={800}
                        height={800}
                        className="banner"
                    />
                </div>
                <section className={"flex-col-gap-2"}>
                    <h2>Overview</h2>
                    <p>"overview"</p>
                </section>

                <section className={"flex-col-gap-2"}>
                    <h2>Event Details</h2>
                </section>

                {/* Right side -Booking Forms */}
                <aside className={"booking"}>
                    <p className={"text-lg font-semibold"}>Book Event</p>
                </aside>
            </div>
            <div className={"flex w-full flex-col gap-4 pt-20"}>
                <h2>Similar Events</h2>
                <div className={"events"}>
                    {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
                        <EventCard key={similarEvent.id} {...similarEvent} />
                    ))}
                </div>
            </div>

        </section>

    )
}
export default EventDetailsPage












// import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
//
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
//
// async function getEvent(slug: string) {
//     try {
//         const response = await fetch(`${BASE_URL}/api/events/${slug}`, {
//             cache: 'no-store',
//         });
//
//         if (!response.ok) {
//             return null;
//         }
//
//         const data = await response.json();
//         return data.event;
//     } catch (error) {
//         console.error('Error fetching event:', error);
//         return null;
//     }
// }
//
// export default async function EventPage({ params }: { params: { slug: string } }) {
//     const event = await getEvent(params.slug);
//
//     if (!event) {
//         notFound();
//     }
//
//     return (
//         <div className="container mx-auto px-4 py-8 max-w-4xl">
//             <Link href="/events" className="text-blue-600 hover:underline mb-4 inline-block">
//                 ← Back to Events
//             </Link>
//
//             <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//                 <div className="relative h-96 w-full">
//                     <Image
//                         src={event.image}
//                         alt={event.title}
//                         fill
//                         className="object-cover"
//                         priority
//                     />
//                 </div>
//
//                 <div className="p-8">
//                     <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
//
//                     <div className="flex items-center gap-6 mb-6 text-gray-600">
//                         <div className="flex items-center gap-2">
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                             </svg>
//                             <span>{event.location}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                             </svg>
//                             <span>{event.date}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                             <span>{event.time}</span>
//                         </div>
//                     </div>
//
//                     <div className="mb-6">
//                         <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                             {event.mode}
//                         </span>
//                     </div>
//
//                     <div className="prose max-w-none">
//                         <h2 className="text-2xl font-semibold mb-2">Description</h2>
//                         <p className="text-gray-700 mb-6">{event.description}</p>
//
//                         <h2 className="text-2xl font-semibold mb-2">Overview</h2>
//                         <p className="text-gray-700 mb-6">{event.overview}</p>
//
//                         <h2 className="text-2xl font-semibold mb-2">Venue</h2>
//                         <p className="text-gray-700 mb-6">{event.venue}</p>
//
//                         <h2 className="text-2xl font-semibold mb-2">Audience</h2>
//                         <p className="text-gray-700 mb-6">{event.audience}</p>
//
//                         <h2 className="text-2xl font-semibold mb-2">Agenda</h2>
//                         <ul className="list-disc pl-5 mb-6">
//                             {event.agenda?.map((item: string, index: number) => (
//                                 <li key={index} className="text-gray-700 mb-1">{item}</li>
//                             ))}
//                         </ul>
//
//                         <h2 className="text-2xl font-semibold mb-2">Organizer</h2>
//                         <p className="text-gray-700 mb-6">{event.organizer}</p>
//
//                         <h2 className="text-2xl font-semibold mb-2">Tags</h2>
//                         <div className="flex flex-wrap gap-2">
//                             {event.tags?.map((tag: string) => (
//                                 <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
//                                     {tag}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


