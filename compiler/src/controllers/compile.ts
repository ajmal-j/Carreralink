import {
  BadRequestError,
  CustomError,
  CustomResponse,
} from "@carreralink/common";
import { Request } from "express";
import {
  executeCpp,
  executeJs,
  executePhp,
  executePython,
} from "../codeRunner/execute.cjs";
import { formats } from "../constants/index.js";

const functions: Record<string, Function> = {
  cpp: executeCpp,
  js: executeJs,
  py: executePython,
  php: executePhp,
};

export default function ({
  generateFile,
}: {
  generateFile: ({ code, format }: { code: string; format: string }) => string;
}) {
  return async (req: Request) => {
    const { code, language } = req.body;

    if (!code || !language) throw new BadRequestError("Invalid Data.");

    const format = formats[language];

    if (!format) throw new BadRequestError("Invalid Language.");

    const filepath = generateFile({
      format,
      code,
    });

    let response: any;

    try {
      response = await functions[format]({ filepath });
    } catch (error) {
      if (error instanceof CustomError) throw error;
      response = error;
    }

    return new CustomResponse()
      .message("Compiled")
      .statusCode(200)
      .data(response)
      .response();
  };
}
