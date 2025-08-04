import AWS from "aws-sdk";

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  apiVersion: "latest",
  region: process.env.AWS_S3_REGION,
});

export async function upload(file) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ContentEncoding: file.encoding,
    ContentType: file.mimetype,
  };
  return s3.upload(params).promise();
}

export async function download(fileName) {
  const params = {
    Key: fileName,
    Bucket: process.env.AWS_S3_BUCKET_NAME,
  };
  return s3.getObject(params).promise();
}
