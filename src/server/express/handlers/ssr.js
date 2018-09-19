import { getActiveRouteForUrl, doSsr } from '../../ssr';

export default (req, res, next) => {
  const activeRoute = getActiveRouteForUrl(req.url);
  if (!activeRoute) {
    next();
  }
  else {
    doSsr(activeRoute)
      .then(html => res.status(200).send(html))
      .catch((e) => {
        console.error(e); // eslint-disable-line no-console
        res.status(500).send(e);
      });
  }
};
