"use client";

import NotFound from "@/components/Custom/NotFound";
import PlanCard from "@/components/ui/plan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
import { getCompanyPlans, getUserPlans } from "@/services/admin.service";
import { useEffect, useState } from "react";
import UpdatePlan from "./_components/UpdatePlan";

export default function Plans() {
  const [userPlans, setUserPlans] = useState<IPlan[]>([]);
  const [companyPlans, setCompanyPlans] = useState<IPlan[]>([]);

  const getPlans = async () => {
    try {
      const [user, company] = await Promise.all([
        getUserPlans(),
        getCompanyPlans(),
      ]);

      setUserPlans(user.data);
      setCompanyPlans(company.data);
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
      <Tabs defaultValue="user" className="w-full">
        <TabsList className="mb-5 flex">
          <TabsTrigger value="user" className="flex-grow">
            User Plan&apos;s
          </TabsTrigger>
          <TabsTrigger value="company" className="flex-grow">
            Company Plan&apos;s
          </TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <div className="flex w-full flex-wrap gap-3">
            {userPlans.length ? (
              userPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  actions={
                    <UpdatePlan
                      plan={plan}
                      setUserPlans={setUserPlans}
                      setCompanyPlans={setCompanyPlans}
                    />
                  }
                />
              ))
            ) : (
              <div className="flex w-full justify-center ">
                <NotFound title="No plan's found." hideBackButton />
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="company">
          <div className="flex w-full flex-wrap gap-3">
            {companyPlans.length ? (
              companyPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  actions={
                    <UpdatePlan
                      plan={plan}
                      setUserPlans={setUserPlans}
                      setCompanyPlans={setCompanyPlans}
                    />
                  }
                />
              ))
            ) : (
              <div className="flex w-full justify-center ">
                <NotFound title="No plan's found." hideBackButton />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
