import { GenerativeAIModel } from "../entities/GenerativeAIModel.js";
import { IEventProducer } from "../events/producer/producer.js";
import { IUtils } from "../utils/index.cjs";

export class ValidateAssessment {
  constructor(
    private readonly generateValidateAssessmentPrompt: IUtils["generateValidateAssessmentPrompt"],
    private readonly eventProducer: IEventProducer
  ) {}

  async execute({
    assessments,
    job,
    user,
    expectedAnswers,
    description,
  }: {
    assessments: Record<string, any>;
    expectedAnswers: Record<string, any>;
    job: string;
    user: string;
    description: string;
  }) {
    const prompt = this.generateValidateAssessmentPrompt({
      description,
      assessments,
      expectedAnswers,
    });

    const { model } = new GenerativeAIModel();
    try {
      let response = await model.generateContent(prompt);
      let score = response.response.text();
      const data = {
        job,
        user,
        score,
      };
      await this.eventProducer.assessmentValidated({ data });
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong. Please try again later.");
    }
  }
}
