import User from "@/components/ui/User";

export default function UserProfile({
  params: { username },
}: {
  params: { username: string };
}) {
  return <User username={username} />;
}
