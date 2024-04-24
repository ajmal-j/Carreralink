import mongoose, { Schema } from "mongoose";

interface ISkillsAndCategory {
  skills: string[];
  category: string[];
}

const skillAndCategorySchema = new Schema({
  skills: [String],
  category: [String],
});

export const SkillAndCategoryModel = mongoose.model<ISkillsAndCategory>(
  "SkillsAndCategories",
  skillAndCategorySchema
);
export type ISkillsAndCategoryModel = typeof SkillAndCategoryModel;
