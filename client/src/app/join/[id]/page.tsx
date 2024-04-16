export default function Interview({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  return <div>{id}</div>;
}
