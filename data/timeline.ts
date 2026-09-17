export interface TimelineEvent {
    id: string;
    date: string;
    title: string;
    photo?: string;
    description: string;
    location?: string;
    song?: string;
}

export const timelineEvents: TimelineEvent[] = [
    {
        id: "1",
        date: "2024-01-01",
        title: "PLACEHOLDER: First Meeting",
        photo: "/images/timeline-01.jpg",
        description: "PLACEHOLDER_STORY_HERE",
        location: "PLACEHOLDER_LOCATION",
    },
    {
        id: "2",
        date: "2024-02-14",
        title: "PLACEHOLDER: First Conversation",
        photo: "/images/timeline-02.jpg",
        description: "PLACEHOLDER_STORY_HERE",
        location: "PLACEHOLDER_LOCATION",
    },
    {
        id: "3",
        date: "2024-03-15",
        title: "PLACEHOLDER: First Date",
        photo: "/images/timeline-03.jpg",
        description: "PLACEHOLDER_STORY_HERE",
        location: "PLACEHOLDER_LOCATION",
    },
    {
        id: "4",
        date: "2024-06-01",
        title: "PLACEHOLDER: First Trip",
        photo: "/images/timeline-04.jpg",
        description: "PLACEHOLDER_STORY_HERE",
        location: "PLACEHOLDER_LOCATION",
    },
    {
        id: "5",
        date: "2024-12-31",
        title: "PLACEHOLDER: Today",
        photo: "/images/timeline-05.jpg",
        description: "PLACEHOLDER_STORY_HERE",
        location: "PLACEHOLDER_LOCATION",
    },
];