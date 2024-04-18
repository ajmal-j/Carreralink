import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import { ReactNode } from "react";
import MessageSideBar from "./_components/MessageSideBar";
import { SocketProvider } from "@/Providers/socket-provider";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <DashboardWrapper className="max-w-[1300px]" title="Message's">
      <SocketProvider>
        <div className="flex flex-col gap-3 lg:flex-row">
          <MessageSideBar />
          <div className="w-full">{children}</div>
        </div>
      </SocketProvider>
    </DashboardWrapper>
  );
}
