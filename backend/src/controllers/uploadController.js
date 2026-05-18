const asyncHandler = require('express-async-handler');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

const uploadStream = (buffer, options) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
    stream.end(buffer);
  });

const uploadToLocal = (buffer, originalname) => {
  const uploadsDir = path.resolve(__dirname, '../../uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const filename = `${Date.now()}-${originalname.replace(/\s+/g, '_')}`;
  const filepath = path.join(uploadsDir, filename);
  fs.writeFileSync(filepath, buffer);
  return `/uploads/${filename}`;
};

const uploadMedia = asyncHandler(async (req, res) => {
  console.log('uploadMedia called');  
  console.log('uploadMedia - headers.authorization:', req.headers.authorization || null);
  console.log('uploadMedia - req.file present?', !!req.file);
  if (req.file) {
    const fileKeys = Object.keys(req.file || {});
    console.log('uploadMedia - req.file keys:', fileKeys);
    if (req.file.buffer) {
      console.log('uploadMedia - file buffer length:', req.file.buffer.length);
    }
  }

  if (!req.file || !(req.file.buffer || req.file.stream || req.file.size)) {
    res.status(400);
    throw new Error('No file uploaded or file not readable by server (req.file missing or empty)');
  }

  const uploadOptions = {
    folder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'fitness_app_workouts',
    resource_type: 'auto',
    timeout: 60000,
  };

  let result;
  console.log('uploadMedia - uploadOptions:', uploadOptions);
  
  // Try Cloudinary first
  let cloudinaryFailed = false;
  if (req.file.buffer) {
    try {
      result = await uploadStream(req.file.buffer, uploadOptions);
      console.log('uploadMedia - Cloudinary upload successful');
    } catch (err) {
      console.error('uploadMedia - Cloudinary upload failed:', err.message);
      cloudinaryFailed = true;
    }
  }

  // Fallback to local upload if Cloudinary failed or buffer unavailable
  if (cloudinaryFailed || !req.file.buffer) {
    console.log('uploadMedia - Falling back to local file storage');
    const localUrl = uploadToLocal(req.file.buffer, req.file.originalname);
    result = {
      secure_url: localUrl,
      public_id: `local-${Date.now()}`,
      resource_type: req.file.mimetype.startsWith('video') ? 'video' : 'image',
    };
    console.log('uploadMedia - Local upload successful:', localUrl);
  }

  res.json({
    url: result.secure_url,
    public_id: result.public_id,
    resource_type: result.resource_type,
  });
});

module.exports = { uploadMedia };
