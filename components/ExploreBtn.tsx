 // 'use client';
 //
 // import Image from "next/image";
 // import posthog from "posthog-js";
 //
 // const ExploreBtn = () => {
 //     return (
 //         <button type="button" id={"explore-btn"} className="mt-7 mx-auto" onClick={() => { console.log('CLICK'); posthog.capture('explore_events_clicked'); }}>
 //             <a href={"#events"}>
 //                Explore Events
 //                 <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
 //            </a>
 //     </button>
 //     )
 // }
 // export default ExploreBtn




 //
 // 'use client';
 //
 // import { useRouter } from "next/navigation";
 // import Image from "next/image";
 // import posthog from "posthog-js";
 //
 // const ExploreBtn = () => {
 //     const router = useRouter();
 //
 //     const handleClick = () => {
 //         console.log('CLICK');
 //         posthog.capture('explore_events_clicked');
 //         router.push('/events'); // This navigates to the events page
 //     };
 //
 //     return (
 //         <button
 //             type="button"
 //             id="explore-btn"
 //             className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
 //             onClick={handleClick}
 //         >
 //             Explore Events
 //             <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
 //         </button>
 //     );
 // };
 //
 // export default ExploreBtn;

 'use client';

 import { useRouter } from "next/navigation";
 import Image from "next/image";
 import posthog from "posthog-js";

 const ExploreBtn = () => {
     const router = useRouter();

     const handleClick = () => {
         console.log('CLICK');
         posthog.capture('explore_events_clicked');
         router.push('/events');
     };

     return (
         <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
             <button
                 type="button"
                 id="explore-btn"
                 className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                 onClick={handleClick}
             >
                 Explore Events
                 <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
             </button>
         </div>
     );
 };

 export default ExploreBtn;