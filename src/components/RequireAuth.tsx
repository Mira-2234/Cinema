"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?redirect=${pathname}`);
    }
  }, [loading, user, router, pathname]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-red-600" />
      </div>
    );
  }

  return <>
  {children}
  </>;
}