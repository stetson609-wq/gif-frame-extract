import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const publicPath = path.join(process.cwd(), 'public');

  function getFrames(folder) {
    const folderPath = path.join(publicPath, folder);
    if (!fs.existsSync(folderPath)) return [];
    // Get all png files, sort alphabetically
    return fs.readdirSync(folderPath)
             .filter(f => f.endsWith('.png'))
             .sort()
             .map(f => `/${folder}/${f}`);
  }

  res.status(200).json({
    favicon16: getFrames('favicon16'),
    favicon32: getFrames('favicon32')
  });
}
