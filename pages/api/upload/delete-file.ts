// import { COOKIES_KEY } from '@/utils/constants';
// import { Storage } from '@google-cloud/storage';
// import { DeleteOptions } from '@google-cloud/storage/build/cjs/src/nodejs-common/service-object';
// import Cookies from 'cookies';
// import { NextApiRequest, NextApiResponse } from 'next';

// const BUCKET_NAME = process.env.BUCKET_NAME as string;
// const PROJECT_ID = process.env.PROJECT_ID;
// const KEY_FILE_NAME = process.env.CERT_PATH;

// const storage = new Storage({
//   projectId: PROJECT_ID,
//   keyFilename: KEY_FILE_NAME,
// });

// export type Data = {
//   message: string;
//   fileName: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const cookies = new Cookies(req, res);
//   const accessToken = cookies.get(COOKIES_KEY.TOKEN);
//   if (!accessToken) {
//     return (res as NextApiResponse)
//       .status(401)
//       .json({ messages: 'unauthorized' });
//   }

//   if (req.method !== 'DELETE') {
//     (res as NextApiResponse)
//       .status(404)
//       .json({ messages: 'method not supported' });
//   }

//   const { link } = req.body;

//   if (!link) {
//     (res as NextApiResponse).status(404).json({ messages: 'link is require' });
//   }

//   const fileName = link.split('/').pop();

//   deleteFile(fileName)
//     .then(() => {
//       (res as NextApiResponse)
//         .status(200)
//         .json({ message: 'File deleted successfully', fileName });
//     })
//     .catch((error) => {
//       (res as NextApiResponse).status(404).json({ messages: 'Error', error });
//     });
// }

// const deleteOptions: DeleteOptions = {
//   ignoreNotFound: true,
// };

// async function deleteFile(fileName: string) {
//   await storage.bucket(BUCKET_NAME).file(fileName).delete(deleteOptions);
// }
