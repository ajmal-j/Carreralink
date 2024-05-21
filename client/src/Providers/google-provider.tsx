import GoogleProviderClient from "./_components/google";

const clientId = process.env.GOOGLE_CLIENT_ID! as string;

export default function GoogleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleProviderClient clientId={clientId}>{children}</GoogleProviderClient>
  );
}
