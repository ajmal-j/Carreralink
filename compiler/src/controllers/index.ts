import BuildCompileCodeController from "./compile.js";
import { generateFile } from "../utils/generateFilePath.cjs";

const compile = BuildCompileCodeController({
  generateFile,
});

export const compilerController = {
  compile,
};

export type ICompilerController = typeof compilerController;
