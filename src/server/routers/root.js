import express from 'express';
import ssr from './handlers/ssr';

const route = express.Router();

route.get('/', ssr);

export default route;
