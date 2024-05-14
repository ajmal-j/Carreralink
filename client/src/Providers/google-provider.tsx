"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleOAuthProvider
      clientId={
        "444055010869-ie946hi941u1hcsf1on8vp6a33eqiggs.apps.googleusercontent.com"
      }
    >
      {children}
    </GoogleOAuthProvider>
  );
}
