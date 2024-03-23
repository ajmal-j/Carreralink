import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const radomId = () => crypto.randomBytes(32).toString("hex");

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIA4BCTZ3AUJSXGQKA6",
    secretAccessKey: "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",
  },
});

export const uploadToS3 = async (type: string, file: Buffer) => {
  try {
    const id = radomId();

    const command = new PutObjectCommand({
      Bucket: "carreralink",
      Key: id,
      Body: file,
      ContentType: type,
    });
    await s3.send(command);
    return `https://carreralink.s3.ap-south-1.amazonaws.com/${id}`;
  } catch (error) {
    console.log(error, "error in uploadToS3");
  }
};
