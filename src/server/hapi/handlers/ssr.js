import { getActiveRouteForUrl, doSsr } from '../../ssr';
import serveFile from './serve-file';

export default (req, h) => {
  const activeRoute = getActiveRouteForUrl(req.url.path);
  if (!activeRoute) {
    return serveFile(req, h);
  }

  return doSsr(activeRoute)
    .then(html => h.response(html).code(200))
    .catch(e => h.response(e).code(500));
};
