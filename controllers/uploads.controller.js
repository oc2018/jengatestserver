import { upLoadToImageKit } from "../services/imagekit.service.js";

export const uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "File Upload failed" });

  try {
    const url = await upLoadToImageKit(req.file.buffer, req.file.originalname);

    // save to db
    res.json({ url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Upload failed` });
  }

  res.status(200).json({ url });
};
