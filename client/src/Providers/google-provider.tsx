import GoogleProviderClient from "./_components/google";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID! as string;

export default function GoogleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleProviderClient clientId={clientId}>{children}</GoogleProviderClient>
  );
}
