import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
console.log(clientId, "google client id ----------------------");
export default function GoogleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleOAuthProvider
      // added this because of its not getting from the container also it will not work with any other domain google will restrict it.
      clientId={
        "444055010869-ie946hi941u1hcsf1on8vp6a33eqiggs.apps.googleusercontent.com"
      }
    >
      {children}
    </GoogleOAuthProvider>
  );
}
