import NotFound from "@/components/Custom/NotFound";
import UserPlans from "@/components/ui/UserPlans";
import PlanCard from "@/components/ui/plan";
import { cn, getMessage } from "@/lib/utils";
import { companyOrders, userOrders } from "@/services/plan.service";
import { currentUser } from "@/services/user.service";
import { IUser } from "@/store/reducers/user.slice";
import { cookies } from "next/headers";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Crown, History, IndianRupee } from "lucide-react";
import { Cross1Icon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Poppins } from "next/font/google";
import Markdown from "@/components/Custom/Markdown";
import { add, format } from "date-fns";
import CompanyPlans from "../_components/CompanyPlans";
import { getCompanyData } from "@/services/company.service";
import { ICompany } from "@/store/reducers/company.slice";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export default async function Plans() {
  let company: ICompany = {} as ICompany;
  const token = cookies().get("companyToken")?.value || "";
  let orders: IOrder[] = [];
  let currentPlan: IOrder | undefined;

  try {
    const [companyResponse, orderResponse] = await Promise.all([
      getCompanyData(token),
      companyOrders({ token }),
    ]);
    company = companyResponse.data;
    const orderData = orderResponse.data as IOrder[];
    if (company?.plan?.currentPlan) {
      currentPlan = orderData?.find(
        (order) => order.id === company?.plan?.currentPlan,
      );
    }
    orders.push(...orderData);
  } catch (error) {
    console.log(error);
    const message = getMessage(error);
    return <NotFound title={message} />;
  }
  return (
    <div>
      <div className="flex justify-end">
        <HistoryDrawer orders={orders} />
      </div>
      <div className="flex flex-col gap-2 pb-6">
        <h1 className="ps-1 text-2xl text-foreground/70">Current plan</h1>
        {currentPlan ? (
          <div>
            <PlanCard
              className="bg-gradient-to-br from-violet-400 to-indigo-600 text-white sm:px-6 sm:py-16"
              plan={{
                description: currentPlan.item.description,
                duration: currentPlan.item.duration,
                features: currentPlan.item.features,
                for: currentPlan.item.for,
                id: currentPlan.item.id,
                name: currentPlan.item.name,
                plan: currentPlan.item.plan,
                price: currentPlan.item.price,
              }}
              actions={
                <div className="w-full">
                  <div className="flex w-full justify-between gap-1 text-sm">
                    <p className="text-foreground/70">
                      purchased : {format(currentPlan.createdAt, "dd MMM , yy")}
                    </p>
                    <p className="text-red-700">
                      expiry :{" "}
                      {format(
                        add(currentPlan.createdAt, {
                          months: currentPlan.item.duration,
                        }),
                        "dd MMM , yy",
                      )}
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        ) : (
          <NotFound hideBackButton title="No active plan." />
        )}
      </div>
      <div className="mx-4">
        <CompanyPlans id={currentPlan?.item?.id} />
      </div>
    </div>
  );
}

function HistoryDrawer({ orders }: { orders: IOrder[] }) {
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex cursor-pointer items-center gap-1 rounded-full bg-foreground/5 px-3 py-1 transition-colors duration-200 hover:bg-foreground/10">
          <History size={16} />
          <span>History</span>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex justify-between">
            <div className="flex gap-1">
              <History size={16} />
              <span>History</span>
            </div>
            <DrawerClose>
              <Button variant="outline" size={"icon"}>
                <Cross1Icon className="size-3" />
              </Button>
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription>
            The plans may have changed.Please check latest plans.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="mb-10">
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
                  <div className="flex justify-between">
                    <h3 className="text-xl">{order.item.name}</h3>
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
                  <div className="flex justify-between gap-1 text-sm">
                    <p className="text-foreground/70">
                      purchased : {format(order.createdAt, "dd MMM , yy")}
                    </p>
                    <p className="text-red-500/70">
                      expiry :{" "}
                      {format(
                        add(order.createdAt, {
                          months: order.item.duration,
                        }),
                        "dd MMM , yy",
                      )}
                    </p>
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
