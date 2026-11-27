import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap page-stack">
      <div className="empty-bag-card">
        <h2>Page Not Found</h2>
        <p>We couldn’t find that page. Explore our Christian faith merchandise catalog instead.</p>
        <div className="empty-bag-links">
          <Link href="/" className="btn btn-lg">
            Back to Home
          </Link>
          <Link href="/products" className="btn btn-ghost btn-lg">
            Browse All Merch →
          </Link>
        </div>
      </div>
    </div>
  );
}
