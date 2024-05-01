"use client";

import { getMessage } from "@/lib/utils";
import { getUserPlans } from "@/services/admin.service";
import { useEffect, useState } from "react";
import { toast } from "./use-toast";
import PlanCard from "./plan";
import { Button } from "./button";
import { createPaymentSession } from "@/services/payment.service";
import { loadStripe } from "@stripe/stripe-js";
import { useStateSelector } from "@/store";

export default function UserPlans({ id }: { id?: string }) {
  const [userPlans, setUserPlans] = useState<IPlan[]>([]);

  const getPlans = async () => {
    try {
      const user = await getUserPlans();
      const plans = user.data as IPlan[];
      setUserPlans(id ? plans.filter((plan) => plan.id !== id) : plans);
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
        duration: 500,
      });
    }
  };

  useEffect(() => {
    getPlans();
  }, []);
  return (
    <div>
      {!!userPlans.length && (
        <div>
          <h1 className="mx-1 my-5 text-center text-2xl text-foreground/90 md:text-3xl">
            Upgrade your plan.
          </h1>
          <div className="flex w-full flex-wrap gap-2">
            {userPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                actions={<BuyPlan id={plan.id} plan={plan} />}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const BuyPlan = ({ plan, id }: { id: string; plan: IPlan }) => {
  const userData = useStateSelector((state) => state.user.user);
  const buyPlanHandler = async ({ plan }: { plan: IPlan }) => {
    try {
      if (!userData) throw new Error("Please login to continue.");

      const session = await createPaymentSession({
        product: plan,
        email: userData.email,
      });
      const sessionId = session.data.id;
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
      );
      if (!stripe) throw new Error("Stripe not found");
      const result = await stripe.redirectToCheckout({
        sessionId,
      });
      if (result.error) throw new Error(result.error.message);
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
        duration: 1000,
      });
    }
  };
  return (
    <div className="flex gap-3">
      <Button variant="outline" onClick={() => buyPlanHandler({ plan })}>
        Buy
      </Button>
    </div>
  );
};
