import express from 'express';
import { Session } from 'express-session';
const cookie = require('cookie');

interface MySessionData {
  [key: string]: any;
}
const router = express.Router();
interface MySession extends Session {
  jwt?: string;
  data?: MySessionData | null;
}
router.post('/api/users/signout', (req, res) => {

  res.setHeader('Set-Cookie', cookie.serialize('session', '', {
    path: '/',
    expires: new Date(0)
}));
  res.status(200).send({});
});

export { router as signoutRouter };
