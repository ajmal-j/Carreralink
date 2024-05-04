import { CustomError } from "@carreralink/common";
import fs from "fs";
import path from "path";
import { createChildProcess } from "../utils/exec.cjs";

const outputPath = path.join("outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

export const executeCpp = async ({ filepath }: { filepath: string }) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  const removeOutFile = () => {
    const outputPath = path.join(
      "outputs",
      path.basename(filepath).split(".")[0] + ".out"
    );
    fs.unlink(outputPath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  if (!fs.existsSync(filepath)) throw new CustomError("File not found", 404);

  const command = `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`;

  try {
    const output = await createChildProcess({
      command,
      filepath,
    });
    removeOutFile();
    return output;
  } catch (error) {
    removeOutFile();
    return error;
  }
};
export const executePython = ({ filepath }: { filepath: string }) => {
  if (!fs.existsSync(filepath)) throw new CustomError("File not found", 404);
  const command = `python ${filepath}`;
  return createChildProcess({
    command,
    filepath,
  });
};

export const executeJs = ({ filepath }: { filepath: string }) => {
  if (!fs.existsSync(filepath)) throw new CustomError("File not found", 404);
  const command = `node ${filepath}`;
  return createChildProcess({
    command,
    filepath,
  });
};

export const executePhp = ({ filepath }: { filepath: string }) => {
  if (!fs.existsSync(filepath)) throw new CustomError("File not found", 404);
  const command = `php ${filepath}`;
  return createChildProcess({
    command,
    filepath,
  });
};
