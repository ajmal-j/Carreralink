import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import NotFound from "@/components/Custom/NotFound";
import { Button } from "@/components/ui/button";
import PlanCard from "@/components/ui/plan";
import { getMessage } from "@/lib/utils";
import { confirmPayment } from "@/services/payment.service";
import { getPlan } from "@/services/plan.service";
import { cookies } from "next/headers";

interface PageProps {
  searchParams: {
    id: string;
    product: string;
  };
}

export default async function Success({
  searchParams: { id, product },
}: PageProps) {
  const token = cookies().get("userToken")?.value || "";
  let order: IOrder = {} as IOrder;

  try {
    const productPromise = await getPlan({ id: product, token });
    const productData = await productPromise.data;
    const result = await confirmPayment({
      id,
      token,
      item: productData,
    });
    order = await result.data;
  } catch (error) {
    console.log(error);
    const message = getMessage(error);
    return <NotFound title={message} />;
  }
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl">Payment Success.</h1>
      <p className="text-foreground/70">
        Thank you for your payment. Your payment ID : <b>{id}</b>
      </p>
      <PlanCard plan={order.item} />
      <div className="flex items-center justify-end gap-2">
        <PrimaryButton
          size="sm"
          href="/plans"
          className="w-min text-nowrap px-3 "
        >
          view all purchases
        </PrimaryButton>
        <SecondaryButton size="sm" href="/" className="w-min text-nowrap px-3 ">
          continue
        </SecondaryButton>
      </div>
    </div>
  );
}
