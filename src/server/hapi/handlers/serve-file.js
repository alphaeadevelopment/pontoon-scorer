
import path from 'path';

const publicPath = path.join(__dirname, '../../../../dist');

export default (req, h) => {
  const filePath = path.join(publicPath, req.url.path);
  return h.file(filePath);
};
