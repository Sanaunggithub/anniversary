import BackLink from "@/components/BackLink";
import Cycle from "@/components/Cycle";

export default function CyclePage() {
  return (
    <main className="min-h-screen bg-background px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <BackLink />
        <Cycle />
      </div>
    </main>
  );
}