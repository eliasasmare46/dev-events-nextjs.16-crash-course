 import ExploreBtn from "@/components/ExploreBtn";
 import EventCard from "@/components/EventCard";
 import {events} from "@/lib/constants";
 import {IEvent} from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page=async () => {
    const response = await fetch(`${BASE_URL}/api/events`);
    const {events} = await response.json();

    return (
<section>
    <h1 className={"text-center"}> The Hub for Every Dev <br /> Event You Can't Miss </h1>
    <p className={"text-center mt-5"}>Hackathons, Meetups, and Conferences, All in One place</p>
    <ExploreBtn />
    <div className={"mt-20 space-y-7"}>
        <h3>Featured Events</h3>

        <ul className={"events"}>
            {events && events.length> 0 && events.map((event: IEvent) =>(
           <li key={event.title}>
               <EventCard {...event}/>
           </li>

            ))}
        </ul>
    </div>
</section>
    )
}
export default Page



//
// import ExploreBtn from "@/components/ExploreBtn";
// import EventCard from "@/components/EventCard";
// import { IEvent } from "@/database";
//
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
//
// const Page = async () => {
//     let apiEvents: IEvent[] = [];
//
//     try {
//         const response = await fetch(`${BASE_URL}/api/events`, {
//             cache: 'no-store'
//         });
//
//         if (response.ok) {
//             const data = await response.json();
//             apiEvents = data.events || [];
//             console.log('Fetched events:', apiEvents);
//         } else {
//             console.error('Failed to fetch events:', await response.text());
//         }
//     } catch (error) {
//         console.error('Error fetching events:', error);
//     }
//
//     return (
//         <section>
//             <h1 className="text-center">The Hub for Every Dev <br /> Event You Can't Miss</h1>
//             <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One place</p>
//             <ExploreBtn />
//
//             <div className="mt-20 space-y-7">
//                 <h3>Featured Events</h3>
//
//                 {apiEvents && apiEvents.length > 0 ? (
//                     <ul className="events">
//                         {apiEvents.map((event: IEvent) => (
//                             <li key={event._id?.toString() || event.slug}>
//                                 <EventCard {...event} />
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p className="text-center text-gray-500">No events found. Create some events first!</p>
//                 )}
//             </div>
//         </section>
//     );
// };
//
// export default Page;