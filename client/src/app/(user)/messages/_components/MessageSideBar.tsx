import NotFound from "@/components/Custom/NotFound";
import { getMessage } from "@/lib/utils";
import { userChats } from "@/services/chat.service";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function MessageSideBar() {
  let data: IUserChats[] = [];
  const token = cookies().get("userToken")?.value || "";
  try {
    const response = await userChats({
      token,
    });
    data = response.data;
  } catch (error) {
    console.log(error);
    const message = getMessage(error);
    return <NotFound title={message} />;
  }

  return (
    <div className="flex flex-col gap-3 px-3">
      {data.length === 0 && <p>No messages found</p>}
      {data?.map((item) => (
        <Link href={`/messages/${item.id}`} key={item.id}>
          <div>{item.participants.recruiter.username}</div>
          <div>
            {item.lastMessage && (
              <>
                <span className="px-3 text-foreground/70">
                  {item.lastMessage.sender === item.participants.user
                    ? "You: "
                    : item.participants.recruiter.username}
                </span>
                {item.lastMessage.content}
              </>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
