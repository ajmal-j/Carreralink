import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const radomId = () => crypto.randomBytes(32).toString("hex");

const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
const secretAccessKey = process.env.AWS_ACCESS_KEY_SECRET!;
const region = process.env.AWS_REGION!;

if (!accessKeyId || !secretAccessKey || !region) {
  throw new Error("AWS credentials not found");
}

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
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
