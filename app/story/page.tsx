import Timeline from "@/components/Timeline";
import BackLink from "@/components/BackLink";

export default function StoryPage() {
    return (
        <main className="min-h-screen overflow-x-hidden px-5 py-8 sm:px-8 sm:py-12">
            <div className="mx-auto max-w-5xl">
                <BackLink />
                <Timeline />
            </div>
        </main>
    );
}