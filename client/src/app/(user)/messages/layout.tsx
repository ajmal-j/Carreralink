import { SocketProvider } from "@/Providers/socket-provider";
import { ReactNode } from "react";
import MessageSideBar from "./_components/MessageSideBar";


export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
        <SocketProvider>
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="min-w-[500px]">
            <MessageSideBar />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </SocketProvider>
    </div>
  )
}
