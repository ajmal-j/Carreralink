import User from "@/components/ui/User";

export default function Users({
  params: { username },
}: {
  params: { username: string };
}) {
  return <User username={username} />;
}
