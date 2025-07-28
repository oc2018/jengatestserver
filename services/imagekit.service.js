import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function upLoadToImageKit(buffer, originalname) {
  const response = await imageKit.upload({
    file: buffer,
    fileName: originalname,
    useUniqueFileName: true,
    folder: `users-folder`,
  });
  return response.url;
}
