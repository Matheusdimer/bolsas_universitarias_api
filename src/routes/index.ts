import { Router } from 'express';
import { readdirSync } from 'fs';

const router = Router();

readdirSync(__dirname).forEach((file) => {
  if (file.includes('index') || file.endsWith('.map')) {
    return;
  }

  const routeName = file.split('.')[0];
  const routes = require(`./${file}`);

  router.use(`/${routeName}`, routes.default);
});

export default router;
