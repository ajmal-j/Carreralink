import { CustomError, InternalServerError } from "@carreralink/common";
import { exec } from "child_process";
import fs from "fs";

export const createChildProcess = ({
  command,
  filepath,
}: {
  command: string;
  filepath: string;
}): Promise<Record<string, any> | CustomError> => {
  return new Promise((resolve, reject) => {
    const process = exec(command, (error, stdout, stderr) => {
      if (stderr) {
        fs.unlink(filepath, (err) => {
          if (err) console.log(err);
        });
        reject({ stderr: stderr, stdout: null });
      } else {
        fs.unlink(filepath, (err) => {
          if (err) console.log(err);
        });
        resolve({
          stdout,
          stderr: null,
        });
      }
    });
    const timeout = setTimeout(() => {
      process.kill();
      reject(new InternalServerError("Time limit exceeded. Please try again."));
    }, 15000);

    process.on("close", () => {
      clearTimeout(timeout);
    });
    process.on("exit", () => {
      console.log("process exited");
    });
  });
};
