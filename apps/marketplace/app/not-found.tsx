import Link from "next/link";
import { Button } from "@createconomy/ui";

/**
 * 404 Not Found Page for Marketplace
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-24">
      <div className="max-w-md w-full text-center space-y-6">
        {/* 404 Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <span className="text-3xl font-bold">404</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/">Go to homepage</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">Browse products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
