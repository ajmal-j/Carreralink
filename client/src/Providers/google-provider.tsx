"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata = {
  title:"Login | Carreralink",
  referrer:"origin",
}

export default function GoogleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleOAuthProvider
      clientId={"444055010869-oe93ssjvo1rbdorufq3pvpdim5f0ek4u.apps.googleusercontent.com"}
    >
      {children}
    </GoogleOAuthProvider>
  );
}
