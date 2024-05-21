import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { ReactNode } from "react";

export default function GoogleProviderClient({
  children,
  clientId,
}: {
  children: ReactNode;
  clientId: string;
}) {
  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}
