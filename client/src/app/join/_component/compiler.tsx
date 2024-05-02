"use client";

import { codeSnippets } from "@/constants";

import { Button } from "@/components/ui/button";
import {
    Dialog,
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
import { Editor } from "@monaco-editor/react";
import {
    Code,
    ListRestart,
    Loader,
    SpellCheck,
    SpellCheck2,
} from "lucide-react";
import { useRef } from "react";
import CodeSelector from "./codeSelector";

interface PageProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  runCode: () => void;
  loading: boolean;
  editorValue: string;
  setEditorValue: React.Dispatch<React.SetStateAction<string>>;
  result: string;
  error: string;
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
}: PageProps) {
  const editorRef = useRef(null);

  const options = {
    minimap: { enabled: false },
  };

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const resetValue = () => {
    setEditorValue(codeSnippets[language]);
  };

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
            <DialogDescription className="flex gap-2 pt-4">
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
              <Button onClick={resetValue} variant={"outline"}>
                <ListRestart size={18} />
              </Button>
            </DialogDescription>
          </DialogHeader>
          <div>
            <ResizablePanelGroup
              direction="horizontal"
              className="min-h-[200px] rounded-lg border"
            >
              <ResizablePanel minSize={10} defaultSize={70}>
                <div className="flex h-full">
                  <Editor
                    height={"100%"}
                    theme="vs-dark"
                    language={language}
                    onMount={onMount}
                    defaultValue={'console.log("hello world")'}
                    value={editorValue}
                    onChange={(value) => setEditorValue(value || "")}
                    options={options}
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={30} defaultSize={30}>
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
                        <SpellCheck2 color="red" size={16} />{" "}
                        <span>Error :</span>
                      </div>
                      <ScrollArea className="mt-3  h-full text-foreground/70">
                        {error}
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
