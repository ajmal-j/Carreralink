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

function generateValidateApplicantPrompt({
  description,
  resume,
}: {
  resume: string;
  description: string;
}) {
  const prompt = `Analyze the resume and job description to determine if the applicant is suitable for the role. Provide a score out of 10 for the applicant's suitability for the specific role. Resume: ${resume}, Job Description: ${description}. Output must be a string between 0 and 10 with no other characters like : 5 , 1 , 10 etc...`;
  return prompt;
}

function generateValidateAssessmentPrompt({
  assessments,
  description,
  expectedAnswers,
}: {
  assessments: Record<string, any>;
  expectedAnswers: Record<string, any>;
  description: string;
}) {
  const prompt = `Analyze the job description and the assessment provided by an applicant to determine if the applicant is suitable for the role. Provide a score out of 10 for the applicant's suitability for the specific role. Also provide the expected answers some of them are null so then validate based on the job description. Job Description: ${description}. Assessment: ${JSON.stringify(
    assessments
  )}. Expected Answers: ${JSON.stringify(
    expectedAnswers
  )} Output must be a string between 0 and 10 with no other characters like : 5 , 1 , 10 etc...`;
  return prompt;
}

export {
  getPdfText,
  generateValidateResumePrompt,
  generateValidateApplicantPrompt,
  generateValidateAssessmentPrompt,
};

export type IUtils = {
  getPdfText: (url: string) => Promise<string>;
  generateValidateResumePrompt: ({
    description,
    resume,
  }: {
    resume: string;
    description: string;
  }) => string;
  generateValidateApplicantPrompt: ({
    description,
    resume,
  }: {
    resume: string;
    description: string;
  }) => string;
  generateValidateAssessmentPrompt: ({
    assessments,
    description,
    expectedAnswers,
  }: {
    assessments: Record<string, any>;
    expectedAnswers: Record<string, any>;
    description: string;
  }) => string;
};
