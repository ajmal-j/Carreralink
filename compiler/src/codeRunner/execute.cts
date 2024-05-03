import path from "path";
import { exec } from "child_process";
import fs from "fs";
import { CustomError } from "@carreralink/common";

const outputPath = path.join("outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

export const executeCpp = ({ filepath }: { filepath: string }) => {
  try {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);

    if (!fs.existsSync(filepath)) throw new CustomError("File not found", 404);

    return new Promise((resolve, reject) => {
      exec(
        `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`,
        (error, stdout, stderr) => {
          if (stderr) {
            reject({ stderr: stderr, stdout: null });
          } else {
            resolve({
              stdout,
              stderr: null,
            });
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};
export const executePython = ({ filepath }: { filepath: string }) => {
  try {
    if (!fs.existsSync(filepath)) throw new CustomError("File not found", 404);

    return new Promise((resolve, reject) => {
      exec(`python ${filepath}`, (error, stdout, stderr) => {
        if (stderr) {
          reject({ stderr: stderr, stdout: null });
        } else {
          resolve({
            stdout,
            stderr: null,
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const executeJs = ({ filepath }: { filepath: string }) => {
  if (!fs.existsSync(filepath)) throw new CustomError("File not found", 404);

  return new Promise((resolve, reject) => {
    exec(`node ${filepath}`, (error, stdout, stderr) => {
      if (stderr) {
        reject({ stderr: stderr, stdout: null });
      } else {
        resolve({
          stdout,
          stderr: null,
        });
      }
    });
  });
};

export const executePhp = ({ filepath }: { filepath: string }) => {
  if (!fs.existsSync(filepath)) throw new CustomError("File not found", 404);

  return new Promise((resolve, reject) => {
    exec(`php ${filepath}`, (error, stdout, stderr) => {
      if (stderr) {
        reject({ stderr: stderr, stdout: null });
      } else {
        resolve({
          stdout,
          stderr: null,
        });
      }
    });
  });
};
