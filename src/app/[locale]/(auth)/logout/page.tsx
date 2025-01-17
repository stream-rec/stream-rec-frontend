'use client'
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { BASE_PATH } from "@/src/lib/routes";
import { Loader2 } from "lucide-react";

export default function LogoutPage({ params: { locale } }: { params: { locale: string } }) {
  useEffect(() => {
    // Sign out
    signOut({ callbackUrl: `${BASE_PATH}/${locale}/login`, redirect: true });
  }, [])

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-6 w-6 animate-spin" />
      <p className="text-muted-foreground">Logging out...</p>
    </div>
  )
}