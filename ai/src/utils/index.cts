import { InternalServerError } from "@carreralink/common";
const pdf = require("pdf-parse");

async function getPdfText(url: string) {
  try {
    const pdfBuffer = await fetch(url).then((res) => res.arrayBuffer());
    const data = await pdf(pdfBuffer as Buffer);
    return data.text;
  } catch (error) {
    console.log(error);
    throw new InternalServerError("Please try again later");
  }
}

function generateValidateResumePrompt({
  description,
  resume,
}: {
  resume: string;
  description: string;
}) {
  const prompt = `Analyze the resume and job description. Identify the missing qualifications or skills in the resume that are required for the job. Provide a score out of 10 for the resume's suitability for the specific role, and estimate the likelihood of getting hired. Resume: ${resume}, Job Description: ${description}`;
  return prompt;
}

export { getPdfText, generateValidateResumePrompt };

export type IUtils = {
  getPdfText: (url: string) => Promise<string>;
  generateValidateResumePrompt: ({
    description,
    resume,
  }: {
    resume: string;
    description: string;
  }) => string;
};