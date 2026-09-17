import BackLink from "@/components/BackLink";
import Cycle from "@/components/Cycle";

export default function CyclePage() {
  return (
    <main className="px-6 py-8">
      <BackLink />
      <div className="mx-auto mt-8 max-w-3xl">
        <Cycle />
      </div>
    </main>
  );
}