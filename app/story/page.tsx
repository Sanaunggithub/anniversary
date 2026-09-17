import Link from "next/link";
import Timeline from "@/components/Timeline";

export default function StoryPage() {
    return (
        <div className="min-h-screen overflow-x-hidden px-5 py-8 sm:px-8 sm:py-12">
            <div className="mx-auto mb-10 w-full max-w-5xl">
                <Link
                    href="/"
                    className="font-sans-ui text-sm text-muted transition-colors hover:text-accent"
                >
                    ← Back home
                </Link>
            </div>

            <Timeline />
        </div>
    );
}