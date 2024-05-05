"use client";

import DangerButton from "@/components/Buttons/DangerButton";
import Markdown from "@/components/Custom/Markdown";
import NotFound from "@/components/Custom/NotFound";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import PlanCard from "@/components/ui/plan";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { cn, getMessage } from "@/lib/utils";
import {
  allOrders,
  deletePlan,
  getCompanyPlans,
  getUserPlans,
} from "@/services/admin.service";
import { Cross1Icon } from "@radix-ui/react-icons";
import { PopoverClose } from "@radix-ui/react-popover";
import { add, format } from "date-fns";
import { Crown, History, IndianRupee, Trash2 } from "lucide-react";
import { Poppins } from "next/font/google";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import UpdatePlan from "./_components/UpdatePlan";

export default function Plans() {
  const [userPlans, setUserPlans] = useState<IPlan[]>([]);
  const [companyPlans, setCompanyPlans] = useState<IPlan[]>([]);
  const [companyOrders, setCompanyOrders] = useState<IOrder[]>([]);
  const [userOrders, setUserOrders] = useState<IOrder[]>([]);

  const getPlans = async () => {
    try {
      const [user, company, orderHistory] = await Promise.all([
        getUserPlans(),
        getCompanyPlans(),
        allOrders(),
      ]);
      const { userOrders, companyOrders } = orderHistory.data;
      setUserOrders(userOrders);
      setCompanyOrders(companyOrders);
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
        <TabsList className="flex">
          <TabsTrigger value="user" className="flex-grow">
            User Plan&apos;s
          </TabsTrigger>
          <TabsTrigger value="company" className="flex-grow">
            Company Plan&apos;s
          </TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <div className="mb-2 flex justify-between">
            <div className="ps-2 text-foreground/70">
              Total : {userPlans.length}
            </div>
            <AllOrdersDrawer orders={userOrders} />
          </div>
          <div className="flex w-full flex-wrap gap-3">
            {userPlans.length ? (
              userPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  actions={
                    <PlansActions
                      {...{ plan, setUserPlans, setCompanyPlans }}
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
          <div className="mb-2 flex justify-between">
            <div className="ps-2 text-foreground/70">
              Total : {companyPlans.length}
            </div>
            <AllOrdersDrawer orders={companyOrders} />
          </div>
          <div className="flex w-full flex-wrap gap-3">
            {companyPlans.length ? (
              companyPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  actions={
                    <PlansActions
                      {...{ plan, setUserPlans, setCompanyPlans }}
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

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

function AllOrdersDrawer({ orders }: { orders: IOrder[] }) {
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex cursor-pointer items-center gap-1 rounded-full bg-foreground/5 px-3 py-1 transition-colors duration-200 hover:bg-foreground/10">
          <History size={16} />
          <span>All orders : {orders.length}</span>
        </div>
      </DrawerTrigger>
      <DrawerContent className="max-h-[calc(100vh-100px)]">
        <DrawerHeader>
          <DrawerTitle className="flex justify-between">
            <div className="flex gap-1">
              <History size={16} />
              <span>All orders : {orders.length}</span>
            </div>
            <DrawerClose>
              <Button variant="outline" size={"icon"}>
                <Cross1Icon className="size-3" />
              </Button>
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="mb-10 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-[900px] flex-col gap-3">
            {!!orders.length && (
              <h2 className="text-foreground/70">
                total orders: {orders.length}
              </h2>
            )}
            {!!orders.length ? (
              orders?.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-1 rounded-sm px-3 py-2 transition-colors duration-200 hover:bg-foreground/5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl">{order.item.name}</h3>
                      <p className="text-foreground/70">
                        Recipient: {order.recipient}
                      </p>
                    </div>
                    <TooltipProvider>
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger>
                          {order.item.plan === "premium" ? (
                            <Crown size={18} color="orange" />
                          ) : (
                            <Crown size={18} />
                          )}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{order.item.plan} plan.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div
                    className={cn(
                      "flex flex-1 items-center gap-1",
                      poppins.className,
                    )}
                  >
                    <IndianRupee className="size-[20px] font-thin md:size-[30px]" />
                    <span className="text-[20px] md:text-[35px]">
                      {order.item.price}
                    </span>
                  </div>
                  <Markdown className="px-2 text-foreground/70">
                    {order.item.description}
                  </Markdown>
                  {order?.discount && (
                    <div className="flex w-full justify-end text-foreground/70">
                      <span>Discount : {order.discount} ₹</span>
                    </div>
                  )}
                  <div className="flex justify-between gap-1 text-sm">
                    <p className="text-foreground/70">
                      purchased : {format(order.createdAt, "dd MMM , yy")}
                    </p>
                    {order?.expired ? (
                      <p className="text-red-500/70">expired</p>
                    ) : (
                      <p className="text-red-500/70">
                        expiry :{" "}
                        {format(
                          add(order.createdAt, {
                            months: order.item.duration,
                          }),
                          "dd MMM , yy",
                        )}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <NotFound hideBackButton title="No plans have been purchased." />
            )}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function PlansActions({
  plan,
  setUserPlans,
  setCompanyPlans,
}: {
  plan: IPlan;
  setUserPlans: Dispatch<SetStateAction<IPlan[]>>;
  setCompanyPlans: Dispatch<SetStateAction<IPlan[]>>;
}) {
  const deleteFunc = async ({
    id,
    forWho,
  }: {
    id: string;
    forWho: "company" | "user";
  }) => {
    try {
      await deletePlan({ id });

      if (forWho === "user") {
        setUserPlans((prev) => prev.filter((p) => p.id !== id));
      } else if (forWho === "company") {
        setCompanyPlans((prev) => prev.filter((p) => p.id !== id));
      }

      toast({
        title: "Plan Deleted",
        duration: 500,
      });
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
  return (
    <div className="flex items-center gap-2">
      <UpdatePlan
        plan={plan}
        setUserPlans={setUserPlans}
        setCompanyPlans={setCompanyPlans}
      />
      <Popover>
        <PopoverTrigger>
          <DangerButton
            className="w-full opacity-55 hover:opacity-100"
            size="icon"
          >
            <Trash2 size={16} />
          </DangerButton>
        </PopoverTrigger>
        <PopoverContent className="bg-background">
          <h1 className="mb-2 text-sm text-foreground/70">
            Are you sure you want to delete this plan?
          </h1>
          <div className="flex items-end justify-end">
            <PopoverClose>
              <DangerButton
                size="sm"
                onClick={() =>
                  deleteFunc({
                    id: plan.id,
                    forWho: plan.for,
                  })
                }
              >
                confirm
              </DangerButton>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
