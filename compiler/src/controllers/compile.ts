import {
  BadRequestError,
  CustomError,
  CustomResponse,
} from "@carreralink/common";
import { Request } from "express";
import { formats } from "../constants/index.js";
import {
  executeCpp,
  executeJs,
  executePhp,
  executePython,
} from "../codeRunner/execute.cjs";
import fs from "fs";
import path from "path";

export default function ({
  generateFile,
}: {
  generateFile: ({ code, format }: { code: string; format: string }) => string;
}) {
  return async (req: Request) => {
    const { code, language } = req.body;

    if (!code || !language) throw new BadRequestError("Invalid Data.");
    const format = formats[language];

    const filepath = generateFile({
      format,
      code,
    });

    let response: any;

    try {
      if (format === "cpp") {
        response = await executeCpp({
          filepath,
        });
        const outputPath = path.join(
          "outputs",
          path.basename(filepath).split(".")[0] + ".out"
        );
        fs.unlink(outputPath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      } else if (format === "js") {
        response = await executeJs({
          filepath,
        });
      } else if (format === "py") {
        response = await executePython({
          filepath,
        });
      } else if (format === "php") {
        response = await executePhp({
          filepath,
        });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      response = error;
    }

    fs.unlink(filepath, (err) => {
      if (err) {
        console.log(err);
      }
    });

    return new CustomResponse()
      .message("Compiled")
      .statusCode(200)
      .data(response)
      .response();
  };
}
