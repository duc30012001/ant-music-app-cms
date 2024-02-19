import { decrypt, replaceSpecialChars } from '@/helpers';
import { GetSignedUrlConfig, Storage } from '@google-cloud/storage';
import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';

const BUCKET_NAME = process.env.BUCKET_NAME as string;
const PROJECT_ID = process.env.PROJECT_ID;
const KEY_FILE_NAME = process.env.CERT_PATH;

const storage = new Storage({
  projectId: PROJECT_ID,
  keyFilename: KEY_FILE_NAME,
});

export type Data = {
  key: string;
  signedUrl: string;
};

export interface GetSignedUrlPayload {
  fileName: string;
  contentType: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    (res as NextApiResponse)
      .status(404)
      .json({ messages: 'method not supported' });
  }

  const { data } = req.body;

  const { fileName, contentType } = decrypt(data) as GetSignedUrlPayload;

  if (!fileName) {
    (res as NextApiResponse)
      .status(404)
      .json({ messages: 'fileName is require' });
  }

  if (!contentType) {
    (res as NextApiResponse)
      .status(404)
      .json({ messages: 'contentType is require' });
  }

  const date = dayjs().format('YYYYMMDDHHmmss');
  const fileKey = `${date}_${replaceSpecialChars(fileName)}`;

  const signedUrl = await generateSignedUrl(fileKey, contentType);
  const key = `${BUCKET_NAME}/${fileKey}`;
  (res as NextApiResponse).status(200).json({ signedUrl, key });
}

async function generateSignedUrl(objectKey: string, contentType: string) {
  const config: GetSignedUrlConfig = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // URL expires in 15 minutes
    contentType,
  };

  const [url] = await storage
    .bucket(BUCKET_NAME)
    .file(objectKey)
    .getSignedUrl(config);
  return url;
}
