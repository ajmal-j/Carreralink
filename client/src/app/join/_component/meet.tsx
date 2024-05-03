"use client";

import { availableLanguages, codeSnippets } from "@/constants";
import { getMessage } from "@/lib/utils";

import BackButton from "@/components/Buttons/BackButton";
import RefreshPage from "@/components/Custom/RefreshPage";
import Title from "@/components/Custom/Title";
import { toast } from "@/components/ui/use-toast";
import { compileCode } from "@/services/compiler.service";
import { IInterviewUsers } from "@/types/company";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useState } from "react";
import Compiler from "./compiler";

interface PageProps {
  id: string;
  user: IInterviewUsers;
  isInterviewer: boolean;
  applicantId: string;
}
const languages = Object.entries(availableLanguages).map(([key]) => ({
  value: key,
  label: key,
}));

const appId = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID) as number;
const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET as string;

export default function Meet({
  id,
  user,
  isInterviewer,
  applicantId,
}: PageProps) {
  const [editorValue, setEditorValue] = useState("");
  const [language, setLanguage] = useState<string>(languages[0].value);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isJoined, setIsJoined] = useState<boolean>(false);

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
        onJoinRoom() {
          setIsJoined(true);
        },
        onLeaveRoom() {
          setIsJoined(false);
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

  const runCode = async () => {
    if (!editorValue) return;
    try {
      setLoading(true);
      const { data: result } = await compileCode({
        language,
        code: editorValue,
      });
      if (result?.stderr) {
        setError(result?.stderr);
      } else {
        setResult(result?.stdout);
        setError("");
      }
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEditorValue(codeSnippets[language]);
  }, [language]);

  return (
    <div className="h-[95vh] w-full">
      <div className="flex items-start justify-between">
        <div className="my-2 ms-3 flex gap-2">
          <BackButton />
          <Title />
        </div>
        {isJoined && (
          <Compiler
            {...{
              editorValue,
              isInterviewer,
              applicantId,
              id,
              error,
              language,
              loading,
              result,
              runCode,
              setEditorValue,
              setLanguage,
              user,
            }}
          />
        )}
      </div>

      <div className="h-full w-full" ref={joinMeeting} />
    </div>
  );
}
