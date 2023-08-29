
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import cloudinary from '@/server/cloudinaryConfig';

const upload = multer({ dest: 'uploads/' });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    

    upload.array('files')(req, res, async function (err) {
      if (err) {
        console.error('Error uploading files:', err);
        return res.status(500).json({ message: 'Error uploading files' });
      }

      const files = req.files;

      const uploadPromises = files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        return result.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      res.status(200).json({ urls: uploadedUrls });
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'Error uploading images' });
  }
}
