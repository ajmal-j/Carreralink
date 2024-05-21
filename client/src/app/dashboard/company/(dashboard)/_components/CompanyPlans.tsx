"use client";

import { getMessage } from "@/lib/utils";
import { getCompanyPlans, getUserPlans } from "@/services/admin.service";
import { useEffect, useState } from "react";
import { createPaymentSession } from "@/services/payment.service";
import { loadStripe } from "@stripe/stripe-js";
import { useStateSelector } from "@/store";
import { toast } from "@/components/ui/use-toast";
import PlanCard from "@/components/ui/plan";
import { Button } from "@/components/ui/button";

export default function CompanyPlans({
  id,
  stripePublishableKey,
}: {
  id?: string;
  stripePublishableKey: string;
}) {
  const [companyPlans, setCompanyPlans] = useState<IPlan[]>([]);
  const getPlans = async () => {
    try {
      const company = await getCompanyPlans();
      const plans = company.data as IPlan[];
      setCompanyPlans(id ? plans.filter((plan) => plan.id !== id) : plans);
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
      {!!companyPlans.length && (
        <div>
          <h1 className="mx-1 my-5 text-center text-2xl text-foreground/90 md:text-3xl">
            Upgrade your plan.
          </h1>
          <div className="flex w-full flex-wrap gap-3">
            {companyPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                actions={
                  <BuyPlan
                    {...{ stripePublishableKey }}
                    id={plan.id}
                    plan={plan}
                  />
                }
              />
            ))}
          </div>
          <div className="mt-3 flex justify-end">
            <span className="text-sm text-foreground/70">
              * Instant 30% discount for every purchase before the end of the
              current plan.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

const BuyPlan = ({
  plan,
  id,
  stripePublishableKey,
}: {
  id: string;
  plan: IPlan;
  stripePublishableKey: string;
}) => {
  const companyData = useStateSelector((state) => state.company);
  const buyPlanHandler = async ({ plan }: { plan: IPlan }) => {
    try {
      if (!companyData) throw new Error("Please login to continue.");

      const session = await createPaymentSession({
        product: plan,
        email: companyData.email,
      });
      const sessionId = session.data.id;
      const stripe = await loadStripe(stripePublishableKey);
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
