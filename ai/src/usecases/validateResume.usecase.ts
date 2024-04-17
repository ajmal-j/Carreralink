import { InternalServerError } from "@carreralink/common";
import { GenerativeAIModel } from "../entities/GenerativeAIModel.js";
import { IUtils } from "../utils/index.cjs";

export class ValidateResumeUsecase {
  constructor(
    private readonly getPdfText: IUtils["getPdfText"],
    private readonly generateValidateResumePrompt: IUtils["generateValidateResumePrompt"]
  ) {}

  async execute({
    description,
    resume,
  }: {
    resume: string;
    description: string;
  }) {
    const text = await this.getPdfText(resume);
    const prompt = this.generateValidateResumePrompt({
      description,
      resume: text,
    });
    const { model } = new GenerativeAIModel();
    try {
      let response = await model.generateContent(prompt);
      let text = response.response.text();
      return {
        result: text,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerError(
        "Something went wrong while generating. Please try again later."
      );
    }
  }
}
