import { Server } from "@/lib/server";
import axios from "./axios.interseptor";

interface CompileResponse {
  data: {
    error?: string;
    stdout: string;
    stderr: string;
  };
}

const compileCode = async ({
  language,
  code,
}: {
  language: string;
  code: string;
}): Promise<CompileResponse> => {
  const url = new Server().compiler("compile");
  const response = await axios.post(url, {
    language,
    code,
  });
  return response.data;
};

export { compileCode };
