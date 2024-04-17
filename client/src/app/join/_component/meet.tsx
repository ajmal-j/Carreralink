"use client";

import RefreshPage from "@/components/Custom/RefreshPage";
import { IUserCompany } from "@/types/company";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

interface PageProps {
  id: string;
  user: IUserCompany;
}

export default function Meet({ id, user }: PageProps) {
  const appId = 1613379029;
  const serverSecret = "b47092639dd4ca05c1c7a68f2d9a2c1c";

  const joinMeeting = async (element: HTMLDivElement) => {
    try {
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        id,
        user.id,
        user.username,
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);

      zc.joinRoom({
        container: element,
        showPreJoinView: false,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        turnOnCameraWhenJoining: false,
        turnOnMicrophoneWhenJoining: false,
        showScreenSharingButton: true,
        preJoinViewConfig: {
          title: "Join Interview.",
        },
      });
    } catch (error) {
      console.log(error);
      return <RefreshPage />;
    }
  };

  return (
    <div className="h-[97vh] w-full bg-white">
      <div className="h-full w-full" ref={joinMeeting} />
    </div>
  );
}
