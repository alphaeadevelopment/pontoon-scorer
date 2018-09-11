import express from 'express';
import { matchPath } from 'react-router-dom';
import routes from '../../shared/routes';
import ssr from './handlers/ssr';

const route = express.Router();

route.get('*', (req, res, next) => {
  const activeRoute = routes.find(
    route => matchPath(req.url, route),
  );
  if (!activeRoute) {
    next();
  }
  else {
    ssr(activeRoute.path, req, res);
  }
});

export default route;
