import { GenerativeAIModel } from "../entities/GenerativeAIModel.js";
import { IEventProducer } from "../events/producer/producer.js";
import { IUtils } from "../utils/index.cjs";

export class ValidateJobApplications {
  constructor(
    private readonly getPdfText: IUtils["getPdfText"],
    private readonly generateValidateApplicantPrompt: IUtils["generateValidateApplicantPrompt"],
    private readonly eventProducer: IEventProducer
  ) {}
  async execute({
    description,
    applied,
  }: {
    description: string;
    applied: IAppliedJob;
  }) {
    const resume = await this.getPdfText(applied?.resume);
    const prompt = this.generateValidateApplicantPrompt({
      description,
      resume,
    });
    const { model } = new GenerativeAIModel();
    try {
      let response = await model.generateContent(prompt);
      let text = response.response.text();
      const data = {
        score: text,
        application: applied.id,
      };
      await this.eventProducer.applicantValidated({
        data,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong. Please try again later.");
    }
  }
}
