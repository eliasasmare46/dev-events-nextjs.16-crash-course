export interface EventItem {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: EventItem[] = [
  {
    title: "Google I/O 2026",
    image: "/images/event1.png",
    slug: "google-io-2026",
    location: "Mountain View, CA",
    date: "May 2026",
    time: "9:00 AM PT",
  },
  {
    title: "WWDC 2026",
    image: "/images/event2.png",
    slug: "wwdc-2026",
    location: "Cupertino, CA",
    date: "June 2026",
    time: "10:00 AM PT",
  },
  {
    title: "DEF CON 34",
    image: "/images/event3.png",
    slug: "def-con-34",
    location: "Las Vegas, NV",
    date: "August 2026",
    time: "8:00 AM PT",
  },
  {
    title: "KubeCon + CloudNativeCon North America 2026",
    image: "/images/event4.png",
    slug: "kubecon-na-2026",
    location: "North America (TBA)",
    date: "November 2026",
    time: "9:00 AM Local Time",
  },
  {
    title: "TechCrunch Disrupt 2026",
    image: "/images/event5.png",
    slug: "techcrunch-disrupt-2026",
    location: "San Francisco, CA",
    date: "October 2026",
    time: "9:30 AM PT",
  },
  {
    title: "MLH Global Hack Week",
    image: "/images/event6.png",
    slug: "mlh-global-hack-week",
    location: "Online",
    date: "Multiple Sessions in 2026",
    time: "Flexible Schedule",
  },
];
