import { getActiveRouteForUrl, doSsr } from '../../../ssr';

export default (req, h) => {
  const activeRoute = getActiveRouteForUrl(req.url.path);
  if (!activeRoute) {
    return h.continue;
  }

  return doSsr(activeRoute)
    .then(html => h.response(html).code(200))
    .catch(e => h.response(e).code(500));
};
