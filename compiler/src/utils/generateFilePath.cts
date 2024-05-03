import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const dirCodes = path.join("codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = ({ code, format }: { code: string; format: string }) => {
  const jobId = uuid();
  const filename = `${jobId}.${format}`;
  const filepath = path.join(dirCodes, filename);
  fs.writeFileSync(filepath, code);
  return filepath;
};

export { generateFile };
