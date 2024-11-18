'use client'
import {useEffect} from "react";
import {signOut} from "next-auth/react";


export default function LogoutPage() {

  useEffect(() => {
    // Sign out
    signOut({callbackUrl: '/login', redirect: true});
  }, [])

  return <>
    <div>Logging out...</div>
  </>
}