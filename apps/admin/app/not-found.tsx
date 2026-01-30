import Link from "next/link";
import { Button } from "@createconomy/ui";

/**
 * 404 Not Found Page for Admin Console
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-24">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <span className="text-3xl font-bold">404</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold">Admin Page Not Found</h2>
        <p className="text-muted-foreground">
          The admin page you're looking for doesn't exist.
        </p>

        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/">Go to dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
