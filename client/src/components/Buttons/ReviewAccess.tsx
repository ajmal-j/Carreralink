import { Checkbox } from "../ui/checkbox";

export default function ReviewAccessButton({
  email,
  password,
  onsubmit,
}: {
  email: string;
  password: string;
  onsubmit: (values: { email: string; password: string }) => void;
}) {
  return (
    <div className="mt-5 flex items-center space-x-2 text-foreground/70">
      <Checkbox
        onCheckedChange={() => onsubmit({ email, password })}
        id="reviewAccess"
      />
      <label
        htmlFor="reviewAccess"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        For review purpose login.
      </label>
    </div>
  );
}
