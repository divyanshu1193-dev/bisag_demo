"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AuthGuard({ children, roles }: { children: ReactNode; roles?: string[] }) {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/");
  }, [status, router]);

  if (status === "loading") return <div className="container">Loading…</div>;

  if (roles && !roles.includes((data as any)?.role)) {
    return (
      <div className="container">
        <div className="card">
          <h3>Access restricted</h3>
          <p>Your role does not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}