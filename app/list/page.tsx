import Link from "next/link";
import OurList from "@/components/OurList";

export default function ListPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-10 inline-flex text-sm text-muted transition-colors hover:text-ink"
        >
          ← Back home
        </Link>

        <OurList />
      </div>
    </main>
  );
}