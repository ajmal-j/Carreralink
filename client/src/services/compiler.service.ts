import { languageVersions } from "@/constants";
import axios from "axios";

const compilerAPI = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

interface RunData {
  run: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string;
    output: string;
  };
}

const compileCode = async ({
  language,
  code,
}: {
  language: string;
  code: string;
}): Promise<RunData> => {
  const response = await compilerAPI.post(
    "/execute",
    {
      language: language,
      version: languageVersions[language],
      files: [
        {
          content: code,
        },
      ],
    },
    {
      withCredentials: false,
    },
  );
  return response.data;
};

export { compileCode };
