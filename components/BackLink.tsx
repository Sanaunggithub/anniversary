import Link from "next/link";

export default function BackLink() {
  return (
    <Link
      href="/"
      className="mb-10 inline-flex font-sans-ui text-sm text-muted transition-colors hover:text-ink"
    >
      ← Back home
    </Link>
  );
}