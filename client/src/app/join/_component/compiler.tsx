"use client";

import { useSocket } from "@/Providers/socket-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { codeSnippets } from "@/constants";
import { getMessage } from "@/lib/utils";
import { IInterviewUsers } from "@/types/company";
import { Editor, type OnMount } from "@monaco-editor/react";
import { Cross1Icon } from "@radix-ui/react-icons";
import AnsiToHtml from "ansi-to-html";
import {
  Code,
  ListRestart,
  Loader,
  SpellCheck,
  SpellCheck2,
  Trash2,
} from "lucide-react";
import PrettyError from "pretty-error";
import { useCallback, useEffect, useRef, useState } from "react";
import CodeSelector from "./codeSelector";
const pe = new PrettyError();
const ansiToHtml = new AnsiToHtml();

interface PageProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  runCode: () => void;
  loading: boolean;
  editorValue: string;
  setEditorValue: React.Dispatch<React.SetStateAction<string>>;
  result: string;
  error: string;
  isInterviewer: boolean;
  id: string;
  user: IInterviewUsers;
  applicantId: string;
}

export default function Compiler({
  editorValue,
  error,
  language,
  loading,
  result,
  runCode,
  setEditorValue,
  setLanguage,
  isInterviewer,
  id,
  user,
  applicantId,
}: PageProps) {
  const editorRef = useRef<OnMount["prototype"] | null>(null);
  const [open, setOpen] = useState(false);
  const [prevQuestion, setPrevQuestion] = useState<string>("");
  const [prevListened, setPrevListened] = useState<string>("");
  const [question, setQuestion] = useState<string>("");

  const { socket } = useSocket();

  const options = {
    minimap: { enabled: false },
  };

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const joinInterviewSocket = useCallback(() => {
    try {
      socket?.emit("joinInterview", {
        id: user.id.concat(id),
      });
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
      });
    }
  }, [socket, id, user]);

  const resetValue = () => {
    setEditorValue(codeSnippets[language]);
    editorRef?.current.focus();
  };

  const pasteQuestion = () => {
    if (!question || !id || !isInterviewer || !applicantId) return;
    try {
      if (question === prevQuestion) return;
      socket?.emit("question", {
        question,
        user: applicantId.concat(id),
        sender: user.id.concat(id),
      });
      setPrevQuestion(question);
      setOpen(false);
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
      });
    }
  };

  const questionReceived = (question: string) => {
    if (!question) return;
    console.log(question);
    if (question === prevListened) return;
    setEditorValue((prev) => question.concat("\n\n" + prev));
    editorRef?.current.focus();
    setPrevListened(question);
  };

  const applicantNotJoined = () => {
    setPrevQuestion("");
    toast({
      title: "Applicant not yet joined.",
      description: "Please wait for applicant to join",
      variant: "destructive",
      duration: 2000,
    });
  };

  useEffect(() => {
    joinInterviewSocket();
  }, [joinInterviewSocket]);

  useEffect(() => {
    socket?.on("questionReceived", questionReceived);
    socket?.on("applicantNotJoined", applicantNotJoined);
  }, [socket]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="my-2 me-3" variant="outline">
          <div className="flex items-center gap-1.5">
            <Code size={16} /> Compiler
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full min-w-full rounded-none">
        <DialogHeader>
          <DialogTitle>Compiler</DialogTitle>
          <DialogDescription className="flex flex-wrap gap-2 pt-4">
            <CodeSelector language={language} setLanguage={setLanguage} />
            <Button
              onClick={runCode}
              className="flex w-[75px] items-center justify-center"
              variant={"outline"}
            >
              {loading ? (
                <Loader size={17} className="animate-spin" />
              ) : (
                <div className="flex items-center gap-1">
                  <Code size={16} /> Run
                </div>
              )}
            </Button>
            <Button
              onClick={() => {
                setEditorValue("");
                editorRef?.current.focus();
              }}
              variant={"outline"}
            >
              <Trash2 size={18} />
            </Button>
            <Button onClick={resetValue} variant={"outline"}>
              <ListRestart size={18} />
            </Button>
            {isInterviewer && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                  <Button variant={"outline"}>give question</Button>
                </DialogTrigger>
                <DialogContent className="max-h-[800px] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-foreground/70">
                      Give a question to applicant.
                    </DialogTitle>
                    <DialogDescription>
                      <div className="mt-3 flex w-full flex-col gap-2">
                        <Textarea
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          name="question"
                          className="h-auto"
                          placeholder="enter or paste your question here..."
                          rows={15}
                        />
                        <Button
                          onClick={() => pasteQuestion()}
                          className="ms-auto"
                          variant={"outline"}
                        >
                          Submit
                        </Button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
            <DialogClose>
              <Button variant={"outline"}>
                <div className="flex items-center gap-1">
                  <Cross1Icon className="size-3" />
                  <span>close</span>
                </div>
              </Button>
            </DialogClose>
          </DialogDescription>
        </DialogHeader>
        <div>
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[200px] rounded-lg border"
          >
            <ResizablePanel minSize={10} maxSize={70}>
              <div className="flex h-full">
                <Editor
                  height={"100%"}
                  theme="vs-dark"
                  language={language}
                  onMount={onMount}
                  value={editorValue}
                  onChange={(value) => setEditorValue(value || "")}
                  options={options}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel minSize={10} defaultSize={30}>
              <div className="flex h-full flex-col p-3">
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel className="p-2">
                    <div className="flex items-center gap-1 border-b-[1px] pb-2 text-sm text-foreground/70">
                      <SpellCheck color="green" size={16} />
                      <span>Output :</span>
                    </div>
                    <ScrollArea className="mt-3 h-full text-foreground/70">
                      {result ? result : "Run code to see output."}
                    </ScrollArea>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel className="p-2" defaultSize={30}>
                    <div className="mt-2 flex items-center gap-1 border-b-[1px] pb-2 text-sm text-foreground/70">
                      <SpellCheck2 color="red" size={16} /> <span>Error :</span>
                    </div>
                    <ScrollArea className="mt-3 h-full w-full pb-14">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            error &&
                            ansiToHtml.toHtml(pe.render(new Error(error))),
                        }}
                      />
                    </ScrollArea>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
}
