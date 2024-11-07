"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
    console.log("session", session)
    console.log("status", status)
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google"); // Redirect to Google sign-in if not logged in
    }
  }, [status]);

  if (status === "loading") {
    return (<div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
  </div>);
  }

  if (status === "authenticated") {
    return children;
  }
  
  return null;
}
